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
function checkEmail(input)
{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim()))
    {
        showSuccess(input);
    }
    else
    {
        showError(input, 'Email is not valid');
    }
}


// Check required fields
function checkRequired(inputs)
{
    inputs.forEach((input) => {
        // To trim out any whitespace
        if (input.value.trim() === '')
        {
            showError(input, `${getFieldName(input)} is required`);
        }
        else
        {
            showSuccess(input);
        }
    })
}

// Check input length
function checkLength(input, min, max)
{
    if (input.value.length < min)
    {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }
    else if (input.value.length > max)
    {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }
    else
    {
        showSuccess(input);
    }
}

// Check passwords match
function checkPasswordsMatch(input1, input2)
{
    if (input1.value !== input2.value)
    {
        showError(input2, 'Passwords do not match');
    }
}

// Get field name
function getFieldName(input)
{
    const id = input.id.replace(/_/, ' ');
    return id.charAt(0).toUpperCase() + id.slice(1);
}

// Event Listeners
form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkRequired([username, email, password, confirm_password]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, confirm_password);
})