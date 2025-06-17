document.addEventListener('DOMContentLoaded', function() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const body = document.body;
    
    // Проверяем сохраненное состояние
    const isAccessibilityMode = localStorage.getItem('accessibilityMode') === 'true';
    if (isAccessibilityMode) {
        body.classList.add('accessibility-mode');
        accessibilityToggle.classList.add('active');
    }

    // Обработчик клика по кнопке
    accessibilityToggle.addEventListener('click', function() {
        body.classList.toggle('accessibility-mode');
        this.classList.toggle('active');
        
        // Сохраняем состояние
        localStorage.setItem('accessibilityMode', body.classList.contains('accessibility-mode'));
        
        // Меняем иконку и текст кнопки
        const icon = this.querySelector('i');
        if (body.classList.contains('accessibility-mode')) {
            icon.className = 'fas fa-eye-slash';
            this.setAttribute('aria-label', 'Выключить режим для слабовидящих');
        } else {
            icon.className = 'fas fa-eye';
            this.setAttribute('aria-label', 'Включить режим для слабовидящих');
        }
    });

    // Добавляем поддержку клавиатуры
    accessibilityToggle.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}); 