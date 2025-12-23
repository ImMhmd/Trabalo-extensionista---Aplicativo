 const lista = document.getElementById('lista');
    const addBtn = document.getElementById('addBtn');
    const remedioInput = document.getElementById('remedio');
    const horarioInput = document.getElementById('horario');
    const toggleTheme = document.getElementById('toggleTheme');
    const body = document.body;

    // Alternar tema claro/escuro
    toggleTheme.addEventListener('click', () => {
      const darkMode = body.getAttribute('data-theme') === 'dark';
      body.setAttribute('data-theme', darkMode ? 'light' : 'dark');
      toggleTheme.textContent = darkMode ? '🌙 Modo escuro' : '☀️ Modo claro';
    });

