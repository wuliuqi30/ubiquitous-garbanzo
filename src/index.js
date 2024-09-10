// index.js
import "./styles.css";
console.log('Hello World!');

const emailInput = document.querySelector('#email');
const emailRegex = '\\w{1,20}@\\w{1,20}.\[A-Za-z]{2,4}';
emailInput.setAttribute('pattern',emailRegex)
const emailError = document.querySelector('#email + span.error');

const zipcodeInput = document.querySelector('#zipcode');
const zipcodeRegex = '\\d{5}(-\\d{4})?';
zipcodeInput.setAttribute('pattern',zipcodeRegex)
const zipcodeError = document.querySelector('#zipcode + span.error');


addEventListenerToInput(emailInput,emailError);

addEventListenerToInput(zipcodeInput,zipcodeError);


function addEventListenerToInput(inputHTMLELement, errorHTMLELement){
    inputHTMLELement.addEventListener('input',()=>{
        if(inputHTMLELement.validity.valid){
            errorHTMLELement.textContent = '';
            errorHTMLELement.className = 'error';
        } else {
            showErrors(errorHTMLELement,inputHTMLELement);
        }
    })
}


function showErrors(htmlErrorElement,htmlInputElement){
    // makes visible error message box for the chosen html element
    console.log('here');
    htmlErrorElement.className = "error active";
    if(htmlInputElement.validity.patternMismatch){
        htmlErrorElement.textContent = 'Incorrect Email pattern! Must be like john@gmail.com'
    }
}