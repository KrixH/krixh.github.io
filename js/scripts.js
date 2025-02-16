document.getElementById("year").innerHTML = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.history.back();
        });
    });
});


// Cookie értesítés
if (!document.cookie.includes('cookie_consent=true')) {
    const cookieBanner = document.createElement('div');
    cookieBanner.style.position = 'fixed';
    cookieBanner.style.bottom = '0';
    cookieBanner.style.background = 'rgba(0,0,0,0.9)';
    cookieBanner.style.color = '#fff';
    cookieBanner.style.padding = '1rem';
    cookieBanner.style.width = '100%';
    cookieBanner.style.textAlign = 'center';
    cookieBanner.innerHTML = `
        Ez a weboldal sütiket használ. 
        <button onclick="acceptCookies()" style="margin-left: 1rem; padding: 5px 15px; background: #333; color: #fff; border: none; border-radius: 5px;">
            Elfogadom
        </button>
    `;
    document.body.appendChild(cookieBanner);
}

function acceptCookies() {
    document.cookie = "cookie_consent=true; max-age=2592000; path=/";
    const cookieBanner = document.querySelector('div[style*="fixed"]');
    if (cookieBanner) {
        cookieBanner.remove();
    }
}