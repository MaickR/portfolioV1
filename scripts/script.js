// Initialize AOS (Animate On Scroll) Library
AOS.init({
  offset: 100,
  delay: 0,
  duration: 800,
  easing: 'ease-in-out',
  once: true, // Animation happens only once
  mirror: false,
  anchorPlacement: 'top-bottom',
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

// Update active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Form validation enhancement
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const btn = this.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Sending...';
    btn.disabled = true;
  });
}

// Parallax effect for hero section (optional enhancement)
// DESACTIVADO: causaba solapamiento del fondo con la siguiente sección en algunos dispositivos.
// Si deseas reactivarlo, considera usar un contenedor interno para mover el fondo sin afectar el flujo.
// window.addEventListener('scroll', () => {
//   const scrolled = window.pageYOffset;
//   const parallax = document.querySelector('#home');
//   if (parallax) {
//     parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
//   }
// });

// Portfolio Filter Functionality + counts
const filterButtons = document.querySelectorAll('.portfolio-filters .nav-link');
const portfolioItems = document.querySelectorAll('.portfolio-item');

function applyFilter(filterValue) {
  portfolioItems.forEach(item => {
    const category = item.getAttribute('data-category');
    const shouldShow = filterValue === 'all' || category === filterValue;
    item.style.display = shouldShow ? 'block' : 'none';
    item.classList.toggle('fade-in', shouldShow);
  });
  setTimeout(() => AOS.refresh(), 250);
}

function updateCounts() {
  const counts = { all: portfolioItems.length };
  portfolioItems.forEach(item => {
    const cat = item.getAttribute('data-category');
    counts[cat] = (counts[cat] || 0) + 1;
  });
  filterButtons.forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    const badge = btn.querySelector('.count-badge');
    if (badge) badge.textContent = counts[filter] ?? 0;
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    this.classList.add('active');
    this.setAttribute('aria-pressed', 'true');
    const filterValue = this.getAttribute('data-filter');
    applyFilter(filterValue);
  });
});

// Initialize counts and default filter
updateCounts();
applyFilter('all');

// Modal Enhancement - Mejoras para los modales de proyectos
document.addEventListener('DOMContentLoaded', function() {
  const modals = document.querySelectorAll('.modal');
  
  modals.forEach(modal => {
    // Resetear el scroll cuando se cierra el modal
    modal.addEventListener('hidden.bs.modal', function() {
      const modalBody = this.querySelector('.modal-body');
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
    });
    
    // Prevenir el cierre del modal al hacer clic en el contenido
    const modalDialog = modal.querySelector('.modal-dialog');
    if (modalDialog) {
      modalDialog.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
    
    // Mejorar la accesibilidad - cerrar con ESC
    modal.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const closeButton = this.querySelector('[data-bs-dismiss="modal"]');
        if (closeButton) {
          closeButton.click();
        }
      }
    });
  });
  
  // Agregar efecto de hover suave a las imágenes del modal
  const modalImages = document.querySelectorAll('.modal-body img');
  modalImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Optimización para dispositivos móviles
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }
});