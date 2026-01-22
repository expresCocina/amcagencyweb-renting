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

    // Log para depurar en Vercel (Verás esto en los logs si falla)
    console.log(`Intentando enviar email tipo: ${type} a: ${clientData?.email}`);

    if (!clientData || !clientData.email) {
      return res.status(400).json({ error: 'Missing required fields: clientData or email' });
    }

    let emailConfig;

    // Lógica de selección de templates
    if (type === 'welcome') {
      emailConfig = {
        from: 'AMC Agency & Vida Digital CO <bienvenida@amcagencyweb.com>',
        to: [clientData.email],
        subject: '🎁 ¡Bienvenido a AMC Agency & Vida Digital CO!',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
            .content { padding: 40px 30px; }
            .button { display: inline-block; background: #667eea; color: white !important; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; padding: 30px; color: #666; background: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 ¡Bienvenido!</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${clientData.nombre_representante || 'Cliente'}</strong>,</p>
              <p>Gracias por registrarte. Estamos listos para ayudar a <strong>${clientData.nombre_negocio || 'tu negocio'}</strong>.</p>
              <center>
                <a href="https://amcagencyweb.com/dashboard" class="button">🚀 Ir a Mi Panel</a>
              </center>
            </div>
            <div class="footer"><p>© 2026 AMC Agency & Vida Digital CO</p></div>
          </div>
        </body>
        </html>
        `
      };
    } else if (type === 'reminder') {
      emailConfig = {
        from: 'AMC Agency & Vida Digital CO <recordatorios@amcagencyweb.com>',
        to: [clientData.email],
        subject: '⏰ Recordatorio: Completa tu pago',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: sans-serif; color: #333; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 40px 30px; text-align: center; }
            .content { padding: 40px 30px; }
            .button { display: inline-block; background: #f5576c; color: white !important; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"><h1>⏰ ¡No olvides tu pago!</h1></div>
            <div class="content">
              <p>Hola <strong>${clientData.nombre_representante || 'Cliente'}</strong>,</p>
              <p>Aún no has completado el pago para <strong>${clientData.nombre_negocio || 'tu negocio'}</strong>.</p>
              <center>
                <a href="https://checkout.nequi.wompi.co/l/xQ1z3t" class="button">💳 Pagar Ahora</a>
              </center>
            </div>
          </div>
        </body>
        </html>
        `
      };
    } else if (type === 'payment_confirmation') {

      // --- CORRECCIÓN CRÍTICA AQUÍ ---
      // Si clientData.monto no existe, .toLocaleString() rompe el servidor.
      const montoFormateado = clientData.monto
        ? clientData.monto.toLocaleString('es-CO')
        : '0';
      // -------------------------------

      emailConfig = {
        from: 'AMC Agency & Vida Digital CO <pagos@amcagencyweb.com>',
        to: [clientData.email],
        subject: '✅ ¡Pago Confirmado!',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: sans-serif; color: #333; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 30px; text-align: center; }
            .content { padding: 40px 30px; }
            .button { display: inline-block; background: #10b981; color: white !important; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"><h1>✅ ¡Pago Exitoso!</h1></div>
            <div class="content">
              <p>Hola <strong>${clientData.nombre_representante || 'Cliente'}</strong>,</p>
              <p>Hemos recibido tu pago de <strong>$${montoFormateado} COP</strong>.</p>
              <center>
                <a href="https://amcagencyweb.com/login" class="button">🚀 Ir a Mi Panel</a>
              </center>
            </div>
          </div>
        </body>
        </html>
        `
      };
    } else if (type === 'admin_notification') {
      emailConfig = {
        from: 'AMC Agency & Vida Digital CO <notificaciones@amcagencyweb.com>',
        to: ['salcristhi5411@gmail.com'],
        subject: '🎉 Nuevo Cliente Registrado',
        html: `
        <!DOCTYPE html>
        <html>
        <body>
          <h3>Nuevo Cliente: ${clientData.nombre_negocio || 'Sin nombre'}</h3>
          <p>Email: ${clientData.email}</p>
          <p>Tel: ${clientData.whatsapp || 'N/A'}</p>
        </body>
        </html>
        `
      };
    } else {
      return res.status(400).json({ error: 'Invalid email type' });
    }

    // ENVIAR EMAIL
    console.log('Enviando email con Resend...');
    const { data, error } = await resend.emails.send(emailConfig);

    if (error) {
      console.error('Error devuelto por Resend:', error);
      // Devolvemos el error en JSON para que el frontend lo lea bien
      return res.status(500).json({ error: 'Failed to send email', details: error });
    }

    console.log('Email enviado exitosamente:', data);
    return res.status(200).json({ success: true, data });

  } catch (error) {
    // ESTE CATCH ES EL QUE EVITA EL ERROR 500 DE TEXTO PLANO
    console.error('Error crítico en el servidor:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}