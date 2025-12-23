import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import { getDatabase } from 
"https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOiTZOLf9oOpWhWO2244BWdS_fNTOyU3k",
  authDomain: "lembrete-medicamentos-8f994.firebaseapp.com",
  databaseURL: "https://lembrete-medicamentos-8f994-default-rtdb.firebaseio.com",
  projectId: "lembrete-medicamentos-8f994",
  storageBucket: "lembrete-medicamentos-8f994.appspot.com",
  messagingSenderId: "725106763084",
  appId: "1:725106763084:web:b5d946083b72c6ec84dbe9"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


