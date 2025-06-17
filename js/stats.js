// Функция для обновления времени
function updateTime() {
    const timeElement = document.querySelector('.stats-container .time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Функция для обновления счетчика посетителей
function updateVisitorCount() {
    const visitorElement = document.querySelector('.stats-container .visitors');
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    
    // Проверяем, посещал ли пользователь сайт сегодня
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
        visitorCount = Number(visitorCount) + 1;
        localStorage.setItem('visitorCount', visitorCount);
        localStorage.setItem('lastVisit', today);
    }
    
    visitorElement.textContent = visitorCount;
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Обновляем время каждую секунду
    updateTime();
    setInterval(updateTime, 1000);
    
    // Обновляем счетчик посетителей
    updateVisitorCount();
}); 