// Initialize animations on load
window.addEventListener("DOMContentLoaded", () => {
  // Animate wizard hat
  const wiggle = document.querySelector(".wiggle");
  if (wiggle) {
    wiggle.classList.add("wiggle");
  }

  // Add floating animation to cards
  const cards = document.querySelectorAll(".card-pop");
  cards.forEach(card => {
    card.classList.add("float");
  });

  // Initialize FAQ animations
  initializeFAQAnimations();

  // Add scroll animations
  addScrollAnimations();
});

// FAQ animations
document.addEventListener("DOMContentLoaded", function () {
  function initializeFAQAnimations() {
    const faqButtons = document.querySelectorAll(".faq-toggle");
    faqButtons.forEach((btn) => {
      const icon = btn.querySelector(".spin-icon");
      
      // Hover effect
      btn.addEventListener("mouseenter", () => {
        icon.classList.add("fa-spin");
        btn.style.transform = "translateY(-2px)";
      });
      
      btn.addEventListener("mouseleave", () => {
        icon.classList.remove("fa-spin");
        btn.style.transform = "translateY(0)";
      });

      // Click effect
      btn.addEventListener("click", () => {
        btn.style.transform = "translateY(-4px)";
        setTimeout(() => {
          btn.style.transform = "translateY(0)";
        }, 200);
      });
    });
  }
});

// Registration form handling
function handleRegistrationForm() {
  const form = document.getElementById('registrationForm');
  const modal = new bootstrap.Modal(document.getElementById('successModal'));
  const submitBtn = document.getElementById('submitBtn');
  const checkmark = document.getElementById('checkmark');
  const regConfirm = document.getElementById('reg-confirm');

  if (form && submitBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Show loading state
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Submitting...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.8";

      try {
        // Get form data
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
          data[key] = value;
        }

        // Send to Formspree
        const response = await fetch('https://formspree.io/f/xqaleypl', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }

        // Form submission successful
        // Reset form
        form.reset();
        
        // Hide loading state
        submitBtn.textContent = "Join the Class!";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";

        // Show success animation
        checkmark.style.display = 'block';
        checkmark.classList.add('wiggle');
        regConfirm.style.display = 'block';

        // Show success modal
        modal.show();

        // Hide success animation after 3 seconds
        setTimeout(() => {
          checkmark.classList.remove('wiggle');
          checkmark.style.display = 'none';
          regConfirm.style.display = 'none';
        }, 3000);

      } catch (error) {
        console.error("Form submission error:", error);
        // Handle error (show error message)
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mt-3';
        errorDiv.textContent = 'Sorry, there was an error submitting the form. Please try again.';
        form.insertBefore(errorDiv, form.querySelector('button'));
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";

        // Remove error message after 5 seconds
        setTimeout(() => {
          errorDiv.remove();
        }, 5000);
      }
    });
  }
}

// Add scroll animations
function addScrollAnimations() {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(section => {
    section.classList.add("fade-out");
    observer.observe(section);
  });
}

// Initialize all animations and interactions
function initializeSite() {
  initializeFAQAnimations();
  handleRegistrationForm();
  addScrollAnimations();
}

// Start the site initialization
document.addEventListener("DOMContentLoaded", initializeSite);
