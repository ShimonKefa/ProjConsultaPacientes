document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.password-toggle-btn');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const wrapper = btn.closest('.password-input-wrapper');
            const input = wrapper ? wrapper.querySelector('input') : null;
            if (!input) return;

            const isPassword = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPassword ? 'text' : 'password');
            btn.classList.toggle('is-visible', isPassword);

            const newLabel = isPassword ? 'Ocultar senha' : 'Mostrar senha';
            btn.setAttribute('aria-label', newLabel);
            btn.setAttribute('title', newLabel);
            input.focus();
        });
    });
});
