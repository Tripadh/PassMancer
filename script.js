// ==== Password Generation ====
function generatePassword() {
  const length = document.getElementById("length").value;
  const includeLower = document.getElementById("lowercase").checked;
  const includeUpper = document.getElementById("uppercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

  let allChars = "";
  if (includeLower) allChars += lowercase;
  if (includeUpper) allChars += uppercase;
  if (includeNumbers) allChars += numbers;
  if (includeSymbols) allChars += symbols;

  if (allChars === "") {
    alert("Please select at least one option!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randIndex];
  }

  const passwordField = document.getElementById("password");
  passwordField.value = password;

  checkPasswordStrength(password);
  saveToHistory(password);
}

// ==== Password Strength Checker ====
function checkPasswordStrength(password) {
  const bar = document.getElementById("strength-bar");
  const text = document.getElementById("strength-text");

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  switch (strength) {
    case 0:
    case 1:
      bar.style.width = "25%";
      bar.style.backgroundColor = "red";
      text.textContent = "Weak";
      text.style.color = "red";
      break;
    case 2:
    case 3:
      bar.style.width = "60%";
      bar.style.backgroundColor = "orange";
      text.textContent = "Medium";
      text.style.color = "orange";
      break;
    case 4:
      bar.style.width = "100%";
      bar.style.backgroundColor = "green";
      text.textContent = "Strong";
      text.style.color = "green";
      break;
  }
}

// ==== Copy to Clipboard ====
function copyPassword() {
  const passwordField = document.getElementById("password");
  const copyMsg = document.getElementById("copy-message");

  if (passwordField.value === "") {
    copyMsg.textContent = "Nothing to copy!";
    copyMsg.style.color = "red";
    return;
  }

  navigator.clipboard.writeText(passwordField.value)
    .then(() => {
      copyMsg.textContent = "Copied!";
      copyMsg.style.color = "green";
      setTimeout(() => {
        copyMsg.textContent = "";
      }, 2000);
    })
    .catch(() => {
      copyMsg.textContent = "Failed to copy!";
      copyMsg.style.color = "red";
    });
}

// ==== Save Password to History ====
function saveToHistory(password) {
  const historyList = document.getElementById("history-list");
  const newItem = document.createElement("li");
  newItem.textContent = password;
  historyList.prepend(newItem);

  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

// ==== Dark Mode Toggle ====
const modeToggleBtn = document.getElementById("mode-toggle");

modeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    modeToggleBtn.textContent = "☀️ Light Mode";
  } else {
    modeToggleBtn.textContent = "🌙 Dark Mode";
  }
});
function updateClock() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const dateStr = now.toLocaleDateString(undefined, options);
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  document.getElementById('currentDate').textContent = `${dateStr} | ${timeStr}`;
}

setInterval(updateClock, 1000);
updateClock(); // initial call
