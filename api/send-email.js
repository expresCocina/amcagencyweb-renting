import { Resend } from 'resend';

// Use RESEND_API_KEY for Vercel serverless functions
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, clientData } = req.body;

    if (!clientData || !clientData.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let emailConfig;

    if (type === 'welcome') {
      emailConfig = {
        from: 'AMC Agency & Vida Digital CO <bienvenida@amcagencyweb.com>',
        to: [clientData.email],
        subject: '🎁 ¡Bienvenido a AMC Agency & Vida Digital CO!

',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .header p {
              margin: 10px 0 0 0;
              opacity: 0.9;
            }
            .content { 
              padding: 40px 30px;
            }
            .button { 
              display: inline-block; 
              background: #667eea; 
              color: white !important; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
              font-weight: bold;
            }
            .features { 
              background: #f9f9f9; 
              padding: 20px; 
              border-radius: 10px; 
              margin: 20px 0;
            }
            .features h3 {
              margin-top: 0;
              color: #667eea;
            }
            .feature-item { 
              padding: 10px 0; 
              border-bottom: 1px solid #eee;
            }
            .feature-item:last-child {
              border-bottom: none;
            }
            .highlight-box {
              background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
              border: 2px solid #ffc107;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
              text-align: center;
            }
            .highlight-box h2 {
              margin: 0;
              color: #333;
              font-size: 24px;
            }
            .footer { 
              text-align: center; 
              padding: 30px; 
              color: #666;
              background: #f9f9f9;
            }
            .footer p {
              margin: 5px 0;
            }
            ol {
              padding-left: 20px;
            }
            ol li {
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 ¡Bienvenido a AMC Agency & Vida Digital CO!</h1>
              <p>Tu transformación digital comienza HOY</p>
            </div>
            
            <div class="content">
              <p>Hola <strong>${clientData.nombre_representante}</strong>,</p>
              

              
              <p>¡Gracias por registrarte en AMC Agency & Vida Digital CO! Estamos emocionados de ayudar a <strong>${clientData.nombre_negocio}</strong> a tener una presencia digital profesional.</p>
              
              <h2 style="color: #667eea;">📋 ¿Qué Sigue?</h2>
              <ol>
                <li><strong>Accede a tu panel:</strong> Inicia sesión para ver el estado de tus servicios</li>
                <li><strong>Servicios en preparación:</strong> Nuestro equipo está activando tus servicios (aparecerán como "Pendiente de activar")</li>
                <li><strong>Recibe tu sitio:</strong> Lo tendrás listo en 7-10 días hábiles</li>
                <li><strong>Disfruta sin costo:</strong> No pagarás nada durante los primeros 30 días</li>
              </ol>
              
              <center>
                <a href="https://amcagencyweb.com/dashboard" class="button">
                  🚀 Ir a Mi Panel
                </a>
              </center>
              
              <div class="features">
                <h3>🎁 Tu Plan Incluye:</h3>
                <div class="feature-item">✅ Sitio web profesional</div>
                <div class="feature-item">✅ Hosting premium incluido</div>
                <div class="feature-item">✅ SSL (HTTPS) incluido</div>
                <div class="feature-item">✅ Diseño responsive (móvil y tablet)</div>
                <div class="feature-item">✅ Google Analytics</div>
                <div class="feature-item">✅ SEO básico</div>
                <div class="feature-item">✅ Soporte técnico 24/7</div>
              </div>
              
              <div class="features">
                <h3>📱 ¿Cómo funciona?</h3>
                <p><strong>Plan Mensual:</strong> Pago mensual fijo<br>
                <strong>Puedes cancelar:</strong> En cualquier momento, sin compromisos</p>
              </div>
              
              <h3 style="color: #667eea;">¿Tienes dudas?</h3>
              <p>Estamos aquí para ayudarte:</p>
              <p>📱 WhatsApp: <a href="https://wa.me/573138537261" style="color: #667eea;">+57 313 853 7261</a></p>
              <p>🌐 Web: <a href="https://amcagencyweb.com" style="color: #667eea;">amcagencyweb.com</a></p>
              
              <p style="margin-top: 30px;"><strong>¡Bienvenido a la familia AMC! 🚀</strong></p>
            </div>
            
            <div class="footer">
              <p><strong>El equipo de AMC Agency & Vida Digital CO</strong></p>
              <p>© 2026 AMC Agency & Vida Digital CO. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  } else if (type === 'reminder') {
    emailConfig = {
      from: 'AMC Agency & Vida Digital CO <recordatorios@amcagencyweb.com>',
      to: [clientData.email],
      subject: '⏰ Recordatorio: Completa tu pago - AMC Agency & Vida Digital CO',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content { 
              padding: 40px 30px;
            }
            .button { 
              display: inline-block; 
              background: #f5576c; 
              color: white !important; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
              font-weight: bold;
            }
            .highlight {
              background: #fff3cd;
              padding: 15px;
              border-left: 4px solid #f5576c;
              margin: 20px 0;
              border-radius: 5px;
            }
            .footer { 
              text-align: center; 
              padding: 30px; 
              color: #666;
              background: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⏰ ¡No olvides completar tu pago!</h1>
            </div>
            
            <div class="content">
              <p>Hola <strong>${clientData.nombre_representante}</strong>,</p>
              
              <p>Notamos que aún no has completado el pago para activar tu sitio web de <strong>${clientData.nombre_negocio}</strong>.</p>
              
              <div class="highlight">
                <p style="margin: 0;"><strong>💰 Monto pendiente:</strong> Pago mensual</p>
              </div>
              
              <p>Una vez realices el pago, activaremos tu sitio web en menos de 48 horas y podrás disfrutar de todos los beneficios:</p>
              
              <ul>
                <li>✅ Sitio web profesional</li>
                <li>✅ Hosting premium</li>
                <li>✅ Dominio .com gratis</li>
                <li>✅ Logo profesional GRATIS</li>
                <li>✅ 3 meses al precio de 2</li>
              </ul>
              
              <center>
                <a href="https://checkout.nequi.wompi.co/l/xQ1z3t" class="button">
                  💳 Pagar Ahora
                </a>
              </center>
              
              <p style="margin-top: 30px;">¿Tienes dudas? Contáctanos:</p>
              <p>📱 WhatsApp: <a href="https://wa.me/573138537261" style="color: #f5576c;">+57 313 853 7261</a></p>
              <p>🌐 Web: <a href="https://amcagencyweb.com" style="color: #f5576c;">amcagencyweb.com</a></p>
            </div>
            
            <div class="footer">
              <p><strong>El equipo de AMC Agency & Vida Digital CO</strong></p>
              <p>© 2026 AMC Agency & Vida Digital CO</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  } else if (type === 'payment_confirmation') {
    emailConfig = {
      from: 'AMC Agency & Vida Digital CO <pagos@amcagencyweb.com>',
      to: [clientData.email],
      subject: '✅ ¡Pago Confirmado! - AMC Agency & Vida Digital CO',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content { 
              padding: 40px 30px;
            }
            .button { 
              display: inline-block; 
              background: #10b981; 
              color: white !important; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
              font-weight: bold;
            }
            .success-box {
              background: #d1fae5;
              padding: 20px;
              border-left: 4px solid #10b981;
              margin: 20px 0;
              border-radius: 5px;
            }
            .info-box {
              background: #f9f9f9;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .footer { 
              text-align: center; 
              padding: 30px; 
              color: #666;
              background: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ ¡Pago Confirmado!</h1>
              <p>Tu sitio web ya está activo</p>
            </div>
            
            <div class="content">
              <p>Hola <strong>${clientData.nombre_representante}</strong>,</p>
              
              <div class="success-box">
                <p style="margin: 0; font-size: 18px;"><strong>🎉 ¡Excelente noticia!</strong></p>
                <p style="margin: 10px 0 0 0;">Hemos recibido tu pago exitosamente y tu sitio web de <strong>${clientData.nombre_negocio}</strong> ya está activo.</p>
              </div>
              
              <h2 style="color: #10b981;">📋 Detalles del Pago:</h2>
              <div class="info-box">
                <div class="info-row">
                  <span><strong>Monto:</strong></span>
                  <span>$${clientData.monto.toLocaleString('es-CO')} COP</span>
                </div>
                <div class="info-row">
                  <span><strong>Fecha de pago:</strong></span>
                  <span>${clientData.fecha_pago}</span>
                </div>
                <div class="info-row">
                  <span><strong>Próximo pago:</strong></span>
                  <span>${clientData.proximo_pago}</span>
                </div>
                <div class="info-row">
                  <span><strong>Estado:</strong></span>
                  <span style="color: #10b981; font-weight: bold;">✅ ACTIVO</span>
                </div>
              </div>
              
              <h2 style="color: #10b981;">🚀 Próximos Pasos:</h2>
              <ol>
                <li><strong>Accede a tu panel:</strong> Inicia sesión para ver el progreso de tu sitio web</li>
                <li><strong>Recibe tu sitio:</strong> Lo tendrás listo en 7-10 días hábiles</li>
                <li><strong>Disfruta los beneficios:</strong> Hosting, dominio, logo y más incluidos</li>
              </ol>
              
              <center>
                <a href="https://amcagencyweb.com/login" class="button">
                  🚀 Ir a Mi Panel
                </a>
              </center>
              
              <div class="info-box">
                <h3 style="margin-top: 0; color: #10b981;">🎁 Tu Plan Incluye:</h3>
                <p>✅ Sitio web profesional 100% GRATIS<br>
                ✅ Hosting premium incluido<br>
                ✅ Dominio .com gratis<br>
                ✅ Logo profesional GRATIS ($150 valor)<br>
                ✅ SSL (HTTPS) incluido<br>
                ✅ Mantenimiento mensual<br>
                ✅ Soporte técnico 24/7</p>
              </div>
              
              <h3 style="color: #10b981;">¿Tienes dudas?</h3>
              <p>Estamos aquí para ayudarte:</p>
              <p>📱 WhatsApp: <a href="https://wa.me/573138537261" style="color: #10b981;">+57 313 853 7261</a></p>
              <p>🌐 Web: <a href="https://amcagencyweb.com" style="color: #10b981;">amcagencyweb.com</a></p>
              
              <p style="margin-top: 30px;"><strong>¡Gracias por confiar en AMC Agency & Vida Digital CO! 🚀</strong></p>
            </div>
            
            <div class="footer">
              <p><strong>El equipo de AMC Agency & Vida Digital CO</strong></p>
              <p>© 2026 AMC Agency & Vida Digital CO. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `;
    };
  } else if (type === 'admin_notification') {
    // Email to notify admin about new registration
    emailConfig = {
      from: 'AMC Agency & Vida Digital CO <notificaciones@amcagencyweb.com>',
      to: ['salcristhi5411@gmail.com'],
      subject: '🎉 Nuevo Cliente Registrado - AMC Agency & Vida Digital CO',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content { 
              padding: 40px 30px;
            }
            .info-box {
              background: #f9fafb;
              border-left: 4px solid #10b981;
              padding: 20px;
              margin: 20px 0;
              border-radius: 5px;
            }
            .info-row {
              display: flex;
              padding: 10px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .info-label {
              font-weight: bold;
              min-width: 150px;
              color: #6b7280;
            }
            .info-value {
              color: #111827;
            }
            .button { 
              display: inline-block; 
              background: #10b981; 
              color: white !important; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
              font-weight: bold;
            }
            .footer { 
              text-align: center; 
              padding: 30px; 
              color: #666;
              background: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Nuevo Cliente Registrado</h1>
            </div>
            
            <div class="content">
              <p>¡Hola! Un nuevo cliente se ha registrado en la plataforma.</p>
              
              <div class="info-box">
                <h3 style="margin-top: 0; color: #10b981;">Información del Cliente</h3>
                <div class="info-row">
                  <span class="info-label">Nombre:</span>
                  <span class="info-value">${clientData.nombre_representante}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Empresa:</span>
                  <span class="info-value">${clientData.nombre_negocio}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Email:</span>
                  <span class="info-value">${clientData.email}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">WhatsApp:</span>
                  <span class="info-value">${clientData.whatsapp || 'No proporcionado'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Dominio:</span>
                  <span class="info-value">${clientData.dominio || 'No proporcionado'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Plan:</span>
                  <span class="info-value">Plan Mensual</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Estado:</span>
                  <span class="info-value">Activo - Servicios pendientes de activación</span>
                </div>
              </div>
              
              <center>
                <a href="https://amcagencyweb.com/admin" class="button">
                  🚀 Ir al Panel de Admin
                </a>
              </center>
              
              <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                <strong>Próximos pasos:</strong><br>
                1. Revisar la información del cliente en el panel de admin<br>
                2. Activar los servicios según sea necesario<br>
                3. Contactar al cliente para iniciar el proyecto
              </p>
            </div>
            
            <div class="footer">
              <p><strong>Sistema de Notificaciones - AMC Agency & Vida Digital CO</strong></p>
              <p>© 2026 AMC Agency & Vida Digital CO. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  } else {
    return res.status(400).json({ error: 'Invalid email type' });
  }

  const { data, error } = await resend.emails.send(emailConfig);

  if (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error });
  }

  console.log('Email sent successfully:', data);
  return res.status(200).json({ success: true, data });

} catch (error) {
  console.error('Server error:', error);
  return res.status(500).json({ error: 'Internal server error', details: error.message });
}
}
