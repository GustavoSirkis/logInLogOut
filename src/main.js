function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const welcomeSection = document.querySelector("#welcome");
    const logoutBtn = document.querySelector("#logout");    

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        const userName = document.querySelector("#username").value;
        const password = document.querySelector("#password__input").value;
        const getUser = localStorage.getItem("user");
        const userObject = JSON.parse(getUser);
        const userNameElement = document.querySelector("#username__span")

        if(getUser && (userObject.name === userName && userObject.password === password)){
            loginForm.classList.add("form--hidden");
            welcomeSection.classList.remove("form--hidden");
            
            userNameElement.textContent = userObject.name;
        } else{
            setFormMessage(loginForm, "error", "Oops algo deu errado, tente novamente!");
            userNameElement.textContent = undefined;
        };
       
        // aqui podemos usar o AJAX/Fetch login por exemplo
        
    });

    createAccountForm.addEventListener("submit", e =>{
        e.preventDefault();
        
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        
        const newName = document.querySelector("#signupUsername").value
        const newEmail = document.querySelector("#email").value;
        const newPassword = document.querySelector("#password").value;
        console.log(newName)
        const user = {
            name: newName,
            email: newEmail,
            password: newPassword,
        }              
        const userStoraged = localStorage.getItem("user");
        const objectStoraged = JSON.parse(userStoraged);
        localStorage.setItem("user", JSON.stringify(user)); 
        console.log(objectStoraged)
        if(userStoraged != null && newName == objectStoraged.name){
            setFormMessage(loginForm, "error", "Oops algo deu errado, tente novamente!");
        }else {                       
            setFormMessage(loginForm, "success", "Conta criada com sucesso!");
        }     
    })

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        welcomeSection.classList.add("form--hidden");
        setFormMessage(loginForm, "success", "Logout com sucesso!");
        /* checkUser(); */
    })



    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 6) {
                setInputError(inputElement, "Nome de usuário deve ter ao menos 6 caracteres");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});