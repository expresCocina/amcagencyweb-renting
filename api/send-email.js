import { Resend } from 'resend';

// Use RESEND_API_KEY for Vercel serverless functions
export default async function handler(req, res) {
  // 1. Validar Método
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Validar API Key (Manejo seguro)
  if (!process.env.RESEND_API_KEY) {
    console.error('CRITICAL: Missing RESEND_API_KEY environment variable');
    return res.status(500).json({ error: 'Configuration Error: Missing API Key' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { type, clientData } = req.body;

    console.log(`Intentando enviar email tipo: ${type} a: ${clientData?.email}`);

    if (!clientData || !clientData.email) {
      return res.status(400).json({ error: 'Missing required fields: clientData or email' });
    }

    let emailConfig;
    const year = new Date().getFullYear();

    // --- TEMPLATES ---
    const getBaseTemplate = (title, content, buttonText, buttonUrl, colorColor = '#4f46e5') => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f3f4f6; }
          .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
          .header { background-color: ${colorColor}; padding: 30px; text-align: center; }
          .header h1 { margin: 0; color: white; font-size: 24px; font-weight: 600; }
          .content { padding: 40px 30px; color: #4b5563; }
          .button-container { text-align: center; margin-top: 30px; margin-bottom: 20px; }
          .button { display: inline-block; background-color: ${colorColor}; color: white !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          .footer { text-align: center; padding: 30px; background: #f9fafb; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px; }
          .info-table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 20px 0; background: #f8fafc; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }
          .info-table td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; }
          .info-table tr:last-child td { border-bottom: none; }
          .info-label { font-weight: 600; color: #64748b; width: 40%; }
          .info-value { color: #1e293b; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${title}</h1>
          </div>
          <div class="content">
            ${content}
            ${buttonText ? `
              <div class="button-container">
                <a href="${buttonUrl}" class="button">${buttonText}</a>
              </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>© ${year} AMC Agency & Vida Digital CO. Todos los derechos reservados.</p>
            <p>Este es un mensaje automático, por favor no responder directamente.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 1. Welcome Email
    if (type === 'welcome') {
      const content = `
        <p style="font-size: 18px; color: #111827; margin-bottom: 20px;">Hola <strong>${clientData.nombre_representante || 'Cliente'}</strong>,</p>
        <p>¡Bienvenido a la familia! Estamos encantados de tener a <strong>${clientData.nombre_negocio || 'tu negocio'}</strong> con nosotros.</p>
        <p>Tu plataforma está configurada y lista para impulsar tu crecimiento digital.</p>
      `;
      emailConfig = {
        from: 'AMC Agency <bienvenida@amcagencyweb.com>',
        to: [clientData.email],
        subject: '🚀 ¡Bienvenido a AMC Agency! Tu cuenta está lista',
        html: getBaseTemplate('¡Bienvenido a Bordo!', content, 'Ir a Mi Panel', 'https://amcagencyweb.com/dashboard', '#4f46e5')
      };
    }

    // 2. Reminder Email
    else if (type === 'reminder') {
      const content = `
        <p style="font-size: 18px; color: #111827; margin-bottom: 20px;">Hola <strong>${clientData.nombre_representante || 'Cliente'}</strong>,</p>
        <p>Te recordamos que tienes una factura pendiente para mantener activo el servicio de <strong>${clientData.nombre_negocio || 'tu sitio web'}</strong>.</p>
        <p>Evita la suspensión del servicio realizando tu pago hoy mismo.</p>
      `;
      emailConfig = {
        from: 'AMC Agency Billing <facturacion@amcagencyweb.com>',
        to: [clientData.email],
        subject: '⚠️ Recordatorio de Pago Pendiente',
        html: getBaseTemplate('Acción Requerida', content, 'Pagar Ahora', 'https://checkout.nequi.wompi.co/l/xQ1z3t', '#ef4444')
      };
    }

    // 3. Payment Confirmation
    else if (type === 'payment_confirmation') {
      const monto = clientData.monto ? clientData.monto.toLocaleString('es-CO') : '0';
      const content = `
        <p style="font-size: 18px; color: #111827; margin-bottom: 20px;">¡Gracias, <strong>${clientData.nombre_representante || 'Cliente'}</strong>!</p>
        <p>Hemos recibido tu pago correctamente. Tu servicio se encuentra activo.</p>
        
        <table class="info-table">
          <tr>
            <td class="info-label">Negocio</td>
            <td class="info-value">${clientData.nombre_negocio || 'N/A'}</td>
          </tr>
          <tr>
            <td class="info-label">Monto Pagado</td>
            <td class="info-value">$${monto} COP</td>
          </tr>
          <tr>
            <td class="info-label">Fecha</td>
            <td class="info-value">${clientData.fecha_pago || new Date().toLocaleDateString()}</td>
          </tr>
           <tr>
            <td class="info-label">Próximo Pago</td>
            <td class="info-value">${clientData.proximo_pago || 'En 30 días'}</td>
          </tr>
        </table>
      `;
      emailConfig = {
        from: 'AMC Agency Pagos <pagos@amcagencyweb.com>',
        to: [clientData.email],
        subject: '✅ Pago Confirmado Exitosamente',
        html: getBaseTemplate('¡Pago Recibido!', content, 'Ver Mi Cuenta', 'https://amcagencyweb.com/dashboard', '#10b981')
      };
    }

    // 4. Admin Notification
    else if (type === 'admin_notification') {
      const content = `
        <p>Se ha registrado un nuevo cliente en la plataforma.</p>
        <table class="info-table">
          <tr>
            <td class="info-label">Negocio</td>
            <td class="info-value">${clientData.nombre_negocio || 'N/A'}</td>
          </tr>
          <tr>
            <td class="info-label">Email</td>
            <td class="info-value">${clientData.email}</td>
          </tr>
          <tr>
            <td class="info-label">WhatsApp</td>
            <td class="info-value">${clientData.whatsapp || 'N/A'}</td>
          </tr>
        </table>
      `;
      emailConfig = {
        from: 'AMC System <no-reply@amcagencyweb.com>',
        to: ['salcristhi5411@gmail.com'],
        subject: `🔔 Nuevo Cliente: ${clientData.nombre_negocio || 'Registro'}`,
        html: getBaseTemplate('Nuevo Cliente Registrado', content, 'Ver en Admin', 'https://amcagencyweb.com/admin', '#0f172a')
      };
    } else {
      return res.status(400).json({ error: 'Invalid email type' });
    }

    // ENVIAR EMAIL
    console.log('Enviando email con Resend...');
    const { data, error } = await resend.emails.send(emailConfig);

    if (error) {
      console.error('Error devuelto por Resend:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error });
    }

    console.log('Email enviado exitosamente:', data);
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Error crítico en el servidor:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}