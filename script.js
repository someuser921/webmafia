// Загрузка дат игр через API
document.addEventListener("DOMContentLoaded", function() {
    fetch("https://someuser921.pythonanywhere.com/api/get_dates") // Убедитесь, что URL корректен
        .then(response => response.json())
        .then(dates => {
            let select = document.getElementById("date-select");
            select.innerHTML = ""; // Очистка старых опций, если они есть
            dates.forEach(date => {
                let option = document.createElement("option");
                option.value = date;
                option.textContent = date;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Ошибка при загрузке дат:", error);
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
