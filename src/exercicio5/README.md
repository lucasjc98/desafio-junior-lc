# Validador de Senha

- Escreva um programa que peça ao usuário uma senha.
- A senha deve ter no mínimo 8 caracteres e conter pelo menos uma letra maiúscula, uma letra minúscula e um número.
- Valide a senha e informe ao usuário se ela é válida ou não.

```javascript
let erro = true;

function validarSenha() {
  const senha = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagem");
  mensagem.innerHTML = "";
  erro = false;

  // Validação de tamanho mínimo
  if (senha.length < 8) {
    mensagem.innerHTML = "A senha deve ter no mínimo 8 caracteres.<br>";
    erro = true;
  }

  // Validação de letra maiúscula
  if (!/[A-Z]/.test(senha)) {
    mensagem.innerHTML += "A senha deve conter pelo menos uma letra maiúscula.<br>";
    erro = true;
  }

  // Validação de letra minúscula
  if (!/[a-z]/.test(senha)) {
    mensagem.innerHTML += "A senha deve conter pelo menos uma letra minúscula.<br>";
    erro = true;
  }

  // Validação de número
  if (!/[0-9]/.test(senha)) {
    mensagem.innerHTML += "A senha deve conter pelo menos um número.<br>";
    erro = true;
  }

  if (erro === false) {
    mensagem.innerHTML = "A senha é válida!";
  }
}
```