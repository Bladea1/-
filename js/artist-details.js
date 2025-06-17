document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Получаем ID художника из URL
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    // Данные о художниках
    const artists = {
        1: {
            name: 'TAKI 183',
            city: 'Москва',
            experience: 'Профессионал',
            styles: ['Tagging'],
            image: 'img/artist1.jpg',
            description: `
                <div class="artist-header mb-4">
                    <img src="img/artist1.jpg" class="img-fluid rounded-3 mb-4" alt="TAKI 183">
                    <div class="artist-info">
                        <h1 class="mb-3">TAKI 183</h1>
                        <p class="text-muted mb-2">Москва</p>
                    </div>
                </div>
                <div class="artist-bio mb-4">
                    <h2>Биография</h2>
                    <p>TAKI 183 - один из первых тэггеров, популяризировавший это направление в городе. Его работы можно встретить в самых неожиданных местах, каждая из них имеет свой уникальный стиль и характер.</p>
                    <p>Начал свой путь в искусстве граффити более 10 лет назад, и за это время успел создать собственный узнаваемый стиль, который вдохновляет молодых художников.</p>
                </div>
            `,
            works: [
                {
                    image: 'img/gallery1.jpg',
                    title: 'Городской ритм',
                    description: 'Работа в стиле тэггинг на городской стене'
                },
                {
                    image: 'img/gallery2.jpg',
                    title: 'Неоновые мечты',
                    description: 'Эксперимент с неоновыми красками'
                },
                {
                    image: 'img/gallery3.jpg',
                    title: 'Уличная поэзия',
                    description: 'Каллиграфический тэг в городском пространстве'
                }
            ],
            events: [
                {
                    title: 'Мастер-класс по тэггингу',
                    date: '15 июля 2025',
                    location: 'Москва, Культурный центр',
                    description: 'Основы создания уникального стиля в тэггинге'
                },
                {
                    title: 'Фестиваль уличного искусства',
                    date: '20 июля 2025',
                    location: 'Парк Горького',
                    description: 'Участие в качестве специального гостя'
                }
            ]
        },
        2: {
            name: 'SEEN',
            city: 'Санкт-Петербург',
            experience: 'Профессионал',
            styles: ['Wildstyle'],
            image: 'img/artist2.jpg',
            description: `
                <div class="artist-header mb-4">
                    <img src="img/artist2.jpg" class="img-fluid rounded-3 mb-4" alt="SEEN">
                    <div class="artist-info">
                        <h1 class="mb-3">SEEN</h1>
                        <p class="text-muted mb-2">Санкт-Петербург</p>
                    </div>
                </div>
                <div class="artist-bio mb-4">
                    <h2>Биография</h2>
                    <p>SEEN - легенда граффити, известный своими сложными работами в стиле wildstyle. Его работы отличаются необычной геометрией и сложными переплетениями линий.</p>
                    <p>За свою карьеру создал множество масштабных работ, которые стали достопримечательностями города.</p>
                </div>
            `,
            works: [
                {
                    image: 'img/gallery4.jpg',
                    title: 'Геометрия города',
                    description: 'Сложная wildstyle композиция'
                },
                {
                    image: 'img/gallery5.jpg',
                    title: 'Цифровой шум',
                    description: 'Эксперимент с цифровыми элементами'
                },
                {
                    image: 'img/gallery6.jpg',
                    title: 'Городской лабиринт',
                    description: 'Многослойная композиция в стиле wildstyle'
                }
            ],
            events: [
                {
                    title: 'Выставка современного стрит-арта',
                    date: '25 июля 2025',
                    location: 'Галерея современного искусства',
                    description: 'Персональная выставка работ'
                }
            ]
        }
        // Добавьте данные для других художников
    };

    // Отображаем информацию о художнике
    function displayArtist(artistId) {
        const artist = artists[artistId];
        if (artist) {
            // Основная информация
            document.getElementById('artistContent').innerHTML = artist.description;

            // Работы художника
            const worksContainer = document.getElementById('artistWorks');
            artist.works.forEach(work => {
                const workElement = document.createElement('div');
                workElement.className = 'col-md-4';
                workElement.innerHTML = `
                    <div class="card h-100">
                        <img src="${work.image}" class="card-img-top" alt="${work.title}">
                        <div class="card-body">
                            <h3 class="card-title h5">${work.title}</h3>
                            <p class="card-text">${work.description}</p>
                        </div>
                    </div>
                `;
                worksContainer.appendChild(workElement);
            });

            // События
            const eventsContainer = document.getElementById('artistEvents');
            if (artist.events && artist.events.length > 0) {
                artist.events.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'col-md-6';
                    eventElement.innerHTML = `
                        <div class="card h-100">
                            <div class="card-body">
                                <h3 class="card-title h5">${event.title}</h3>
                                <p class="text-muted mb-2">${event.date}</p>
                                <p class="mb-2"><i class="fas fa-map-marker-alt me-2"></i>${event.location}</p>
                                <p class="card-text">${event.description}</p>
                            </div>
                        </div>
                    `;
                    eventsContainer.appendChild(eventElement);
                });
            } else {
                eventsContainer.innerHTML = '<div class="col-12"><p class="text-muted">Нет предстоящих событий</p></div>';
            }

            // Похожие художники
            const relatedArtists = Object.entries(artists)
                .filter(([id, data]) => id !== artistId && data.styles.some(style => artist.styles.includes(style)))
                .slice(0, 3);

            const relatedContainer = document.getElementById('relatedArtists');
            if (relatedArtists.length > 0) {
                relatedArtists.forEach(([id, data]) => {
                    const artistElement = document.createElement('div');
                    artistElement.className = 'col-md-4';
                    artistElement.innerHTML = `
                        <div class="card h-100">
                            <img src="${data.image}" class="card-img-top" alt="${data.name}">
                            <div class="card-body">
                                <h3 class="card-title h5">${data.name}</h3>
                                <p class="text-muted mb-2">${data.city}</p>
                                <a href="artist-details.html?id=${id}" class="btn btn-details">Подробнее</a>
                            </div>
                        </div>
                    `;
                    relatedContainer.appendChild(artistElement);
                });
            } else {
                relatedContainer.innerHTML = '<div class="col-12"><p class="text-muted">Похожих художников не найдено</p></div>';
            }

            // Обновляем заголовок страницы
            document.title = `${artist.name} — GraffZone`;
        } else {
            document.getElementById('artistContent').innerHTML = '<div class="alert alert-danger">Художник не найден</div>';
        }
    }

    // Если есть ID художника, отображаем информацию
    if (artistId) {
        displayArtist(artistId);
    }
}); 