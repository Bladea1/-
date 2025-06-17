function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById('clock').textContent = time;
}
setInterval(updateClock, 1000);

let visits = localStorage.getItem('visits') || 0;
visits++;
localStorage.setItem('visits', visits);
console.log("Вы посетили этот сайт " + visits + " раз(а).");

document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.button');
  if (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Форма загрузки работы в разработке. Следите за обновлениями!');
    });
  }
});

// Функционал фильтрации по тегам
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Убираем активный класс у всех кнопок
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Добавляем активный класс нажатой кнопке
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
