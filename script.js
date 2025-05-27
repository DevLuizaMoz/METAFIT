document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const menuButton = document.getElementById('menuButton');
    const closeButton = document.getElementById('closeButton');
    const sidebarLinks = document.querySelectorAll('.sidebar a:not(#closeButton)');

    // Abre o sidebar
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.add('active');
    });

    // Fecha o sidebar
    closeButton.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.remove('active');
    });

    // Fecha o sidebar ao clicar em qualquer link (apenas mobile)
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 942) {
                sidebar.classList.remove('active');
            }
        });
    });
});