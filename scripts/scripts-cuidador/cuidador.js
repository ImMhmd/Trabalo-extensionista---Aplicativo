import { db } from "../scripts-database/firebase.js";
import {
  ref,
  onValue,
  update
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const container = document.getElementById("listaMedicamentos");
const btnLembrete = document.getElementById("btnLembrete");

const lembretesRef = ref(db, "lembretes");

let lembreteSelecionado = null;

/* LISTAR MEDICAMENTOS */
onValue(lembretesRef, (snapshot) => {
  container.innerHTML = "";

  snapshot.forEach((child) => {
    const { remedio, horario, tomado } = child.val();
    const id = child.key;

    const div = document.createElement("div");

    // mantém cores funcionando
    div.className = tomado ? "med tomado" : "med pendente";



    div.innerHTML = `
      <span>${remedio} - ${horario}</span>
      <span class="status">
        ${tomado ? "✔ Tomado" : "⏰ Pendente"}
      </span>
    `;

    // selecionar medicamento
    div.addEventListener("click", () => {
      document
        .querySelectorAll(".med")
        .forEach(m => m.classList.remove("selecionado"));

      div.classList.add("selecionado");
      lembreteSelecionado = id;
    });

    container.appendChild(div);
  });
});

/* BOTÃO ENVIAR LEMBRETE */
btnLembrete.addEventListener("click", () => {
  if (!lembreteSelecionado) {
    alert("Selecione um medicamento primeiro");
    return;
  }

  update(ref(db, `lembretes/${lembreteSelecionado}`), {
    lembreteEnviado: true
  });

  alert("Lembrete enviado ao idoso ✅");
});








