const themeToggleCheckbox = document.getElementById('checkbox');
const body = document.body;

// Apply saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggleCheckbox.checked = false;
} else {
    body.classList.remove('dark-mode');
    themeToggleCheckbox.checked = true;
}

// Handle toggle change
themeToggleCheckbox.addEventListener('change', () => {
    const isChecked = themeToggleCheckbox.checked;

    if (isChecked) {
        // Light mode
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        // Dark mode
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
});



document.addEventListener("DOMContentLoaded", function () {
  const nameElement = document.getElementById("name");
  const nameText = "Ritesh Patel";
  let i = 0;

  // Reset styles before typing starts
  nameElement.style.opacity = "1";
  nameElement.textContent = "";

  function typeEffect() {
    if (i < nameText.length) {
      nameElement.textContent += nameText.charAt(i);
      i++;
      setTimeout(typeEffect, 120);
    } else {
      nameElement.style.transition = "text-shadow 0.6s ease";
      nameElement.style.textShadow = "0 0 12px var(--heading-color)";
      setTimeout(() => (nameElement.style.textShadow = "none"), 1000);
    }
  }
  setTimeout(typeEffect, 600);
});