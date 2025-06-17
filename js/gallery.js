document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Получаем все кнопки фильтров и элементы галереи
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Добавляем обработчик клика для каждой кнопки
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем класс active у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем класс active текущей кнопке
            this.classList.add('active');

            // Получаем значение фильтра
            const filterValue = this.getAttribute('data-filter');

            // Фильтруем элементы
            galleryItems.forEach(item => {
                // Сначала скрываем все элементы
                item.style.display = 'none';
                
                // Если выбраны все работы или категория совпадает
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    // Показываем элемент
                    item.style.display = 'block';
                    
                    // Добавляем анимацию
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        });
    });
}); 