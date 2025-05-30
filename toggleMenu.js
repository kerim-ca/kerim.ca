function toggleMenu() {
    const sidebar = document.getElementById('sidebar'); //
    const content = document.getElementById('content'); //
    
    // Get the hamburger button
    // Assuming there's only one element with the class 'hamburger' that is a button
    // Or, if you give the button an ID, e.g., id="hamburger-button", you can use getElementById
    const hamburgerButton = document.querySelector('button.hamburger'); 

    if (!sidebar || !content) {
        console.error('Sidebar or content element not found!');
        return;
    }
    
    sidebar.classList.toggle('open'); //
    
    if (sidebar.classList.contains('open')) {
        content.style.opacity = '0'; //
        if (hamburgerButton) {
            hamburgerButton.setAttribute('aria-expanded', 'true');
        }
    } else {
        setTimeout(() => {
            content.style.opacity = '1'; //
        }, 300); //
        if (hamburgerButton) {
            hamburgerButton.setAttribute('aria-expanded', 'false');
        }
    }
}