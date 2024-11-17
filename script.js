// Загрузка дат игр через API (замените на ваш API)
document.addEventListener("DOMContentLoaded", function() {
    fetch("https://someuser921.pythonanywhere.com/api/get_dates")  // запрос к API для получения дат
        .then(response => response.json())
        .then(dates => {
            let select = document.getElementById("date-select");
            dates.forEach(date => {
                let option = document.createElement("option");
                option.value = date;
                option.textContent = date;
                select.appendChild(option);
            });
        });
});

function payOnline() {
    const name = document.getElementById("name-input").value;
    const phone = document.getElementById("phone-input").value;
    const date = document.getElementById("date-select").value;

    if (!name || !phone || !date) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Показать сообщение об оплате онлайн (интеграция с ЮKassa позже)
    document.getElementById("confirmation-message").textContent = "Переход к онлайн-оплате. Интеграция с ЮKassa будет добавлена.";
    // TODO: Добавить вызов для оплаты через ЮKassa
}

function payOnSite() {
    const name = document.getElementById("name-input").value;
    const phone = document.getElementById("phone-input").value;
    const date = document.getElementById("date-select").value;

    if (!name || !phone || !date) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Отправка данных о записи на сервер
    fetch("https://someuser921.pythonanywhere.com/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, date, telegram_id, telegram_nick })
	}).then(response => {
        if (response.ok) {
            document.getElementById("confirmation-message").textContent = "Вы успешно записаны на игру!";
        } else {
            document.getElementById("confirmation-message").textContent = "Произошла ошибка. Попробуйте еще раз.";
        }
    });
}
