import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const sendWelcomeEmail = async (clientData) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AMC Agency <onboarding@resend.dev>',
      to: [clientData.email],
      subject: '🎉 ¡Bienvenido a AMC Agency!',
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
              <h1>🎉 ¡Bienvenido a AMC Agency!</h1>
              <p>Tu transformación digital comienza aquí</p>
            </div>
            
            <div class="content">
              <p>Hola <strong>${clientData.nombre_representante}</strong>,</p>
              
              <p>¡Gracias por registrarte en AMC Agency! Estamos emocionados de ayudar a <strong>${clientData.nombre_negocio}</strong> a tener una presencia digital profesional.</p>
              
              <h2 style="color: #667eea;">📋 Próximos Pasos:</h2>
              <ol>
                <li><strong>Inicia sesión</strong> en tu panel de control</li>
                <li><strong>Completa tu pago</strong> de $80,000 COP</li>
                <li><strong>Recibe tu sitio</strong> en 7-10 días hábiles</li>
              </ol>
              
              <center>
                <a href="https://amcagencyweb.com/login" class="button">
                  🚀 Ir a Mi Panel
                </a>
              </center>
              
              <div class="features">
                <h3>🎁 Tu Plan Incluye:</h3>
                <div class="feature-item">✅ Sitio web profesional 100% GRATIS</div>
                <div class="feature-item">✅ Hosting premium incluido</div>
                <div class="feature-item">✅ Dominio .com gratis</div>
                <div class="feature-item">✅ SSL (HTTPS) incluido</div>
                <div class="feature-item">✅ Mantenimiento mensual</div>
                <div class="feature-item">✅ Soporte técnico 24/7</div>
              </div>
              
              <div class="features">
                <h3>🎁 Bonos Especiales:</h3>
                <div class="feature-item">🎨 Logo profesional GRATIS ($150 valor)</div>
                <div class="feature-item">💰 3 meses al precio de 2 (ahorra $20)</div>
                <div class="feature-item">📱 Configuración redes sociales GRATIS</div>
                <div class="feature-item">🔍 Consultoría SEO inicial GRATIS</div>
              </div>
              
              <h3 style="color: #667eea;">¿Tienes dudas?</h3>
              <p>Estamos aquí para ayudarte:</p>
              <p>📱 WhatsApp: <a href="https://wa.me/573138537261" style="color: #667eea;">+57 313 853 7261</a></p>
              <p>🌐 Web: <a href="https://amcagencyweb.com" style="color: #667eea;">amcagencyweb.com</a></p>
              
              <p style="margin-top: 30px;"><strong>¡Bienvenido a la familia AMC! 🚀</strong></p>
            </div>
            
            <div class="footer">
              <p><strong>El equipo de AMC Agency</strong></p>
              <p>© 2025 AMC Agency. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }

    console.log('Welcome email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
};

export const sendPaymentReminderEmail = async (clientData) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AMC Agency <onboarding@resend.dev>',
      to: [clientData.email],
      subject: '⏰ Recordatorio: Completa tu pago - AMC Agency',
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
                <p style="margin: 0;"><strong>💰 Monto pendiente:</strong> $80,000 COP</p>
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
              <p><strong>El equipo de AMC Agency</strong></p>
              <p>© 2025 AMC Agency</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Error sending reminder email:', error);
      return { success: false, error };
    }

    console.log('Reminder email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
};
