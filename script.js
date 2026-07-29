// =============================================
// AGUARDAR DOM CARREGAR
// =============================================
document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // MENU MOBILE
    // =============================================
    const mobileBtn = document.getElementById('mobile_btn');
    const mobileMenu = document.getElementById('mobile_menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // =============================================
    // SMOOTH SCROLL
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // =============================================
    // FAVORITO (CORAÇÃO)
    // =============================================
    document.querySelectorAll('.dish-heart').forEach(heart => {
        heart.addEventListener('click', () => {
            heart.classList.toggle('favorited');
            if (heart.classList.contains('favorited')) {
                heart.style.backgroundColor = '#e74c3c';
                heart.querySelector('i').style.color = '#fff';
            } else {
                heart.style.backgroundColor = '';
                heart.querySelector('i').style.color = '';
            }
        });
    });

    // =============================================
    // MODAL "PEÇA AQUI"
    // =============================================
    function abrirModalPeca() {
        const modal = document.getElementById('modalPeca');
        if (modal) {
            modal.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }
    }

    function fecharModalPeca() {
        const modal = document.getElementById('modalPeca');
        if (modal) {
            modal.classList.remove('ativo');
            document.body.style.overflow = '';
        }
    }

    // Disponibilizar funções globalmente
    window.fecharModalPeca = fecharModalPeca;

    // Abrir modal ao clicar em "Peça aqui"
    document.querySelectorAll('.btn-pecar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            abrirModalPeca();
        });
    });

    // Fechar modal ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('ativo');
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.ativo').forEach(modal => {
                modal.classList.remove('ativo');
                document.body.style.overflow = '';
            });
        }
    });

    // =============================================
    // MODAL DE CONFIRMAÇÃO (RESERVA)
    // =============================================
    window.fecharModal = function () {
        const modal = document.getElementById('modalConfirmacao');
        if (modal) {
            modal.classList.remove('ativo');
            document.body.style.overflow = '';
        }
    };

    // =============================================
    // FORMULÁRIO DE RESERVA
    // =============================================
    const reservaForm = document.getElementById('reservaForm');

    if (reservaForm) {
        // Data mínima = hoje
        const dataInput = document.getElementById('data');
        if (dataInput) {
            const hoje = new Date().toISOString().split('T')[0];
            dataInput.setAttribute('min', hoje);
        }

        // Máscara telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);

                if (value.length > 6) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                } else if (value.length > 2) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length > 0) {
                    value = `(${value}`;
                }

                e.target.value = value;
            });
        }

        // Envio
        reservaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(reservaForm);
            const nome = formData.get('nome');
            const telefone = formData.get('telefone');
            const pessoas = formData.get('pessoas');
            const data = formData.get('data');
            const horario = formData.get('horario');
            const observacoes = formData.get('observacoes');

            const dataObj = new Date(data + 'T12:00:00');
            const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const modalMsg = document.getElementById('modalMensagem');
            const modalDetalhes = document.getElementById('modalDetalhes');

            if (modalMsg) {
                modalMsg.textContent = `Obrigado, ${nome}! Sua reserva foi enviada com sucesso.`;
            }

            if (modalDetalhes) {
                modalDetalhes.innerHTML = `
                    <strong>Detalhes da Reserva:</strong><br>
                    📅 ${dataFormatada}<br>
                    ⏰ ${horario}<br>
                    👥 ${pessoas} ${parseInt(pessoas) === 1 ? 'pessoa' : 'pessoas'}<br>
                    📞 ${telefone}<br>
                    ${observacoes ? `📝 ${observacoes}` : ''}
                `;
            }

            const modalConfirmacao = document.getElementById('modalConfirmacao');
            if (modalConfirmacao) {
                modalConfirmacao.classList.add('ativo');
                document.body.style.overflow = 'hidden';
            }

            reservaForm.reset();
        });
    }

});
