(function () {
    // Configuration
    const API_URL = 'https://amcagencyweb.com/api/check-site-status';

    // Helper to get script tag params
    const scriptTag = document.currentScript;
    let debugMode = false;
    let domainOverride = null;

    if (scriptTag) {
        const srcParts = scriptTag.src.split('?');
        if (srcParts.length > 1) {
            const urlParams = new URLSearchParams(srcParts[1]);
            debugMode = urlParams.get('debug') === 'true';
            domainOverride = urlParams.get('domain');
        }
    }

    // Get current domain or override for testing
    // Usage: <script src=".../waas-lock.js?domain=example.com&debug=true"></script>
    const domain = domainOverride || window.location.hostname;

    if (debugMode) {
        console.log('🔒 WaaS Lock: Initializing...');
        console.log('🔒 WaaS Lock: Checking status for domain:', domain);
        console.log('🔒 WaaS Lock: API URL:', API_URL);
    }

    // Styles for the lock screen
    const styles = `
        #waas-lock-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            z-index: 2147483647; /* Max z-index */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
            opacity: 0;
            animation: waas-fade-in 0.5s forwards;
        }

        @keyframes waas-fade-in {
            to { opacity: 1; }
        }

        #waas-lock-container {
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            max-width: 480px;
            width: 100%;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.5);
        }

        @media (min-width: 640px) {
             #waas-lock-container {
                padding: 60px 40px;
             }
        }

        #waas-lock-icon-container {
            width: 80px;
            height: 80px;
            background: #e0f2fe;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);
        }

        #waas-lock-icon {
            font-size: 40px;
            line-height: 1;
        }

        #waas-lock-title {
            font-size: 26px;
            font-weight: 700;
            margin: 0 0 12px;
            color: #1e293b;
            letter-spacing: -0.5px;
        }

        #waas-lock-message {
            font-size: 16px;
            line-height: 1.6;
            color: #64748b;
            margin: 0 auto 32px;
            max-width: 400px;
        }

        .waas-btn-group {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .waas-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 14px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            text-decoration: none;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            cursor: pointer;
            width: 100%;
            box-sizing: border-box;
        }

        .waas-btn:active {
            transform: scale(0.98);
        }

        .waas-btn-primary {
            background: linear-gradient(to right, #2563eb, #1d4ed8);
            color: white;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        
        .waas-btn-primary:hover {
            box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
            transform: translateY(-1px);
        }

        .waas-btn-whatsapp {
            background: #ffffff;
            color: #334155;
            border: 1px solid #e2e8f0;
        }

        .waas-btn-whatsapp:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
            color: #0f172a;
        }

        #waas-lock-brand {
            margin-top: 32px;
            font-size: 12px;
            color: #94a3b8;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
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
        if (document.getElementById('waas-lock-overlay')) return; // Prevent duplicates

        injectStyles();
        document.body.classList.add('waas-locked');

        const overlay = document.createElement('div');
        overlay.id = 'waas-lock-overlay';

        // Prevent context menu
        overlay.addEventListener('contextmenu', e => e.preventDefault());

        overlay.innerHTML = `
            <div id="waas-lock-container">
                <div id="waas-lock-icon-container">
                    <span id="waas-lock-icon">👋</span>
                </div>
                <h1 id="waas-lock-title">Hola, ${data.clientData?.name || 'Cliente'}</h1>
                <p id="waas-lock-message">
                    Notamos que tu suscripción para <strong>${domain}</strong> requiere atención. 
                    Reactiva tu servicio en segundos para continuar disfrutando de tu sitio web sin interrupciones.
                </p>
                
                <div class="waas-btn-group">
                    <a href="${data.redirectUrl}" class="waas-btn waas-btn-primary" target="_blank">
                        💳 Pagar Ahora y Reactivar
                    </a>
                    <a href="https://wa.me/57${data.whatsappNumber}?text=${encodeURIComponent('Hola, necesito ayuda con la reactivación de mi sitio: ' + domain)}" class="waas-btn waas-btn-whatsapp" target="_blank">
                        💬 Hablar con Soporte
                    </a>
                </div>

                <div id="waas-lock-brand">
                    Powered by AMC Agency
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        if (debugMode) console.log('🔒 WaaS Lock: Screen activated!');
    }

    // Main check function
    async function checkStatus() {
        try {
            if (debugMode) console.log('🔒 WaaS Lock: Fetching status for ' + domain + '...');

            const response = await fetch(`${API_URL}?domain=${domain}`);

            if (!response.ok) {
                if (debugMode) console.error('🔒 WaaS Lock: API Error', response.status, response.statusText);
                return;
            }

            const data = await response.json();
            if (debugMode) console.log('🔒 WaaS Lock: API Response', data);

            if (data.isLocked) {
                if (debugMode) console.warn('🔒 WaaS Lock: SITE IS LOCKED ⛔');
                showLockScreen(data);

                // Try stop
                try { window.stop(); } catch (e) { }
            } else {
                if (debugMode) console.log('🔒 WaaS Lock: Site is active ✅');
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
