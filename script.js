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




document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos corretamente
    const carrossel = document.querySelector('.carrossel');
    const items = document.querySelectorAll('.carrossel-item');
    const btnPrev = document.querySelector('.prev-btn');
    const btnNext = document.querySelector('.next-btn');
    
    // Verifica se os elementos existem
    if (!carrossel || items.length === 0 || !btnPrev || !btnNext) {
        console.error('Elementos do carrossel não encontrados!');
        return;
    }
    
    let currentIndex = 0;
    let itemWidth = items[0].offsetWidth + 15; // 15px é o gap do CSS
    
    // Atualiza a largura quando a janela for redimensionada
    window.addEventListener('resize', function() {
        itemWidth = items[0].offsetWidth + 15;
        updateCarrossel();
    });
    
    function updateCarrossel() {
        const offset = -currentIndex * itemWidth;
        carrossel.style.transform = `translateX(${offset}px)`;
        console.log('Carrossel atualizado:', currentIndex, offset); // Debug
    }
    
    // Eventos dos botões
    btnNext.addEventListener('click', function() {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarrossel();
        }
        console.log('Next clicked', currentIndex); // Debug
    });
    
    btnPrev.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarrossel();
        }
        console.log('Prev clicked', currentIndex); // Debug
    });
    
    // Toque para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    carrossel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    
    carrossel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const threshold = 50; // Mínimo de pixels para considerar o swipe
        
        if (touchEndX + threshold < touchStartX) { // Swipe para a esquerda
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateCarrossel();
            }
        } else if (touchEndX - threshold > touchStartX) { // Swipe para a direita
            if (currentIndex > 0) {
                currentIndex--;
                updateCarrossel();
            }
        }
    }
    
    // Inicializa o carrossel
    updateCarrossel();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth', /* Scroll suave */
            block: 'start'      /* Alinha ao topo */
        });
    });
});

function vermais(botao) {
    let comentario = botao.closest(".testimonials-item"); // Obtém o elemento pai correto
    let pontos = comentario.querySelector(".pontos");
    let maisTexto = comentario.querySelector(".mais");
    
    if (pontos.style.display === "none") {
        pontos.style.display = "inline";
        maisTexto.style.display = "none";
        botao.innerHTML = "Ver mais";
    } else {
        pontos.style.display = "none";
        maisTexto.style.display = "inline";
        botao.innerHTML = "Ver menos";
    }
}