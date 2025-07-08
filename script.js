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

// JavaScript para o seletor de localização
document.addEventListener('DOMContentLoaded', function() {
  const estadosSelect = document.getElementById('estados');
  const cidadesSelect = document.getElementById('cidades');
  const unidadesSelect = document.getElementById('unidades');
  
  // Dados fictícios de cidades por estado
  const cidadesPorEstado = {
    'sp': ['São Paulo', 'Campinas', 'São José dos Campos', 'Ribeirão Preto', 'Santos'],
    'rj': ['Rio de Janeiro', 'Niterói', 'Nova Iguaçu', 'Barra da Tijuca', 'Campos dos Goytacazes'],
    'mg': ['Belo Horizonte', 'Uberlândia', 'Juiz de Fora', 'Contagem', 'Montes Claros'],
    'pr': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel'],
    'rs': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria', 'Canela']
  };
  
  // Dados fictícios de unidades por cidade
  const unidadesPorCidade = {
    'são paulo': ['MetaFit Paulista', 'MetaFit Ibirapuera', 'MetaFit Morumbi', 'MetaFit Premium Centro'],
    'rio de janeiro': ['MetaFit Copacabana', 'MetaFit Ipanema', 'MetaFit Barra', 'MetaFit Premium Leblon'],
    'belo horizonte': ['MetaFit Savassi', 'MetaFit Lourdes', 'MetaFit Pampulha', 'MetaFit Premium BH'],
    'curitiba': ['MetaFit Batel', 'MetaFit Água Verde', 'MetaFit Shopping Palladium', 'MetaFit Premium Curitiba'],
    'porto alegre': ['MetaFit Moinhos', 'MetaFit Centro Histórico', 'MetaFit Shopping Iguatemi', 'MetaFit Premium POA']
  };
  
  // Evento para mudança de estado
  estadosSelect.addEventListener('change', function() {
    const estadoSelecionado = this.value;
    
    // Resetar cidades e unidades
    cidadesSelect.innerHTML = '<option value="">Selecione sua cidade</option>';
    unidadesSelect.innerHTML = '<option value="">Selecione primeiro a cidade</option>';
    unidadesSelect.disabled = true;
    
    if (estadoSelecionado) {
      cidadesSelect.disabled = false;
      
      // Popular cidades baseadas no estado selecionado
      cidadesPorEstado[estadoSelecionado].forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade.toLowerCase();
        option.textContent = cidade;
        cidadesSelect.appendChild(option);
      });
    } else {
      cidadesSelect.disabled = true;
      cidadesSelect.innerHTML = '<option value="">Selecione primeiro o estado</option>';
    }
  });
  
  // Evento para mudança de cidade
  cidadesSelect.addEventListener('change', function() {
    const cidadeSelecionada = this.value;
    
    // Resetar unidades
    unidadesSelect.innerHTML = '<option value="">Selecione a unidade</option>';
    
    if (cidadeSelecionada) {
      unidadesSelect.disabled = false;
      
      // Verificar se temos unidades específicas para esta cidade
      if (unidadesPorCidade[cidadeSelecionada]) {
        // Usar unidades específicas se existirem
        unidadesPorCidade[cidadeSelecionada].forEach(unidade => {
          const option = document.createElement('option');
          option.value = unidade.toLowerCase().replace(/\s/g, '-');
          option.textContent = unidade;
          unidadesSelect.appendChild(option);
        });
      } else {
        // Criar unidades genéricas se não houver específicas
        const unidadesGenericas = [
          `MetaFit ${capitalizeFirstLetter(cidadeSelecionada)} Centro`,
          `MetaFit ${capitalizeFirstLetter(cidadeSelecionada)} Zona Norte`,
          `MetaFit ${capitalizeFirstLetter(cidadeSelecionada)} Shopping`,
          `MetaFit Premium ${capitalizeFirstLetter(cidadeSelecionada)}`
        ];
        
        unidadesGenericas.forEach(unidade => {
          const option = document.createElement('option');
          option.value = unidade.toLowerCase().replace(/\s/g, '-');
          option.textContent = unidade;
          unidadesSelect.appendChild(option);
        });
      }
    } else {
      unidadesSelect.disabled = true;
      unidadesSelect.innerHTML = '<option value="">Selecione primeiro a cidade</option>';
    }
  });
  
  // Função auxiliar para capitalizar a primeira letra
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // Evento para o botão de matrícula
  document.querySelector('.btn-matricula').addEventListener('click', function() {
    const unidadeSelecionada = unidadesSelect.value;
    
    if (unidadeSelecionada) {
      alert(`Redirecionando para matrícula na unidade: ${unidadesSelect.options[unidadesSelect.selectedIndex].text}`);
      // Aqui você pode adicionar o redirecionamento real ou abrir um formulário
    } else {
      alert('Por favor, selecione uma unidade antes de se matricular');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const carrossel = document.querySelector('.carrossel');
    const items = document.querySelectorAll('.carrossel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentIndex = 0;
    
    // Para dispositivos com touch
    items.forEach((item, index) => {
        // Prevenir drag de imagens
        item.addEventListener('dragstart', (e) => e.preventDefault());
        
        // Eventos de touch
        item.addEventListener('touchstart', touchStart(index));
        item.addEventListener('touchend', touchEnd);
        item.addEventListener('touchmove', touchMove);
        
        // Eventos de mouse
        item.addEventListener('mousedown', touchStart(index));
        item.addEventListener('mouseup', touchEnd);
        item.addEventListener('mouseleave', touchEnd);
        item.addEventListener('mousemove', touchMove);
    });
    
    // Funções para o drag
    function touchStart(index) {
        return function(event) {
            currentIndex = index;
            startPos = getPositionX(event);
            isDragging = true;
            
            animationID = requestAnimationFrame(animation);
            carrossel.classList.add('grabbing');
        }
    }
    
    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        const movedBy = currentTranslate - prevTranslate;
        
        if (movedBy < -100 && currentIndex < items.length - 1) {
            currentIndex += 1;
        }
        
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }
        
        setPositionByIndex();
        carrossel.classList.remove('grabbing');
    }
    
    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }
    
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }
    
    function setSliderPosition() {
        carrossel.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function setPositionByIndex() {
        currentTranslate = currentIndex * -items[0].offsetWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }
    
    // Botões de navegação (mantenha a funcionalidade existente)
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            setPositionByIndex();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            setPositionByIndex();
        }
    });
    
    // Prevenir o comportamento padrão de toque para evitar conflitos
    window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
});