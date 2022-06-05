import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

const LOCALSTORAGE_KEY = "feedback-form-state";

form.addEventListener("input", throttle(savingData, 500));
form.addEventListener("submit", sendingMessage);

function savingData() { 
    const data = {
        email: input.value,
        message: textarea.value,
    }
    
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data))
}


function uploadPage() { 
    const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedData !== null) {
        input.value = JSON.parse(savedData).email;
        textarea.value = JSON.parse(savedData).message;
    } else { 
        input.value = "";
        textarea.value = "";
    }
}
uploadPage();

function sendingMessage(e) { 
    e.preventDefault();
    const parseData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    console.log(parseData);

    input.value = "";
    textarea.value = "";
    
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

