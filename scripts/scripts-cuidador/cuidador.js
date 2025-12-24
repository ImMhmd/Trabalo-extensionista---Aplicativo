import { db } from "../scripts-database/firebase.js";
import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const container = document.getElementById("listaMedicamentos");
const lembretesRef = ref(db, "lembretes");

onValue(lembretesRef, (snapshot) => {
  container.innerHTML = "";

  snapshot.forEach((child) => {
    const dado = child.val();

    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${dado.remedio}</strong></p>
      <p>Horário: ${dado.horario}</p>
      <hr>
    `;

    container.appendChild(div);
  });
});



