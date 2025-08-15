window.onload = function () {
    console.log("hello git");
    /*Добавьте несколько строк в любой файл и зафиксируйте их коммитом. 
    Затем отмените эти изменения используя git. Также сделайте скриншоты.
    Добавьте несколько строк в любой файл и зафиксируйте их коммитом. 
    Затем отмените эти изменения используя git. Также сделайте скриншоты.
    */
    //устанавливаем правила ввода в текстовые поля
    let fullName = document.getElementsByName('fullName')[0];
    fullName.onkeydown = function (e) {
        let number = parseInt(e.key);
        if (!isNaN(number)) {
            e.preventDefault();
        }
    }
    let userName = document.getElementsByName('userName')[0];
    userName.onkeydown = function (e) {
        let key = e.key;
        if (key === '.' || key === ',') {
            e.preventDefault();
        }
    }
    let agree = document.getElementsByName('agree')[0];
    agree.onchange = function (e) {
        if (e.target.checked) {
            console.log('Согласен');
        }
        else {
            console.log('Не согласен');
        }
    }


    //кнопка Sign Up
    document.getElementById("btnSignUp").addEventListener('click', createAccount);

    //создание аккаунта
    function createAccount(e) {
        if (isFormEmpty(e)) {
            e.preventDefault();
            return;
        }

        let password = document.getElementsByName('password')[0];
        if (password.value.length < 8) {
            alert('Пароль должен содержать не менее 8 символов.');
            e.preventDefault();
            return;
        }
        let password2 = document.getElementsByName('password2')[0];
        if (password.value !== password2.value) {
            alert('Пароли не совпадают.');
            e.preventDefault();
            return;
        }

        if (!agree.checked) {
            alert('Вы дожны согласиться с условиями');
            e.preventDefault();
            return;
        }

        document.getElementById('popup-block').style.display = 'flex';
        e.preventDefault();
    }

    //проверка пустой ли textbox
    function isTextBoxEmpty(textBox) {
        if (textBox.value === "") {
            alert(`Заполните поле ${textBox.previousElementSibling.innerText}`);

            return true;
        }
        else return false;
    }

    //проверка пустая ли форма
    function isFormEmpty(e) {
        let textBoxes = document.getElementsByClassName('option-textbox');
        for (let i = 0; i < textBoxes.length; i++) {
            if (isTextBoxEmpty(textBoxes[i])) {
                e.preventDefault();
                return true;
            }
        }
        return false;
    }

    //кнопка OK в модальном окне
    document.getElementById('btnOK').onclick = function (e) {
        document.getElementById('popup-block').style.display = 'none';
        let textBoxes = document.getElementsByClassName('option-textbox');
        for (let i = 0; i < textBoxes.length; i++) {
            textBoxes[i].value = "";
        }
        goToLoginPage();
    }

    //кнопка Already have an account
    document.getElementById('btnLogin').onclick = function (e) {
        goToLoginPage();
    }

    //имитация перехода на страницу Логина
    function goToLoginPage() {
        document.getElementById('blockTitle').innerText = "Log in to the system";
        deleteTextBox('fullName');
        deleteTextBox('email');
        deleteTextBox('password2');
        deleteTextBox('agree');
        document.getElementById('btnSignUp').innerText = "Sign In";
        document.getElementById('btnLogin').remove();
        document.getElementById("btnSignUp").removeEventListener('click', createAccount);
        document.getElementById("btnSignUp").addEventListener('click', loginToAccount);

    }

    //удаление текстбокса
    function deleteTextBox(textBox) {
        document.getElementsByName(textBox)[0].parentElement.remove();
    }

    //логин в аккаунт
    function loginToAccount(e) {
        if (isFormEmpty(e)) {
            e.preventDefault();
            return;
        }
        alert(`Добро пожаловать, ${userName.value}!`);
    }
}