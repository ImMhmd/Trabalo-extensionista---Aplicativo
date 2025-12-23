import { db } from "../scripts-database/firebase.js";
import { ref, push, onValue, remove } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const remedioInput = document.getElementById("remedio");
const horarioInput = document.getElementById("horario");
const addBtn = document.getElementById("addBtn");
const lista = document.getElementById("lista");

const lembretesRef = ref(db, "lembretes");

/* ADICIONAR */
addBtn.addEventListener("click", () => {
  const remedio = remedioInput.value.trim();
  const horario = horarioInput.value;

  if (!remedio || !horario) {
    alert("Preencha tudo");
    return;
  }

  push(lembretesRef, {
    remedio,
    horario
  });

  remedioInput.value = "";
  horarioInput.value = "";
});

/* LISTAR + EXCLUIR */
onValue(lembretesRef, (snapshot) => {
  lista.innerHTML = "";

  snapshot.forEach((child) => {
    const { remedio, horario } = child.val();
    const id = child.key;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${remedio} às ${horario}</span>
      <button class="delete-btn">🗑</button>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => {
      remove(ref(db, `lembretes/${id}`));
    });

    lista.appendChild(li);
  });
});



