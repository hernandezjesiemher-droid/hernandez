// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('btn');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    // Theme Storage Key
    const THEME_KEY = 'portfolio-theme';
    
    // Initialize Theme
    function initializeTheme() {
        // Check localStorage for saved preference
        const savedTheme = localStorage.getItem(THEME_KEY);
        
        // Check system preference if no saved theme
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Determine which theme to use
        const themeToUse = savedTheme || (prefersDarkMode ? 'dark' : 'dark');
        
        // Apply theme
        applyTheme(themeToUse);
    }
    
    // Apply Theme Function
    function applyTheme(theme) {
        if (theme === 'light') {
            bodyElement.classList.add('light-mode');
            updateButtonIcon('moon');
            localStorage.setItem(THEME_KEY, 'light');
        } else {
            bodyElement.classList.remove('light-mode');
            updateButtonIcon('sun');
            localStorage.setItem(THEME_KEY, 'dark');
        }
    }
    
    // Update Button Icon
    function updateButtonIcon(icon) {
        const iconElement = themeToggleBtn.querySelector('i');
        if (iconElement) {
            iconElement.className = icon === 'moon' 
                ? 'fa-solid fa-moon' 
                : 'fa-solid fa-sun';
        }
    }
    
    // Toggle Theme Function
    function toggleTheme() {
        const isLightMode = bodyElement.classList.contains('light-mode');
        const newTheme = isLightMode ? 'dark' : 'light';
        applyTheme(newTheme);
    }
    
    // Event Listener for Theme Toggle Button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
        
        // Add keyboard support (Space or Enter)
        themeToggleBtn.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
    
    // Listen for System Theme Changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only apply if user hasn't set a preference
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // Initialize Theme on Page Load
    initializeTheme();
});

// Optional: Add smooth transition between themes
document.addEventListener('DOMContentLoaded', function() {
    // Add transition class to body
    const style = document.createElement('style');
    style.textContent = `
        body {
            transition: background-color 0.3s ease, color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});
