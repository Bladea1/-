document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.getElementById('searchToggle');
    const searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Открытие модального окна поиска
    searchToggle.addEventListener('click', function() {
        searchModal.show();
        searchInput.focus();
    });

    // Обработка поиска
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchResults.innerHTML = '<p class="text-muted">Введите минимум 2 символа для поиска</p>';
            return;
        }

        // Здесь будет запрос к серверу для поиска
        // Для демонстрации используем моковые данные
        const results = searchContent(query);
        displayResults(results);
    });

    // Функция поиска по контенту (демо-версия)
    function searchContent(query) {
        // В реальном приложении здесь будет запрос к серверу
        const mockResults = [
            {
                title: 'Фестиваль уличного искусства',
                description: 'Масштабный фестиваль с участием известных художников...',
                category: 'События',
                url: 'events.html'
            },
            {
                title: 'Мастер-класс по леттерингу',
                description: 'Интенсивный мастер-класс от LetterKing...',
                category: 'События',
                url: 'events.html'
            },
            {
                title: 'StreetMaster',
                description: 'Известный граффити-художник из Нью-Йорка...',
                category: 'Художники',
                url: 'artists.html'
            }
        ];

        return mockResults.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
    }

    // Отображение результатов поиска
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="text-muted">Ничего не найдено</p>';
            return;
        }

        const resultsHtml = results.map(result => `
            <div class="search-result-item">
                <a href="${result.url}" class="text-decoration-none">
                    <h6>${result.title}</h6>
                    <p>${result.description}</p>
                    <span class="result-category">${result.category}</span>
                </a>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHtml;
    }

    // Очистка результатов при закрытии модального окна
    document.getElementById('searchModal').addEventListener('hidden.bs.modal', function() {
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
}); 