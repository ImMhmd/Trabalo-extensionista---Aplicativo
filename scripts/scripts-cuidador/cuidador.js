import { db } from "../scripts-database/firebase.js";
import {
  ref,
  onValue,
  push
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const container = document.getElementById("listaMedicamentos");
const btnLembrete = document.getElementById("btnLembrete");

const lembretesRef = ref(db, "lembretes");
const alertasRef = ref(db, "alertas");

let selecionadoId = null;
let dadosRemedios = {};

/* LISTAR MEDICAMENTOS */
onValue(lembretesRef, (snapshot) => {
  container.innerHTML = "";
  dadosRemedios = {};
  selecionadoId = null;

  snapshot.forEach((child) => {
    const { remedio, horario, tomado } = child.val();
    const id = child.key;

    dadosRemedios[id] = { remedio, horario };

    const div = document.createElement("div");
    div.className = `med ${tomado ? "tomado" : "pendente"}`;

    div.innerHTML = `
      <span>${remedio} - ${horario}</span>
      <span class="status">
        ${tomado ? "✔ Tomado" : "⏰ Pendente"}
      </span>
    `;

    div.addEventListener("click", () => {
      document.querySelectorAll(".med").forEach(m =>
        m.classList.remove("selecionado")
      );

      div.classList.add("selecionado");
      selecionadoId = id;
    });

    container.appendChild(div);
  });
});

/* ENVIAR LEMBRETE */
btnLembrete.addEventListener("click", () => {
  const cardAviso = document.getElementById("cardAviso");

  // LIMPA CLASSES
  cardAviso.classList.remove("sucesso", "aviso");

  if (!selecionadoId) {
    cardAviso.classList.add("aviso");
    cardAviso.innerHTML = `
      ⚠️ Selecione um medicamento primeiro
    `;
    cardAviso.style.display = "block";

    setTimeout(() => {
      cardAviso.style.display = "none";
    }, 3000);

    return;
  }

  const dados = dadosRemedios[selecionadoId];

  push(alertasRef, {
    remedio: dados.remedio,
    horario: dados.horario,
    visto: false,
    criadoEm: Date.now()
  });

  cardAviso.classList.add("sucesso");
  cardAviso.innerHTML = `
    ✅ Lembrete enviado com sucesso!
  `;
  cardAviso.style.display = "block";

  setTimeout(() => {
    cardAviso.style.display = "none";
  }, 3000);
});










