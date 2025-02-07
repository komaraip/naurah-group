import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

 // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0ES7VhXTjpljRiSAUCvdqf4r5_K6w_6A",
    authDomain: "testng-63c53.firebaseapp.com",
    projectId: "testng-63c53",
    storageBucket: "testng-63c53.appspot.com",
    messagingSenderId: "671269824598",
    appId: "1:671269824598:web:27b669d1ae82e6b17133f7"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase();

let contactInfo = ref(database, 'infos');

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
e.preventDefault();

//   Get input Values
let fullname = document.querySelector(".fullname").value;
let lastname = document.querySelector(".lastname").value;
let companyname = document.querySelector(".companyname").value;
let email = document.querySelector(".email").value;
let need = document.querySelector(".need").value;
let message = document.querySelector(".message").value;
// console.log(name, email, message);

saveContactInfo(fullname,lastname,companyname,need,email, message);

document.querySelector(".contact-form").reset();
}

// Save infos to Firebase
function saveContactInfo(fullname,lastname,companyname,need, email, message) {
let newContactInfo = push(contactInfo);

set(newContactInfo, {
  fullname: fullname,
  lastname: lastname,
  companyname: companyname,
  need: need,
  email: email,
  requirenment: message,
});
}

const popup = document.getElementById("popup");

function openPopup() {
popup.classList.add("open-popup");
}

function closePopup() {
popup.classList.remove("open-popup");
}


const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const fullnameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(fullnameValue === '') {
        setError(fullname, 'Username is required');
    } else {
        setSuccess(fullname);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

};
