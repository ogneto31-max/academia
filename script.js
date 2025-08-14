// script.js

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqzHdq1fpfcwKRw8ryIprFnWTbtIEGWYs",
  authDomain: "academia-c79e3.firebaseapp.com",
  projectId: "academia-c79e3",
  storageBucket: "academia-c79e3.firebasestorage.app",
  messagingSenderId: "833537870276",
  appId: "1:833537870276:web:8383ea0f739d42b21ebc91"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Elementos
const loginContainer = document.getElementById('login-container');
const appContainer = document.getElementById('app');
const btnLogin = document.getElementById('btn-login');
const btnCriarConta = document.getElementById('btn-criar-conta');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const planoTreinoDiv = document.getElementById('plano-treino');
const planoAlimentacaoDiv = document.getElementById('plano-alimentacao');

// Função para gerar plano de treino
function gerarPlanoTreino(){
  return [
    {dia:'Segunda', exercicios:['Peito + Tríceps + Abdômen','Supino reto 4x10','Supino inclinado 3x10','Crossover 3x12','Tríceps pulley 3x12','Tríceps testa 3x12','Abdômen: prancha 3x1 min + crunch 3x20']},
    {dia:'Terça', exercicios:['Costas + Bíceps','Puxada frente 4x10','Remada curvada 4x10','Barra fixa 3x até falhar','Rosca direta 3x12','Rosca martelo 3x12']},
    {dia:'Quarta', exercicios:['Pernas + Glúteos','Agachamento 4x10','Leg press 4x12','Avanço 3x12 cada perna','Stiff 3x12','Panturrilha 3x20']},
    {dia:'Quinta', exercicios:['Ombros + Abdômen','Desenvolvimento militar 4x10','Elevação lateral 3x12','Elevação frontal 3x12','Face pull 3x12','Abdômen: prancha 3x1 min + crunch 3x20']},
    {dia:'Sexta', exercicios:['Full Body leve / Cardio leve','Supino 3x10','Remada 3x10','Agachamento 3x10','Cardio leve 30 min']},
    {dia:'Sábado', exercicios:['Treino extra / Músculos fracos','Full body ou músculos mais fracos','Exercícios de correção de pontos fracos']},
    {dia:'Domingo', exercicios:['Descanso','Atividade leve: caminhada ou alongamento','Alongamento e mobilidade']}
  ];
}

// Função para mostrar plano de treino
function mostrarPlanoTreino(){
  const plano = gerarPlanoTreino();
  planoTreinoDiv.innerHTML = '<h2>Plano de Treino</h2>';
  plano.forEach(dia => {
    const diaDiv = document.createElement('div');
    diaDiv.innerHTML = `<h3>${dia.dia}</h3><ul>${dia.exercicios.map(ex => `<li>${ex}</li>`).join('')}</ul>`;
    planoTreinoDiv.appendChild(diaDiv);
  });
}

// Login
btnLogin.addEventListener('click', () => {
  const email = emailInput.value;
  const senha = senhaInput.value;
  auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
      loginContainer.style.display = 'none';
      appContainer.style.display = 'block';
      mostrarPlanoTreino();
    })
    .catch(err => alert(err.message));
});

// Criar conta
btnCriarConta.addEventListener('click', () => {
  const email = emailInput.value;
  const senha = senhaInput.value;
  auth.createUserWithEmailAndPassword(email, senha)
    .then(() => alert('Conta criada com sucesso!'))
    .catch(err => alert(err.message));
});

// Verificar login
auth.onAuthStateChanged(user => {
  if(user){
    loginContainer.style.display = 'none';
    appContainer.style.display = 'block';
    mostrarPlanoTreino();
  } else {
    loginContainer.style.display = 'block';
    appContainer.style.display = 'none';
  }
});
