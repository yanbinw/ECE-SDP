const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const submitButton = document.getElementById("submitButton");

function validatePassword() {
    if (password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords Do not Match");
    }
    else {
        confirmPassword.setCustomValidity("");
        confirmPassword.style.backgroundColor = "#9FE2BF";
    }
}

password.addEventListener("change", validatePassword);
confirmPassword.addEventListener("keyup", validatePassword);
