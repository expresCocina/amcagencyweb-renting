(function () {
    // Configuration
    const API_URL = 'https://amcagencyweb.com/api/check-site-status';

    // Get current domain
    const domain = window.location.hostname;

    // Styles for the lock screen
    const styles = `
        #waas-lock-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            z-index: 999999999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            text-align: center;
            padding: 20px;
        }

        #waas-lock-container {
            background: rgba(30, 41, 59, 0.5);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(148, 163, 184, 0.1);
            max-width: 500px;
            width: 90%;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        #waas-lock-icon {
            font-size: 64px;
            margin-bottom: 20px;
            display: block;
        }

        #waas-lock-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 15px;
            color: #f8fafc;
        }

        #waas-lock-message {
            font-size: 16px;
            line-height: 1.6;
            color: #cbd5e1;
            margin-bottom: 30px;
        }

        .waas-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
            margin: 0 8px 10px;
            border: none;
            cursor: pointer;
            width: 100%;
            box-sizing: border-box;
        }

        @media (min-width: 640px) {
            .waas-btn {
                width: auto;
            }
        }

        .waas-btn-primary {
            background: #3b82f6;
            color: white;
            box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);
        }
        
        .waas-btn-primary:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }

        .waas-btn-whatsapp {
            background: #22c55e;
            color: white;
            box-shadow: 0 4px 6px -1px rgba(34, 197, 94, 0.5);
        }

        .waas-btn-whatsapp:hover {
            background: #16a34a;
            transform: translateY(-2px);
        }

        #waas-lock-brand {
            margin-top: 30px;
            font-size: 12px;
            color: #64748b;
        }

        body.waas-locked {
            overflow: hidden !important;
            height: 100vh !important;
        }
    `;

    // Inject styles
    function injectStyles() {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Create and show lock screen
    function showLockScreen(data) {
        injectStyles();
        document.body.classList.add('waas-locked');

        const overlay = document.createElement('div');
        overlay.id = 'waas-lock-overlay';

        // Prevent context menu
        overlay.addEventListener('contextmenu', e => e.preventDefault());

        overlay.innerHTML = `
            <div id="waas-lock-container">
                <span id="waas-lock-icon">🔒</span>
                <h1 id="waas-lock-title">Servicio Suspendido</h1>
                <p id="waas-lock-message">
                    El servicio de <strong>${data.clientData?.name || domain}</strong> se encuentra temporalmente suspendido por pagos pendientes.
                    <br><br>
                    Para restaurar el acceso inmediatamente, por favor realiza el pago o contacta a soporte.
                </p>
                
                <div style="display: flex; flex-wrap: wrap; justify-content: center;">
                    <a href="${data.redirectUrl}" class="waas-btn waas-btn-primary" target="_blank">
                        💳 Realizar Pago
                    </a>
                    <a href="https://wa.me/57${data.whatsappNumber}?text=${encodeURIComponent('Hola, quiero reactivar mi servicio web: ' + domain)}" class="waas-btn waas-btn-whatsapp" target="_blank">
                        💬 Contactar Soporte
                    </a>
                </div>

                <div id="waas-lock-brand">
                    Powered by AMC Agency & Vida Digital CO
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Nuke existing content (optional, aggressive mode)
        // document.body.innerHTML = ''; 
        // document.body.appendChild(overlay);
    }

    // Main check function
    async function checkStatus() {
        try {
            // Check if already locked locally to avoid flash
            if (sessionStorage.getItem('waas_locked') === 'true') {
                // showLockScreen({ ...JSON.parse(sessionStorage.getItem('waas_lock_data') || '{}') });
            }

            const response = await fetch(`${API_URL}?domain=${domain}`);
            if (!response.ok) return;

            const data = await response.json();

            if (data.isLocked) {
                // Save state
                sessionStorage.setItem('waas_locked', 'true');
                sessionStorage.setItem('waas_lock_data', JSON.stringify(data));

                // Show lock screen
                showLockScreen(data);

                // Stop other scripts
                window.stop();
            } else {
                sessionStorage.removeItem('waas_locked');
            }

        } catch (error) {
            console.warn('WaaS Verify Error:', error);
        }
    }

    // Run immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkStatus);
    } else {
        checkStatus();
    }

})();
