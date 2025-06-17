// Временные данные для демонстрации (в реальном проекте будут загружаться с сервера)
const artworksData = {
    1: {
        title: "Городские джунгли",
        artist: "StreetMaster",
        category: "Уличные",
        date: "2023-09-15",
        location: "Москва, ул. Арбат",
        description: "Масштабная работа, отражающая взаимодействие природы и городской среды. Яркие цвета и плавные линии создают иллюзию джунглей, прорастающих сквозь бетонные стены.",
        image: "img/gallery1.jpg",
        tags: ["природа", "город", "экология", "стрит-арт"],
        process: "Работа создавалась в течение недели с использованием различных техник напыления и ручной прорисовки деталей. Особое внимание было уделено цветовым переходам и текстурам листвы.",
        processImages: [
            { src: "img/process1_1.jpg", caption: "Подготовка стены" },
            { src: "img/process1_2.jpg", caption: "Нанесение базового слоя" },
            { src: "img/process1_3.jpg", caption: "Проработка деталей" }
        ],
        technicals: {
            "Размер": "12x8 метров",
            "Материалы": "Акриловая краска, аэрозольные баллоны",
            "Время создания": "7 дней",
            "Техника": "Комбинированная"
        },
        artistInfo: {
            name: "StreetMaster",
            avatar: "img/artists/streetmaster.jpg",
            bio: "Известный уличный художник, специализирующийся на экологической тематике",
            link: "artists.html?id=1"
        }
    },
    2: {
        title: "Неоновые мечты",
        artist: "NeonKnight",
        category: "Абстрактные",
        date: "2023-10-20",
        location: "Санкт-Петербург, Новая Голландия",
        description: "Абстрактная композиция, вдохновленная ночными огнями мегаполиса. Яркие неоновые цвета и геометрические формы создают футуристическую атмосферу.",
        image: "img/gallery2.jpg",
        tags: ["неон", "абстракция", "город", "ночь"],
        process: "Работа выполнена в технике многослойного напыления с использованием светоотражающих красок. Каждый элемент композиции прорабатывался отдельно для создания эффекта свечения.",
        processImages: [
            { src: "img/process2_1.jpg", caption: "Разметка композиции" },
            { src: "img/process2_2.jpg", caption: "Нанесение базовых форм" },
            { src: "img/process2_3.jpg", caption: "Добавление светоотражающих элементов" }
        ],
        technicals: {
            "Размер": "10x6 метров",
            "Материалы": "Светоотражающие краски, аэрозольные баллоны",
            "Время создания": "5 дней",
            "Техника": "Многослойное напыление"
        },
        artistInfo: {
            name: "NeonKnight",
            avatar: "img/artists/neonknight.jpg",
            bio: "Мастер неонового стиля, создатель уникальной техники светоотражающего граффити",
            link: "artists.html?id=2"
        }
    },
    3: {
        title: "Хранитель города",
        artist: "UrbanPoet",
        category: "Персонажи",
        date: "2023-11-05",
        location: "Казань, ул. Баумана",
        description: "Монументальный образ мифического существа, охраняющего город. В работе соединены элементы локальной мифологии и современного уличного искусства.",
        image: "img/gallery3.jpg",
        tags: ["персонаж", "мифология", "город", "защитник"],
        process: "Создание работы началось с детальных эскизов и изучения локальной мифологии. Особое внимание уделялось проработке текстур и созданию эффекта монументальности.",
        processImages: [
            { src: "img/process3_1.jpg", caption: "Эскизы и планирование" },
            { src: "img/process3_2.jpg", caption: "Создание основных форм" },
            { src: "img/process3_3.jpg", caption: "Детализация образа" }
        ],
        technicals: {
            "Размер": "15x12 метров",
            "Материалы": "Акриловые краски, аэрозольные баллоны, текстурные пасты",
            "Время создания": "10 дней",
            "Техника": "Смешанная техника"
        },
        artistInfo: {
            name: "UrbanPoet",
            avatar: "img/artists/urbanpoet.jpg",
            bio: "Художник, исследующий взаимосвязь городской культуры и мифологии",
            link: "artists.html?id=3"
        }
    }
};

// Получение ID работы из URL
function getArtworkId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
}

