document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const nameInput = document.getElementById('name');
    
    // Функция валидации имени
    function validateName(name) {
        // Проверяем, что имя начинается с заглавной буквы и не содержит цифр
        const nameRegex = /^[А-ЯЁ][а-яё\s-]+$/;
        return nameRegex.test(name);
    }

    // Добавляем обработчик события input для поля имени
    nameInput.addEventListener('input', function() {
        const name = this.value.trim();
        if (name && !validateName(name)) {
            this.setCustomValidity('Имя должно начинаться с заглавной буквы и не содержать цифр');
        } else {
            this.setCustomValidity('');
        }
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверяем заполнение полей
        const name = nameInput.value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const subject = contactForm.querySelector('#subject').value.trim();
        const message = contactForm.querySelector('#message').value.trim();
        
        if (!name || !email || !subject || !message) {
            alert('Пожалуйста, заполните все поля формы');
            return;
        }
        
        if (!validateName(name)) {
            alert('Пожалуйста, введите корректное имя. Имя должно начинаться с заглавной буквы и не содержать цифр.');
            return;
        }
        
        // Проверяем формат email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Пожалуйста, введите корректный email адрес');
            return;
        }
        
        // Блокируем кнопку и меняем текст
        submitButton.disabled = true;
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Отправка...';
        
        // Собираем данные формы
        const formData = new FormData(contactForm);
        
        // Отправляем запрос
        fetch('send_mail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Показываем уведомление
            alert(data.message);
            
            // Если успешно, очищаем форму
            if (data.success) {
                contactForm.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
        })
        .finally(() => {
            // Возвращаем кнопку в исходное состояние
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        });
    });
}); 