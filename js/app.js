// js/app.js

document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Toggle Logic (for index.html, booking.html, donation.html) ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const navLinks = document.querySelector("header nav .space-x-4"); // Assuming this is the desktop links container

  if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener("click", () => {
      // A simple way to show/hide the links (you might need a dedicated mobile menu div)
      if (navLinks.classList.contains("hidden")) {
        // In a real app, you'd show a full-screen or dropdown mobile menu here
        console.log("Mobile menu clicked - showing links.");
        // For simplicity, we'll just log it since the Tailwind structure is for desktop
      } else {
        console.log("Mobile menu clicked - hiding links.");
      }
    });
  }

  // --- Global Utility: Simple Alert Feedback (Mock) ---
  window.showToast = (message, type = "success") => {
    console.log(`[TOAST ${type.toUpperCase()}]: ${message}`);
    // In a real app, this would show a small, non-intrusive pop-up notification
    alert(`Notification (${type.toUpperCase()}): ${message}`);
  };

  console.log("EasyHealth App Initialized.");
});
