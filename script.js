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

    continueButton.addEventListener("click", function(event) {
        event.preventDefault(); // Останавливает отправку формы

        let sumInput = document.querySelector(".sum input").value.trim().replace(/\s+/g, "");

        let sumSection = document.getElementById("sum");
        let paymentSection = document.getElementById("payment");
        let paymentAmount = document.querySelector(".payment h1");

        if (sumInput === "" || isNaN(sumInput)) {
            alert("Введите корректную сумму!");
        } else {
            // **Форматируем сумму с пробелами**
            let formattedSum = parseInt(sumInput, 10).toLocaleString("ru-RU");

            // Обновляем сумму в секции "payment"
            paymentAmount.innerHTML = `${formattedSum} <span>сум</span>`;

            // Скрываем "sum" и показываем "payment"
            sumSection.style.display = "none";
            paymentSection.style.display = "block";
        }
    });
});