// Загрузка данных о работе
function loadArtworkData() {
    const id = getArtworkId();
    const artwork = artworksData[id];
    
    if (!artwork) {
        showError("Работа не найдена");
        return;
    }

    // Заполнение основной информации
    document.getElementById('artworkImage').src = artwork.image;
    document.getElementById('artworkImage').alt = artwork.title;
    document.getElementById('artworkTitle').textContent = artwork.title;
    document.getElementById('artworkArtist').textContent = artwork.artist;
    document.getElementById('artworkCategory').textContent = artwork.category;
    document.getElementById('artworkDate').textContent = new Date(artwork.date).toLocaleDateString('ru-RU');
    document.getElementById('artworkLocation').textContent = artwork.location;
    document.getElementById('artworkDescription').textContent = artwork.description;

    // Заполнение тегов
    const tagsContainer = document.getElementById('artworkTags');
    tagsContainer.innerHTML = artwork.tags.map(tag => 
        `<span class="badge bg-primary">${tag}</span>`
    ).join('');

    // Заполнение процесса создания
    const processContainer = document.getElementById('artworkProcess');
    processContainer.innerHTML = `
        <p class="mb-4">${artwork.process}</p>
        <div class="process-gallery row g-4">
            ${artwork.processImages.map(img => `
                <div class="col-md-4">
                    <figure class="figure">
                        <img src="${img.src}" alt="${img.caption}" class="figure-img img-fluid rounded">
                        <figcaption class="figure-caption text-white">${img.caption}</figcaption>
                    </figure>
                </div>
            `).join('')}
        </div>
    `;

    // Заполнение технических деталей
    const technicalsContainer = document.getElementById('artworkTechnicals');
    technicalsContainer.innerHTML = Object.entries(artwork.technicals).map(([key, value]) =>
        `<p><strong>${key}:</strong> ${value}</p>`
    ).join('');

    // Добавление информации об авторе
    const artistContainer = document.getElementById('artistInfo');
    if (artistContainer && artwork.artistInfo) {
        artistContainer.innerHTML = `
            <div class="artist-card bg-dark text-white p-4 rounded">
                <div class="d-flex align-items-center mb-3">
                    <img src="${artwork.artistInfo.avatar}" alt="${artwork.artistInfo.name}" 
                         class="rounded-circle me-3" style="width: 60px; height: 60px; object-fit: cover;">
                    <div>
                        <h3 class="h5 mb-1">${artwork.artistInfo.name}</h3>
                        <a href="${artwork.artistInfo.link}" class="text-primary">Профиль художника</a>
                    </div>
                </div>
                <p class="mb-0">${artwork.artistInfo.bio}</p>
            </div>
        `;
    }

    // Загрузка похожих работ
    loadSimilarWorks(artwork);
}

// Загрузка похожих работ
function loadSimilarWorks(currentArtwork) {
    const similarWorksContainer = document.getElementById('similarWorks');
    
    // Находим похожие работы по категории и тегам
    const similarWorks = Object.values(artworksData).filter(artwork => 
        artwork.title !== currentArtwork.title && // Исключаем текущую работу
        (artwork.category === currentArtwork.category || // Та же категория
         artwork.tags.some(tag => currentArtwork.tags.includes(tag))) // Общие теги
    ).slice(0, 3); // Берем только первые 3 работы

    if (similarWorks.length > 0) {
        similarWorksContainer.innerHTML = `
            <div class="row g-4">
                ${similarWorks.map(artwork => `
                    <div class="col-md-4">
                        <div class="card bg-dark text-white h-100">
                            <img src="${artwork.image}" class="card-img-top" alt="${artwork.title}">
                            <div class="card-body">
                                <h5 class="card-title">${artwork.title}</h5>
                                <p class="card-text">${artwork.artist}</p>
                                <a href="artwork.html?id=${Object.keys(artworksData).find(key => artworksData[key] === artwork)}" 
                                   class="btn btn-outline-light">Подробнее</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        similarWorksContainer.innerHTML = '<p class="text-muted">Похожие работы не найдены</p>';
    }
}

// Обработка отправки комментария
document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const commentText = document.getElementById('commentText').value;
    if (commentText.trim()) {
        addComment({
            text: commentText,
            author: "Гость",
            date: new Date()
        });
        document.getElementById('commentText').value = '';
    }
});

// Добавление комментария
function addComment(comment) {
    const commentsList = document.getElementById('commentsList');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment bg-dark-subtle p-3 rounded mb-3';
    commentElement.innerHTML = `
        <div class="d-flex justify-content-between mb-2">
            <strong>${comment.author}</strong>
            <small class="text-muted">${comment.date.toLocaleDateString('ru-RU')}</small>
        </div>
        <p class="mb-0">${comment.text}</p>
    `;
    commentsList.prepend(commentElement);
}

// Отображение ошибки
function showError(message) {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="alert alert-danger mt-4" role="alert">
            ${message}
        </div>
    `;
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    loadArtworkData();
    // Инициализация увеличения изображений
    const artworkImage = document.getElementById('artworkImage');
    if (artworkImage) {
        artworkImage.addEventListener('click', () => {
            const modal = new bootstrap.Modal(document.getElementById('imageModal'));
            document.getElementById('modalImage').src = artworkImage.src;
            modal.show();
        });
    }
}); 