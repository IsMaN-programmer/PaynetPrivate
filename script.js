document.addEventListener("DOMContentLoaded", function () {
    let cardInfoContainer = document.querySelector(".card-info");

    // **Открытие формы добавления карты**
    document.getElementById("createBtn").addEventListener("click", function (event) {
        event.preventDefault();
        let addCardForm = document.getElementById("addCardForm");
        addCardForm.style.display = addCardForm.style.display === "none" ? "block" : "none";
    });

    // **Добавление новой карты**
    document.getElementById("addCardBtn").addEventListener("click", function (event) {
        event.preventDefault();
        let cardName = document.getElementById("cardName").value.trim();
        let cardNumber = document.getElementById("cardNumber").value.trim();

        if (cardName && cardNumber) {
            let newCard = document.createElement("div");
            newCard.classList.add("card-item");
            newCard.innerHTML = `<label>${cardName}</label><br />
                                 <input type="text" placeholder="${cardNumber}" disabled />
                                 <button class="green-b">Оплатить</button>
                                 <button class="red-b deleteBtn">Удалить</button><br />`;

            cardInfoContainer.appendChild(newCard);

            // **Сохраняем данные в localStorage**
            let savedCards = JSON.parse(localStorage.getItem("cards")) || [];
            savedCards.push({ name: cardName, number: cardNumber });
            localStorage.setItem("cards", JSON.stringify(savedCards));

            // **Обработчик удаления карты**
            newCard.querySelector(".deleteBtn").addEventListener("click", function () {
                newCard.remove();

                // **Обновляем localStorage, удаляя карту**
                savedCards = savedCards.filter(card => card.number !== cardNumber);
                localStorage.setItem("cards", JSON.stringify(savedCards));
            });
        } else {
            alert("Введите имя и номер карты!");
        }
    });

    // **Загрузка карт при запуске страницы**
    let savedCards = JSON.parse(localStorage.getItem("cards")) || [];
    savedCards.forEach(card => {
        let newCard = document.createElement("div");
        newCard.classList.add("card-item");
        newCard.innerHTML = `<label>${card.name}</label><br />
                             <input type="text" placeholder="${card.number}" disabled />
                             <button class="green-b">Оплатить</button>
                             <button class="red-b deleteBtn">Удалить</button><br />`;

        cardInfoContainer.appendChild(newCard);

        // **Обработчик удаления карты**
        newCard.querySelector(".deleteBtn").addEventListener("click", function () {
            newCard.remove();

            // **Обновляем localStorage, удаляя карту**
            savedCards = savedCards.filter(savedCard => savedCard.number !== card.number);
            localStorage.setItem("cards", JSON.stringify(savedCards));
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Находим только кнопки "Оплатить", а не все "green-b"
    let payButtons = document.querySelectorAll(".card-info .green-b");

    payButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault(); // Останавливает отправку формы
            
            let homeSection = document.getElementById("home");
            let sumSection = document.getElementById("sum");

            // Скрываем home и показываем sum
            homeSection.style.display = "none";
            sumSection.style.display = "block";
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let continueButton = document.querySelector(".sum .green-b");
    let confirmPaymentButton = document.querySelector(".payment .block button");
    let showCheckButton = document.querySelector(".icon");

    let sumSection = document.getElementById("sum");
    let paymentSection = document.getElementById("payment");
    let checkSection = document.getElementById("check");

    let paymentAmount = document.querySelector(".payment h1");
    let paymentName = document.querySelector(".payment h4");

    let transactionTime = document.getElementById("transactionTime");
    let recipientCard = document.getElementById("recipientCard");
    let checkRecipientName = document.getElementById("checkRecipientName");
    let checkAmount = document.getElementById("checkAmount");
    let totalAmount = document.getElementById("totalAmount");

    // **Выбор карты**
    document.querySelectorAll(".card-info .card-item").forEach(card => {
        card.addEventListener("click", function() {
            document.querySelectorAll(".card-info .card-item").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
        });
    });

    // **Переход в оплату**
    continueButton.addEventListener("click", function(event) {
        event.preventDefault();
        let sumInput = document.querySelector(".sum input").value.trim().replace(/\s+/g, "");
        let selectedCard = document.querySelector(".card-info .selected");

        if (sumInput === "" || isNaN(sumInput)) {
            alert("Введите корректную сумму!");
            return;
        }
        
        if (!selectedCard) {
            alert("Выберите карту перед оплатой!");
            return;
        }

        let formattedSum = parseInt(sumInput, 10).toLocaleString("ru-RU");
        let cardName = selectedCard.querySelector("label").innerText;

        paymentName.innerText = cardName; 
        paymentAmount.innerHTML = `${formattedSum} <span>сум</span>`;

        sumSection.style.display = "none";
        paymentSection.style.display = "block";
    });

    // **Подтверждение оплаты (заполняет чек)**
    confirmPaymentButton.addEventListener("click", function() {
        let selectedCard = document.querySelector(".card-info .selected");

        if (!selectedCard) {
            alert("Выберите карту перед подтверждением платежа!");
            return;
        }

        let cardNumber = selectedCard.querySelector("input").placeholder;
        let cardName = selectedCard.querySelector("label").innerText;

        transactionTime.innerText = new Date().toLocaleString();
        recipientCard.innerText = cardNumber.slice(-4); // Последние 4 цифры
        checkRecipientName.innerText = cardName;
        checkAmount.innerText = paymentAmount.innerText;
        totalAmount.innerText = paymentAmount.innerText;

        paymentSection.style.display = "none";
        checkSection.style.display = "block";
    });

    // **При нажатии на `.icon` тоже показываем чек**
    showCheckButton.addEventListener("click", function() {
        paymentSection.style.display = "none";
        checkSection.style.display = "block";
    });

    // **Добавляем проверку**
    console.log("Скрипт загружен!");
});

document.addEventListener("DOMContentLoaded", function () {
    let icons = document.querySelectorAll(".icon");
    let paymentSection = document.getElementById("payment");
    let checkSection = document.getElementById("check");

    icons.forEach(icon => {
        icon.addEventListener("click", function() {
            // Скрываем блок "payment"
            paymentSection.style.display = "none";

            // Показываем блок "check"
            checkSection.style.display = "block";
        });
    });
});

