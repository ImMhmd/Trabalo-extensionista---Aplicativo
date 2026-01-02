import { db } from "../scripts-database/firebase.js";
import {
  ref,
  push,
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const remedioInput = document.getElementById("remedio");
const horarioInput = document.getElementById("horario");
const addBtn = document.getElementById("addBtn");
const lista = document.getElementById("lista");

const lembretesRef = ref(db, "lembretes");
const alertasRef = ref(db, "alertas");

/* ADICIONAR REMÉDIO */
addBtn.addEventListener("click", () => {
  const remedio = remedioInput.value.trim();
  const horario = horarioInput.value;

  if (!remedio || !horario) {
    alert("Preencha tudo");
    return;
  }

  push(lembretesRef, {
    remedio,
    horario,
    tomado: false
  });

  remedioInput.value = "";
  horarioInput.value = "";
});

/* LISTAR + CHECKBOX + EXCLUIR */
onValue(lembretesRef, (snapshot) => {
  lista.innerHTML = "";

  snapshot.forEach((child) => {
    const { remedio, horario, tomado } = child.val();
    const id = child.key;

    const li = document.createElement("li");

    li.innerHTML = `
      <label style="display:flex; gap:8px; align-items:center;">
        <input type="checkbox" ${tomado ? "checked" : ""}>
        <span>${remedio} às ${horario}</span>
      </label>
      <button class="delete-btn">🗑</button>
    `;

    const checkbox = li.querySelector("input");
    checkbox.addEventListener("change", () => {
      update(ref(db, `lembretes/${id}`), {
        tomado: checkbox.checked
      });
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      remove(ref(db, `lembretes/${id}`));
    });

    lista.appendChild(li);
  });
});

/* RECEBER ALERTA DO CUIDADOR */
onValue(alertasRef, (snapshot) => {
  snapshot.forEach((child) => {
    const alerta = child.val();

    if (!alerta.visto) {
      const overlay = document.getElementById("alertaOverlay");
      const texto = document.getElementById("alertaTexto");
      const btnOk = document.getElementById("btnOk");

      texto.innerHTML = `
        <strong>Remédio:</strong> ${alerta.remedio}<br>
        <strong>Horário:</strong> ${alerta.horario}
      `;

      overlay.classList.remove("hidden");

      btnOk.onclick = () => {
        overlay.classList.add("hidden");
      };


      update(ref(db, `alertas/${child.key}`), {
        visto: true
      });
    }
  });
});








