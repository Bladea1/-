document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Данные о художниках
    const artists = [
        {
            id: 1,
            name: 'TAKI 183',
            city: 'moscow',
            cityDisplay: 'Москва',
            experience: 'pro',
            experienceDisplay: 'Профессионал',
            styles: ['tagging'],
            image: 'img/artist1.jpg',
            description: 'Один из первых тэггеров, популяризировавший это направление в городе'
        },
        {
            id: 2,
            name: 'SEEN',
            city: 'spb',
            cityDisplay: 'Санкт-Петербург',
            experience: 'pro',
            experienceDisplay: 'Профессионал',
            styles: ['wildstyle'],
            image: 'img/artist2.jpg',
            description: 'Легенда граффити, известный своими сложными работами в стиле wildstyle'
        },
        {
            id: 3,
            name: 'GHOST',
            city: 'kazan',
            cityDisplay: 'Казань',
            experience: 'intermediate',
            experienceDisplay: 'Средний',
            styles: ['character'],
            image: 'img/artist3.jpg',
            description: 'Специализируется на создании уникальных персонажей в граффити'
        },
        {
            id: 4,
            name: 'BLADE',
            city: 'moscow',
            cityDisplay: 'Москва',
            experience: 'pro',
            experienceDisplay: 'Профессионал',
            styles: ['throwup'],
            image: 'img/artist4.jpg',
            description: 'Мастер быстрых и стильных throw-up работ'
        },
        {
            id: 5,
            name: 'NOVA',
            city: 'spb',
            cityDisplay: 'Санкт-Петербург',
            experience: 'beginner',
            experienceDisplay: 'Начинающий',
            styles: ['character'],
            image: 'img/artist5.jpg',
            description: 'Молодой художник, создающий яркие персонажи в современном стиле'
        },
        {
            id: 6,
            name: 'CYBER',
            city: 'kazan',
            cityDisplay: 'Казань',
            experience: 'intermediate',
            experienceDisplay: 'Средний',
            styles: ['wildstyle'],
            image: 'img/artist6.jpg',
            description: 'Экспериментирует с цифровыми элементами в wildstyle граффити'
        }
    ];

    // Текущие активные фильтры
    let activeFilters = {
        style: 'all',
        city: 'all',
        experience: 'all'
    };

    // Функция создания карточки художника
    function createArtistCard(artist, index) {
        const delay = index * 100;
        return `
            <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="card bg-dark text-white h-100">
                    <img src="${artist.image}" class="card-img-top" alt="${artist.name}">
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title h5">${artist.name}</h3>
                        <p class="text-muted mb-2">${artist.cityDisplay}</p>
                        <p class="card-text">${artist.description}</p>
                        <a href="artist-details.html?id=${artist.id}" class="btn btn-outline-light mt-auto">Подробнее</a>
                    </div>
                </div>
            </div>
        `;
    }

    // Функция фильтрации художников
    function filterArtists() {
        const filteredArtists = artists.filter(artist => {
            const matchesStyle = activeFilters.style === 'all' || artist.styles.includes(activeFilters.style);
            const matchesCity = activeFilters.city === 'all' || artist.city === activeFilters.city;
            const matchesExperience = activeFilters.experience === 'all' || artist.experience === activeFilters.experience;
            return matchesStyle && matchesCity && matchesExperience;
        });

        const artistsGrid = document.getElementById('artistsGrid');
        if (artistsGrid) {
            artistsGrid.innerHTML = filteredArtists.map((artist, index) => createArtistCard(artist, index)).join('');
            // Реинициализация AOS для новых элементов
            AOS.refresh();
        }
    }

    // Обработчики кликов по кнопкам фильтров
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filterType = Object.keys(activeFilters).find(key => 
                this.dataset[key] !== undefined
            );

            if (filterType) {
                // Убираем активный класс у всех кнопок этого типа
                document.querySelectorAll(`[data-${filterType}]`).forEach(btn => {
                    btn.classList.remove('active');
                });

                // Добавляем активный класс текущей кнопке
                this.classList.add('active');

                // Обновляем значение фильтра
                activeFilters[filterType] = this.dataset[filterType];

                // Применяем фильтры
                filterArtists();
            }
        });
    });

    // Обработчик кнопки сброса фильтров
    const resetButton = document.querySelector('.btn-reset-filters');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Сбрасываем все активные фильтры
            Object.keys(activeFilters).forEach(key => {
                activeFilters[key] = 'all';
            });

            // Убираем активный класс у всех кнопок
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Активируем кнопки "Все"
            document.querySelectorAll('[data-style="all"], [data-city="all"], [data-experience="all"]')
                .forEach(btn => btn.classList.add('active'));

            // Применяем фильтры
            filterArtists();
        });
    }

    // Инициализация: отображаем всех художников при загрузке страницы
    filterArtists();
}); 