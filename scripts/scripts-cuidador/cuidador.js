import { db } from "../scripts-database/firebase.js";
import {
  ref,
  onValue,
  push
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

/* ================= ELEMENTOS ================= */
const listaMedicamentos = document.getElementById("listaMedicamentos");
const btnLembrete = document.getElementById("btnLembrete");
const btnHistorico = document.getElementById("btnHistorico");
const cardAviso = document.getElementById("cardAviso");

const cardHistorico = document.getElementById("cardHistorico");
const btnFecharHistorico = document.getElementById("btnFecharHistorico");
const filtroDias = document.getElementById("filtroDias");
const listaHistorico = document.getElementById("listaHistorico");

/* ================= FIREBASE ================= */
const lembretesRef = ref(db, "lembretes");
const alertasRef = ref(db, "alertas");

/* ================= ESTADO ================= */
let medicamentoSelecionado = null;
let dadosMedicamentos = {};

/* ================= UTIL ================= */
function mostrarAviso(texto, tipo = "sucesso") {
  cardAviso.style.display = "block";
  cardAviso.innerHTML = texto;

  if (tipo === "aviso") {
    cardAviso.style.background = "#FFF3E0";
    cardAviso.style.color = "#EF6C00";
  } else {
    cardAviso.style.background = "#E8F5E9";
    cardAviso.style.color = "#2E7D32";
  }

  setTimeout(() => {
    cardAviso.style.display = "none";
  }, 3000);
}

function dentroDoPeriodo(timestamp, dias) {
  if (!timestamp) return false;

  if (dias === 0) {
    const hoje = new Date().toDateString();
    return new Date(timestamp).toDateString() === hoje;
  }

  const limite = Date.now() - dias * 24 * 60 * 60 * 1000;
  return timestamp >= limite;
}

/* ================= LISTAR MEDICAMENTOS ================= */
onValue(lembretesRef, (snapshot) => {
  listaMedicamentos.innerHTML = "";
  dadosMedicamentos = {};
  medicamentoSelecionado = null;

  snapshot.forEach((child) => {
    const dados = child.val();
    if (!dados?.remedio || !dados?.horario) return;

    const id = child.key;
    dadosMedicamentos[id] = dados;

    const div = document.createElement("div");
    div.className = `med ${dados.tomado ? "tomado" : "pendente"}`;

    div.innerHTML = `
      <span>${dados.remedio} - ${dados.horario}</span>
      <span class="status">
        ${dados.tomado ? "✔ Tomado" : "⏰ Pendente"}
      </span>
    `;

    div.addEventListener("click", () => {
      document.querySelectorAll(".med").forEach(m =>
        m.classList.remove("selecionado")
      );

      div.classList.add("selecionado");
      medicamentoSelecionado = id;
    });

    listaMedicamentos.appendChild(div);
  });
});

/* ================= ENVIAR LEMBRETE ================= */
btnLembrete.addEventListener("click", () => {
  if (!medicamentoSelecionado) {
    mostrarAviso("⚠️ Selecione um medicamento primeiro", "aviso");
    return;
  }

  const dados = dadosMedicamentos[medicamentoSelecionado];

  push(alertasRef, {
    remedio: dados.remedio,
    horario: dados.horario,
    criadoEm: Date.now(),
    visto: false
  });

  mostrarAviso(`🔔 Lembrete enviado: ${dados.remedio}`);
});

/* ================= HISTÓRICO ================= */
btnHistorico.addEventListener("click", () => {
  cardHistorico.style.display = "block";
  carregarHistorico();
});

btnFecharHistorico.addEventListener("click", () => {
  cardHistorico.style.display = "none";
});

filtroDias.addEventListener("change", carregarHistorico);

function carregarHistorico() {
  const dias = Number(filtroDias.value);
  listaHistorico.innerHTML = "";

  onValue(alertasRef, (snapshot) => {
    listaHistorico.innerHTML = "";

    snapshot.forEach((child) => {
      const alerta = child.val();
      if (!alerta?.remedio || !alerta?.criadoEm) return;
      if (!dentroDoPeriodo(alerta.criadoEm, dias)) return;

      const data = new Date(alerta.criadoEm).toLocaleString("pt-BR");

      const div = document.createElement("div");
      div.className = "med tomado";
      div.innerHTML = `
        <span>${alerta.remedio} - ${alerta.horario}</span>
        <span class="status">${data}</span>
      `;

      listaHistorico.appendChild(div);
    });

    if (!listaHistorico.innerHTML) {
      listaHistorico.innerHTML = "<p>Nenhum registro encontrado.</p>";
    }
  }, { onlyOnce: true });
}









