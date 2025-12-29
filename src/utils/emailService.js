// Email service that calls the backend API
const API_URL = import.meta.env.PROD ? 'https://amcagencyweb.com' : 'http://localhost:5173';

export const sendWelcomeEmail = async (clientData) => {
  try {
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'welcome',
        clientData: {
          email: clientData.email,
          nombre_representante: clientData.nombre_representante,
          nombre_negocio: clientData.nombre_negocio
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error sending welcome email:', data);
      return { success: false, error: data.error };
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
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'reminder',
        clientData: {
          email: clientData.email,
          nombre_representante: clientData.nombre_representante,
          nombre_negocio: clientData.nombre_negocio
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error sending reminder email:', data);
      return { success: false, error: data.error };
    }

    console.log('Reminder email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
};
