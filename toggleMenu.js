function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    
    sidebar.classList.toggle('open');
    
    if (sidebar.classList.contains('open')) {
        content.style.opacity = '0';
    } else {
        setTimeout(() => {
            content.style.opacity = '1';
        }, 300);
    }
}