// Функция для обработки регистрации
function handleRegistration(paymentMethod) {
    const name = document.getElementById("name-input").value;
    const phone = document.getElementById("phone-input").value;
    const date = document.getElementById("date-select").value;

    if (!name || !phone || !date) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Проверка, что telegram_id и telegram_nick получены
    if (!telegram_id || !telegram_nick) {
        alert("Ошибка: Не удалось получить идентификатор Telegram. Перезапустите мини-приложение.");
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
            document.getElementById("confirmation-message").textContent = "Вы успешно записаны на игру!";
        } else {
            document.getElementById("confirmation-message").textContent = data.message; // Показываем сообщение об ошибке
        }
    })
    .catch(error => {
        console.error("Ошибка при отправке данных:", error);
        document.getElementById("confirmation-message").textContent = "Произошла ошибка. Попробуйте еще раз.";
    });
}
