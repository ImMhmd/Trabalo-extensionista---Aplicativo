const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Quando um alerta for criado no Realtime Database,
 * envia notificação push para o idoso
 */
exports.enviarNotificacao = functions.database
  .ref("/alertas/{alertaId}")
  .onCreate(async (snapshot, context) => {
    const alerta = snapshot.val();

    if (!alerta) return null;

    // Buscar token do idoso
    const tokenSnap = await admin
      .database()
      .ref("tokens/idoso1")
      .once("value");

    const token = tokenSnap.val();

    if (!token) {
      console.log("Nenhum token encontrado para o idoso");
      return null;
    }

    const payload = {
      notification: {
        title: "🔔 Hora do remédio",
        body: `${alerta.remedio} às ${alerta.horario}`,
        icon: "/icons/icon-192.png"
      }
    };

    return admin.messaging().sendToDevice(token, payload);
  });
