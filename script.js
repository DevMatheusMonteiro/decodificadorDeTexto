const decryptText = document.getElementById("decryptText");
const copyButton = document.getElementById("copyButton");
const encryptButton = document.getElementById("encryptButton");
const decryptButton = document.getElementById("decryptButton");
const textToDecryptOrEncrypt = document.getElementById(
  "textToDecryptOrEncrypt"
);
const messageContainer = document.querySelector(".messageContainer");
const decryptContainer = document.querySelector(".decryptContainer");

const vowels = ["a", "e", "i", "o", "u"];

decryptButton.onclick = decryptWords;
encryptButton.onclick = encryptWords;

copyButton.addEventListener("click", () => {
  writeClipboardText(decryptText.innerText);

  copyButton.setAttribute(
    "style",
    "background-color: var(--dark-blue-400);color: var(--light-blue-200)"
  );
  copyButton.textContent = "Copiado";

  setInterval(() => {
    copyButton.removeAttribute("style");
    copyButton.textContent = "Copiar";
  }, 2000);
});

async function writeClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error.message);
  }
}

function returnLetters(text) {
  return text.split("");
}

function returnWords() {
  return textToDecryptOrEncrypt.value.split(" ");
}

function validateWordsWithAccentOrCapitalLetters() {
  const letters = returnLetters(textToDecryptOrEncrypt.value);

  let hasACapitalLetterOrLetterWithAccent = false;

  for (const letter of letters) {
    if (validateLettersWithAccentOrUppercase(letter)) {
      hasACapitalLetterOrLetterWithAccent = true;
      break;
    }
  }

  return hasACapitalLetterOrLetterWithAccent;
}

function validateLettersWithAccentOrUppercase(letterToValidate) {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Á",
    "À",
    "Â",
    "Ã",
    "É",
    "Ê",
    "Í",
    "Ó",
    "Ô",
    "Õ",
    "Ú",
    "Ç",
    "á",
    "à",
    "â",
    "ã",
    "é",
    "ê",
    "í",
    "ó",
    "ô",
    "õ",
    "ú",
    "ç",
  ];

  return letters.some((letter) => letter == letterToValidate);
}

function verifyEncryptionKeys(word) {
  const encryptionKeys = ["enter", "imes", "ai", "ober", "ufat"];

  return encryptionKeys.some(
    (encryptionKey) => word.indexOf(encryptionKey) !== -1
  );
}

function changeVisibility(element) {
  return element.classList.toggle("hide");
}

function encryptWords() {
  if (validateWordsWithAccentOrCapitalLetters()) {
    return alert("Digite apenas letras minúsculas e sem acento!");
  }

  if (textToDecryptOrEncrypt.value.trim() === "") return;

  const words = returnWords();

  for (let i = 0; i < words.length; i++) {
    let word = words[i];

    const letters = returnLetters(word);

    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i];

      switch (letter) {
        case "a":
          letters[i] = "ai";
          break;
        case "e":
          letters[i] = "enter";
          break;
        case "i":
          letters[i] = "imes";
          break;
        case "o":
          letters[i] = "ober";
          break;
        case "u":
          letters[i] = "ufat";
          break;
      }
    }

    word = letters.join("");

    words[i] = word;
  }

  const display = changeVisibility(decryptContainer);

  if (display) {
    changeVisibility(decryptContainer);
  } else {
    changeVisibility(messageContainer);
  }

  decryptText.innerText = words.join(" ");
}

function decryptWords() {
  if (validateWordsWithAccentOrCapitalLetters()) {
    return alert("Digite apenas letras minúsculas e sem acento!");
  }

  if (textToDecryptOrEncrypt.value.trim() === "") return;

  const words = returnWords();

  for (let i = 0; i < words.length; i++) {
    let word = words[i];

    let keepRunning = true;

    while (keepRunning) {
      word = word
        .replace("enter", "e")
        .replace("imes", "i")
        .replace("ai", "a")
        .replace("ober", "o")
        .replace("ufat", "u");

      if (!verifyEncryptionKeys(word)) {
        keepRunning = false;
      }
    }
    words[i] = word;
  }

  const display = changeVisibility(decryptContainer);

  if (display) {
    changeVisibility(decryptContainer);
  } else {
    changeVisibility(messageContainer);
  }

  decryptText.innerText = words.join(" ");
}
