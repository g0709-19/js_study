const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');

// Show input error message
function showError(input, message)
{
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input)
{
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function isValidEmail(email)
{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Event Listeners
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (username.value === '')
    {
        showError(username, 'Hey, put the username in!');
    }
    else
    {
        showSuccess(username);
    }

    if (email.value === '')
    {
        showError(email, 'Hey, put the email in!');
    }
    else if (!isValidEmail(email.value))
    {
        showError(email, 'Hey, put the valid email in!');
    }
    else
    {
        showSuccess(email);
    }

    if (password.value === '')
    {
        showError(password, 'Hey, put the password in!');
    }
    else
    {
        showSuccess(password);
    }

    if (confirm_password.value === '')
    {
        showError(confirm_password, 'Hey, put the confirm password in!');
    }
    else
    {
        showSuccess(confirm_password);
    }
})