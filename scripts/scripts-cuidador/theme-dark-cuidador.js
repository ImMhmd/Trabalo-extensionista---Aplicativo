const toggleBtn = document.querySelector('.theme-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  // Troca o texto do botão
  if (document.body.classList.contains('dark')) {
    toggleBtn.textContent = '☀️ Modo claro';
  } else {
    toggleBtn.textContent = '🌙 Modo escuro';
  }
});
