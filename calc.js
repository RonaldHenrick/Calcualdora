const main = document.querySelector("main")
const root = document.querySelector(":root")
const input = document.getElementById("input")
const resultInput = document.getElementById("result")

//Array de valores da calculadora;
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

//Iterar sobre todos  os elementos do array;
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  //Evento para pegar selecionados e colocar no input;
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value
    input.value += value
  })
})
//Botão para limpar o input principal;
document.getElementById("clear").addEventListener("click", function () {
  //Evento para deixar o input vazio;
  input.value = ""
  resultInput.value = ""
  input.focus()
})
//Evento para conferir teclas precionadas;
input.addEventListener("keydown", function (ev) {
  ev.preventDefault()
  //Confere se as teclas digitadas estão dentro do array;
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key
    return
  }
  //Botão de apagar o último elemento digitado;
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1)
  }
  //Aciona  a função de calcular;
  if (ev.key === "Enter") {
    calculate()
  }
})
//Botão de igual para calcular os valores do input;
document.getElementById("equal").addEventListener("click", calculate)

//Função de calcular;
function calculate() {
  resultInput.value = "ERROR"
  resultInput.classList.add("error")
  const result = eval(input.value)
  resultInput.value = result
  resultInput.classList.remove("error")
}

//Botão de copiar o resultado para área de transferencia;
document.getElementById("copyToClipboard").addEventListener("click", function (ev) {
  const button = ev.currentTarget
  if (button.innerText === "Copy") {
    button.innerText = "Copied!"
    button.classList.add("success")
    navigator.clipboard.writeText(resultInput.value)
  } else {
    button.innerText = "Copy"
    button.classList.remove("success")
  }
})
//Funcionalidades para mudança de tema da página
document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9")
    root.style.setProperty("--border-color", "#aaa")
    root.style.setProperty("--font-color", "#212529")
    root.style.setProperty("--primary-color", "#26834a")
    main.dataset.theme = "light"
  } else {
    root.style.setProperty("--bg-color", "#212529")
    root.style.setProperty("--border-color", "#666")
    root.style.setProperty("--font-color", "#f1f5f9")
    root.style.setProperty("--primary-color", "#4dff91")
    main.dataset.theme = "dark"
  }
})