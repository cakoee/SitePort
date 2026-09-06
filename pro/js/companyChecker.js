/**
 * Brayden Scott
 * 2026-04-04
 * Checks that user inputs are correct before allowing form submission.
 */
let validName = false;
let validPass1 = false;
let validPass2 = false;
window.addEventListener("load",function(){
    cmpName = document.getElementById("cmpName");
    cmpType = document.getElementById("cmpType");
    pwd1 = document.getElementById("pwd1");
    pwd2 = document.getElementById("pwd2");
    submitBtn = document.getElementById("submitBtn");
    error = document.getElementById("errorMsg");
    pwd1.addEventListener("input", pwd1Check);
    pwd2.addEventListener("input", pwd2Check);
    cmpName.addEventListener("input", cmpNameCheck);
    cmpType.addEventListener("input", cmpNameCheck);
    pwd1.addEventListener("focus", pwd1Check);
    pwd2.addEventListener("focus", pwd2Check);
    cmpName.addEventListener("focus", cmpNameCheck);
    cmpType.addEventListener("focus", cmpNameCheck);
    pwd1.addEventListener("blur", clearError);
    pwd2.addEventListener("blur", clearError);
    cmpName.addEventListener("blur", clearError);
    cmpType.addEventListener("blur", clearError);
    submitButtonCheck();
});
/**
 * Checks if the submit button criteria have been met, then enables or disables the button accordingly
 */
function submitButtonCheck(){
    if(validName&&validPass1&&validPass2){
        submitBtn.disabled = false;
    }else{
        submitBtn.disabled = true;
    }
}
//Checks if the company name and type exist in the database already
function cmpNameCheck(){
    if (!cmpName || !cmpType) {
        return;
    }

    const name = cmpName.value.trim();
    const type = cmpType.value.trim();

    if (!name || !type) {
        return;
    }

    fetch('companyNameChecker.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            cmpName: name,
            cmpType: type
        })
    })
    .then(response => response.text())
    .then(result => {
            if (result == 0) {
                error.innerHTML = "An organization with this name and type already exists.";
                error.style.color = "red";
                validName = false;
                submitButtonCheck();
            } else {
                error.innerHTML = "Organization name and type are available.";
                error.style.color = "green";
                validName = true;
                submitButtonCheck();
            }
    })
    .catch(fetchError => {
        console.error('Company checker request failed:', fetchError);
    });
}
/**
 * Empties the error box
 */
function clearError() {
        error.innerHTML = '';
        error.style.color = 'gray';
}
//Checks if the password meets all the criteria, and if the confirmed password matches.
function pwd1Check(){
    if (!pwd1) {
        return;
    }

    const value = pwd1.value;
    const hasMinLength = value.length >= 8;
    const hasNoSpaces = !/\s/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasDigit = /[0-9]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    if (!hasMinLength) {
        error.innerHTML = 'Password must be at least 8 characters long.';
        error.style.color = 'red';
        validPass1 = false;
        submitButtonCheck();
    } else if (!hasNoSpaces) {
        error.innerHTML = 'Password must contain no spaces.';
        error.style.color = 'red';
        validPass1 = false;
        submitButtonCheck();
    } else if (!hasLowercase || !hasUppercase || !hasDigit || !hasSpecial) {
        error.innerHTML = 'Password must contain lowercase, uppercase, digit, and special character.';
        error.style.color = 'red';
        validPass1 = false;
        submitButtonCheck();
    } else {
        error.innerHTML = 'Password meets requirements.';
        error.style.color = 'green';
        validPass1 = true
        submitButtonCheck();
        pwd2Check();
    }
}
/**
 * Checks if the passwords match
 */
function pwd2Check(){
    pass1 = pwd1.value;
    pass2 = pwd2.value;

    if (pass1 !== pass2) {
        error.innerHTML = 'Passwords do not match.';
        error.style.color = 'red';
        validPass2 = false;
        submitButtonCheck();
    } else {
        error.innerHTML = 'Passwords match.';
        error.style.color = 'green';
        validPass2 = true;
        submitButtonCheck();
    }
}