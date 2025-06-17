document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const styleId = urlParams.get('style');
    const styleName = urlParams.get('name');

    // Данные о стилях
    const styles = {
        tagging: {
            name: 'Tagging',
            image: 'img/tag-style.jpg',
            description: `
                <img src="img/tag-style.jpg" class="img-fluid mb-4" alt="Tagging стиль">
                <h1 class="mb-4">Tagging - основа граффити</h1>
                <p>Tagging - это самая базовая и распространенная форма граффити. Это быстрые подписи художников, выполненные в один цвет и состоящие из стилизованных букв.</p>
                <h2>История</h2>
                <p>Тэггинг появился в конце 1960-х годов в Филадельфии и быстро распространился в Нью-Йорке. Первые тэги были простыми подписями, которые художники оставляли для обозначения своей территории.</p>
                <h2>Характеристики</h2>
                <ul>
                    <li>Быстрое исполнение</li>
                    <li>Один цвет</li>
                    <li>Стилизованные буквы</li>
                    <li>Минималистичный дизайн</li>
                </ul>
                <h2>Техника</h2>
                <p>Для создания тэгов обычно используются маркеры или аэрозольные краски. Важно развить свой уникальный стиль написания букв и добиться плавности линий.</p>
            `,
            examples: [
                {
                    image: 'img/tag-example1.jpg',
                    title: 'Классический тэг'
                },
                {
                    image: 'img/tag-example2.jpg',
                    title: 'Современный тэг'
                }
            ],
            artists: [
                {
                    name: 'TAKI 183',
                    image: 'img/artist1.jpg',
                    description: 'Один из первых тэггеров, популяризировавший это направление'
                },
                {
                    name: 'SEEN',
                    image: 'img/artist2.jpg',
                    description: 'Легенда граффити, известный своими тэгами в метро'
                }
            ],
            relatedPosts: [
                {
                    title: 'История тэггинга',
                    image: 'img/blog1.jpg',
                    excerpt: 'Как простые подписи превратились в искусство...',
                    link: 'blog-post.html?id=1'
                }
            ]
        },
        throwup: {
            name: 'Throw-up',
            image: 'img/throwup-style.jpg',
            description: `
                <img src="img/throwup-style.jpg" class="img-fluid mb-4" alt="Throw-up стиль">
                <h1 class="mb-4">Throw-up - быстрый и эффектный стиль</h1>
                <p>Throw-up (или throwie) - это стиль граффити, характеризующийся быстрым исполнением и использованием обычно двух цветов: один для заливки, другой для контура.</p>
                <h2>Особенности</h2>
                <p>Throw-up обычно состоит из букв с пузырчатым дизайном, которые легко читаются. Этот стиль более сложный, чем тэггинг, но проще, чем полноценные пиcы.</p>
                <h2>Характеристики</h2>
                <ul>
                    <li>Два цвета</li>
                    <li>Пузырчатые буквы</li>
                    <li>Быстрое исполнение</li>
                    <li>Простой дизайн</li>
                </ul>
            `,
            examples: [
                {
                    image: 'img/throwup-example1.jpg',
                    title: 'Классический throw-up'
                }
            ],
            artists: [
                {
                    name: 'COPE2',
                    image: 'img/artist3.jpg',
                    description: 'Мастер throw-up стиля из Бронкса'
                }
            ]
        },
        // Добавьте другие стили здесь
    };

    // Отображаем содержимое стиля
    function displayStyle(styleId) {
        const style = styles[styleId];
        if (style) {
            // Основной контент
            document.getElementById('styleContent').innerHTML = style.description;
            document.title = `${style.name} — GraffZone`;

            // Примеры работ
            const examplesGrid = document.getElementById('examplesGrid');
            if (style.examples) {
                style.examples.forEach(example => {
                    const exampleCard = document.createElement('div');
                    exampleCard.className = 'col-md-6';
                    exampleCard.innerHTML = `
                        <div class="card">
                            <img src="${example.image}" class="card-img-top" alt="${example.title}">
                            <div class="card-body">
                                <h5 class="card-title">${example.title}</h5>
                            </div>
                        </div>
                    `;
                    examplesGrid.appendChild(exampleCard);
                });
            }

            // Художники
            const artistsGrid = document.getElementById('artistsGrid');
            if (style.artists) {
                style.artists.forEach(artist => {
                    const artistCard = document.createElement('div');
                    artistCard.className = 'col-md-6';
                    artistCard.innerHTML = `
                        <div class="card">
                            <img src="${artist.image}" class="card-img-top" alt="${artist.name}">
                            <div class="card-body">
                                <h5 class="card-title">${artist.name}</h5>
                                <p class="card-text">${artist.description}</p>
                            </div>
                        </div>
                    `;
                    artistsGrid.appendChild(artistCard);
                });
            }

            // Связанные статьи
            const relatedPosts = document.getElementById('relatedPosts');
            if (style.relatedPosts) {
                style.relatedPosts.forEach(post => {
                    const postCard = document.createElement('div');
                    postCard.className = 'col-md-6';
                    postCard.innerHTML = `
                        <div class="card">
                            <img src="${post.image}" class="card-img-top" alt="${post.title}">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.excerpt}</p>
                                <a href="${post.link}" class="btn btn-details">Читать далее</a>
                            </div>
                        </div>
                    `;
                    relatedPosts.appendChild(postCard);
                });
            }
        } else {
            document.getElementById('styleContent').innerHTML = '<div class="alert alert-danger">Стиль не найден</div>';
        }
    }

    // Если есть ID стиля, отображаем его
    if (styleId) {
        displayStyle(styleId);
    }
}); 