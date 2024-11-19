// Функция для открытия модального окна
function openModal(message) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(modal);
}

// Функция для получения параметров из URL
function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Получение telegram_id и telegram_nick из URL
const telegram_id = getUrlParameter("telegram_id");
const telegram_nick = getUrlParameter("telegram_nick");

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM полностью загружен и разобран");
    fetch("https://someuser921.pythonanywhere.com/api/get_dates")
        .then(response => {
            console.log("Ответ на get_dates получен:", response);
            return response.json();
        })
        .then(dates => {
            let select = document.getElementById("date-select");
            select.innerHTML = "";
            dates.forEach(date => {
                let option = document.createElement("option");
                option.value = date;
                option.textContent = date;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Ошибка при загрузке дат:", error);
            openModal("Ошибка при загрузке дат: " + error);
        });
});

// Функция для валидации имени
function validateName(name) {
    const namePattern = /^[а-яА-ЯёЁ\s]+$/;
    return namePattern.test(name) && name.length <= 15;
}

// Функция для валидации телефона
function validatePhone(phone) {
    const phonePattern = /^\d{11}$/;
    return phonePattern.test(phone);
}

// Функция для оплаты на месте
function payOnSite() {
    handleRegistration("on_site");
}

// Функция для оплаты онлайн
function payOnline() {
    handleRegistration("online");
}

// Функция для обработки регистрации
function handleRegistration(paymentMethod) {
    const name = document.getElementById("name-input").value.trim();
    const phone = document.getElementById("phone-input").value.trim();
    const date = document.getElementById("date-select").value;

    // Валидация данных
    if (!validateName(name)) {
        openModal("Введите корректное имя на кириллице, до 15 символов.");
        return;
    }
    if (!validatePhone(phone)) {
        openModal("Введите корректный номер телефона из 11 цифр.");
        return;
    }
    if (!date) {
        openModal("Пожалуйста, выберите дату.");
        return;
    }
    if (!telegram_id || !telegram_nick) {
        openModal("Ошибка: Не удалось получить идентификатор Telegram. Перезапустите мини-приложение.");
        return;
    }

    // Отправка данных о записи на сервер
    fetch("https://someuser921.pythonanywhere.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, date, paymentMethod, telegram_id, telegram_nick })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            openModal("Вы успешно записаны на игру!");
        } else if (data.status === "already_registered") {
            openModal(data.message || "Вы уже зарегистрированы на эту дату.");
        } else {
            openModal(data.message || "Произошла ошибка. Попробуйте еще раз.");
        }
    })
    .catch(error => {
        openModal("Произошла ошибка при соединении с сервером. Попробуйте еще раз.");
    });
}
