// Initialize Lucide Icons
lucide.createIcons();

// Dynamic content based on service
const urlParams = new URLSearchParams(window.location.search);
const service = urlParams.get('service');

const serviceData = {
    'home': {
        title: 'Home Cleaning',
        img: 'https://images.unsplash.com/photo-1527515545081-5db817172677?auto=format&fit=crop&q=80&w=1000'
    },
    'office': {
        title: 'Office Cleaning',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000'
    },
    'deep': {
        title: 'Deep Cleaning',
        img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1000'
    },
    'move': {
        title: 'Move-in / Move-out',
        img: 'movein.png'
    },
    'construction': {
        title: 'Post Construction',
        img: 'postconstruction.jpeg'
    }
};

if (service && serviceData[service]) {
    const data = serviceData[service];
    const titleEl = document.getElementById('service-title');
    const accentEl = document.getElementById('service-name-accent');
    const imgEl = document.getElementById('detail-img');
    
    if (titleEl) titleEl.innerText = data.title;
    if (accentEl) accentEl.innerText = data.title;
    if (imgEl) imgEl.src = data.img;
    document.title = data.title + " | Gidas Aura";
}

// Scroll Reveal
const handleReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < window.innerHeight - 100) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', handleReveal);
handleReveal(); // Run once on load

// Security: Ensure all external links have noopener noreferrer
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});
