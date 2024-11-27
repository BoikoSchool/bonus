document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const taskNumber = urlParams.get("task");

  // Заповнення поля, якщо taskNumber існує
  if (taskNumber) {
    const taskInputField = document.getElementById("taskInput");
    if (taskInputField) {
      taskInputField.value = taskNumber; // Без додаткового тексту
    } else {
      console.error("Поле для введення номера завдання не знайдено!");
    }
  } else {
    console.warn("Номер завдання (task) відсутній у URL.");
  }
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxtgnKViQNHkBVIeQhkZtMxvpgyUSoBexHoNm_8i8RnEx-FZvtfXFz1Fpe5c89i-6Ck/exec";

const form = document.querySelector("form");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Вимикаємо кнопку, щоб уникнути повторних натискань
  submitButton.disabled = true;
  submitButton.textContent = "Надсилання...";

  const formData = new FormData(form);

  try {
    const response = await fetch(scriptURL, { method: "POST", body: formData });

    if (response.ok) {
      Swal.fire({
        title: "Успіх!",
        text: "Ваше повідомлення надіслано успішно!",
        icon: "success",
      });

      form.reset();
    } else {
      throw new Error(`Помилка сервера: ${response.statusText}`);
    }
  } catch (error) {
    Swal.fire({
      title: "Помилка!",
      text: `Не вдалося надіслати дані: ${error.message}`,
      icon: "error",
    });
    console.error("Помилка!", error);
  } finally {
    // Увімкнути кнопку знову після завершення запиту
    submitButton.disabled = false;
    submitButton.textContent = "Надіслати";
  }
});

// Скрипт для автоматичного заповнення балів
const certificateSelect = document.getElementById("sertificate");
const scoreInput = document.getElementById("score");

certificateSelect.addEventListener("change", () => {
  // Отримання кількості балів з data-points
  const selectedOption =
    certificateSelect.options[certificateSelect.selectedIndex];
  const points = selectedOption.getAttribute("data-points");
  scoreInput.value = points; // Заповнення поля для балів
});

// Встановлення значення балів за замовчуванням
