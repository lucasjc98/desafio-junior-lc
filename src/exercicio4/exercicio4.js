// Gera um número aleatório entre 1 e 100
const numeroAleatorio = Math.floor(Math.random() * 100) + 1;

// Contador de tentativas
let tentativas = 0;

// Função para verificar o palpite do usuário
function verificar() {
  const palpite = parseInt(document.getElementById("palpite").value);
  const resultado = document.getElementById("resultado");

  // Validação do palpite
  if (palpite < 1 || palpite > 100) {
    resultado.textContent = "Palpite inválido. Digite um número entre 1 e 100.";
    return;
  }

  if (palpite === numeroAleatorio) {
    resultado.textContent = "Parabéns! Você adivinhou o número em " + tentativas + " tentativas.";
    // Reinicia o jogo após 3 segundos
    setTimeout(() => {
      location.reload();
    }, 3000);
  } else if (palpite > numeroAleatorio) {
    resultado.textContent = "O número é menor que " + palpite + ". Tente novamente.";
    tentativas++;
  } else {
    resultado.textContent = "O número é maior que " + palpite + ". Tente novamente.";
    tentativas++;
  }
}
