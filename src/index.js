// index.js
import "./styles.css";
console.log("Hello World!");


const emailInput = document.querySelector("#email");
const emailRegex = "\\w{1,20}@\\w{1,20}\\.[A-Za-z]{2,4}";
emailInput.setAttribute("pattern", emailRegex);
const emailError = document.querySelector("#email + span.error");
const emailErrorMessage = "Email should be something like john@gmail.com";
addEventListenerToInput(emailInput, emailError, emailErrorMessage);

const zipcodeInput = document.querySelector("#zipcode");
const zipcodeRegex = "\\d{5}(-\\d{4})?";
zipcodeInput.setAttribute("pattern", zipcodeRegex);
const zipcodeError = document.querySelector("#zipcode + span.error");
const zipcodeErrorMessage =
  "Must be of the form 12345 with optional hyphen followed by additional four digits";
addEventListenerToInput(zipcodeInput, zipcodeError, zipcodeErrorMessage);

const pwInput = document.querySelector("#pw");
// special char, capital letter, number > 1, at least 10 chars
const specialCharsRequirement = "!@#$%*";
const numbersRequirement = "0-9";
const capitalLettersRequirement = "A-Z";
const numRequiredChars = 8;
const pwRegex = `(?=.*[${specialCharsRequirement}])(?=.*[${capitalLettersRequirement}])(?=.*[${numbersRequirement}])[${specialCharsRequirement}${capitalLettersRequirement}a-z${numbersRequirement}]{${numRequiredChars},}`;
pwInput.setAttribute("pattern", pwRegex);
const pwError = document.querySelector("#pw + span.error");
const pwErrorMessage = "Please Check Password Requirements.";
// addEventListenerToInput(pwInput,pwError,pwErrorMessage);
const pwTips = document.querySelector(".pw-tips");

const tipsList = document.createElement("ul");
pwTips.appendChild(tipsList);

const numberOfCharsLi = document.createElement("li");
numberOfCharsLi.textContent = `At least ${numRequiredChars} characters.`;
const numberOfCharsRegex = new RegExp(
  `[${specialCharsRequirement}${capitalLettersRequirement}a-z${numbersRequirement}]{${numRequiredChars},}`,
);
tipsList.appendChild(numberOfCharsLi);

const numeralLi = document.createElement("li");
tipsList.appendChild(numeralLi);
numeralLi.textContent = `At least one number.`;
const numeralRegex = new RegExp(`(?=.*[${numbersRequirement}])`);

const capitalCharLi = document.createElement("li");
capitalCharLi.textContent = "At least one capital letter.";
tipsList.appendChild(capitalCharLi);
const capitalCharRegex = new RegExp(`(?=.*[${capitalLettersRequirement}])`);

const specialCharLi = document.createElement("li");
tipsList.appendChild(specialCharLi);
specialCharLi.textContent = `At least one of the following:     ${specialCharsRequirement}`;
const specialCharsRegex = new RegExp(`(?=.*[${specialCharsRequirement}])`);

pwInput.addEventListener("input", () => {
  showPasswordTips();
});

pwInput.addEventListener("input", () => {
  passwordValidityUpdate();
  passwordConfirmValidityUpdate();
});

function passwordValidityUpdate() {
  if (pwInput.validity.valid) {
    pwError.textContent = "Good Password!";
    pwError.className = "error valid";
    pwInput.classList.remove("invalid");
    pwInput.classList.add("valid");
  } else {
    pwInput.classList.add("invalid");
    pwInput.classList.remove("valid");
    showErrors(pwError, pwInput, pwErrorMessage);
    // Show password tips:
  }
}

function showPasswordTips() {
  if (numberOfCharsRegex.test(pwInput.value)) {
    numberOfCharsLi.className = "pw-tips-good";
  } else {
    numberOfCharsLi.className = "pw-tips-bad";
  }

  if (numeralRegex.test(pwInput.value)) {
    numeralLi.className = "pw-tips-good";
  } else {
    numeralLi.className = "pw-tips-bad";
  }

  if (capitalCharRegex.test(pwInput.value)) {
    capitalCharLi.className = "pw-tips-good";
  } else {
    capitalCharLi.className = "pw-tips-bad";
  }

  if (specialCharsRegex.test(pwInput.value)) {
    specialCharLi.className = "pw-tips-good";
  } else {
    specialCharLi.className = "pw-tips-bad";
  }
}

const pwConfirmInput = document.querySelector("#pw-confirm");
const pwConfirmError = document.querySelector("#pw-confirm + span.error");
const pwConfirmMessage = "Doesn't match above!";

pwConfirmInput.addEventListener("input", () => {
  passwordConfirmValidityUpdate();
});

function passwordConfirmValidityUpdate() {
  if (pwConfirmInput.value === "" && pwInput.value === "") {
    // do nothing
  } else if (pwConfirmInput.value === pwInput.value) {
    pwConfirmError.textContent = "Matches!";
    pwConfirmError.className = "error valid";

    pwConfirmInput.classList.add("valid");
    pwConfirmInput.setCustomValidity("");
  } else {
    pwConfirmInput.setCustomValidity(pwConfirmMessage);
    pwConfirmError.className = "error active";
    pwConfirmError.textContent = pwConfirmMessage;
  }
}

function addEventListenerToInput(
  inputHTMLELement,
  errorHTMLELement,
  errorMessage,
) {
  inputHTMLELement.addEventListener("input", () => {
    if (inputHTMLELement.validity.valid) {
      errorHTMLELement.textContent = "";
      errorHTMLELement.className = "error";
      inputHTMLELement.classList.remove("invalid");
      inputHTMLELement.classList.add("valid");
    } else {
      showErrors(errorHTMLELement, inputHTMLELement, errorMessage);
    }
  });
}

function showErrors(htmlErrorElement, htmlInputElement, errorMessage) {
  // makes visible error message box for the chosen html element
  // console.log('here');
  htmlInputElement.classList.add("invalid");
  htmlInputElement.classList.remove("valid");
  htmlErrorElement.className = "error active";
  if (htmlInputElement.validity.valueMissing) {
    htmlErrorElement.textContent = "Please fill in this field!";
  } else if (htmlInputElement.validity.patternMismatch) {
    htmlErrorElement.textContent = errorMessage;
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  if (!emailInput.validity.valid) {
    showErrors(emailError, emailInput, emailErrorMessage);
    event.preventDefault();
  } else if (!zipcodeInput.validity.valid) {
    showErrors(zipcodeError, zipcodeInput, zipcodeErrorMessage);
    event.preventDefault();
  } else if (!pwInput.validity.valid) {
    passwordValidityUpdate();
    event.preventDefault();
  } else if (!pwConfirmInput.validity.valid) {
    passwordConfirmValidityUpdate();
    event.preventDefault();
  }
});
