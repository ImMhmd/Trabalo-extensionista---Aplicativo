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

    // Adicionar lembrete
    addBtn.addEventListener('click', () => {
      const remedio = remedioInput.value.trim();
      const horario = horarioInput.value;

      if (remedio && horario) {
        const li = document.createElement('li');
        li.innerHTML = `<span>${remedio} às ${horario}</span>
                        <button class="delete-btn">🗑</button>`;
        lista.appendChild(li);

        li.querySelector('.delete-btn').addEventListener('click', () => {
          li.remove();
        });

        remedioInput.value = '';
        horarioInput.value = '';
      } else {
        alert('Preencha o nome do remédio e o horário!');
      }
    });