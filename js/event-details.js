document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID события из URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    // Загружаем данные события
    loadEventDetails(eventId);

    // Инициализация AOS
    AOS.init({
        duration: 800,
        once: true
    });
});

// Функция загрузки данных события
function loadEventDetails(eventId) {
    // В реальном приложении здесь был бы запрос к серверу
    // Для демонстрации используем моковые данные
    const events = {
        1: {
            title: 'Фестиваль уличного искусства',
            date: '15-17 июля 2025',
            time: '12:00 - 22:00',
            location: 'Центральный парк культуры и отдыха, ул. Парковая, 1, Москва',
            price: 'Бесплатно',
            image: 'img/event1.jpg',
            description: 'Масштабный фестиваль с участием известных художников. В программе: мастер-классы, живая музыка, конкурсы и создание новых работ.',
            program: [
                {
                    time: '12:00',
                    title: 'Открытие фестиваля',
                    description: 'Приветственное слово организаторов и презентация программы'
                },
                {
                    time: '13:00',
                    title: 'Мастер-класс по базовым техникам',
                    description: 'Ведущий: StreetMaster'
                },
                {
                    time: '15:00',
                    title: 'Конкурс молодых художников',
                    description: 'Создание работ на заданную тему'
                },
                {
                    time: '18:00',
                    title: 'Живая музыка и перформанс',
                    description: 'Выступление уличных музыкантов'
                },
                {
                    time: '20:00',
                    title: 'Награждение победителей',
                    description: 'Подведение итогов конкурса'
                }
            ],
            participants: [
                {
                    name: 'StreetMaster',
                    role: 'Ведущий мастер-классов',
                    image: 'img/artist1.jpg'
                },
                {
                    name: 'NeonKnight',
                    role: 'Специальный гость',
                    image: 'img/artist2.jpg'
                },
                {
                    name: 'ColorBomb',
                    role: 'Член жюри',
                    image: 'img/artist3.jpg'
                }
            ],
            gallery: [
                'img/gallery1.jpg',
                'img/gallery2.jpg',
                'img/gallery3.jpg',
                'img/gallery4.jpg'
            ]
        },
        2: {
            title: 'Мастер-класс по леттерингу',
            date: '20 июля 2025',
            time: '15:00 - 18:00',
            location: 'Арт-центр "Пульс", ул. Творческая, 15, 3 этаж, Москва',
            price: '2000 ₽',
            image: 'img/event2.jpg',
            description: 'Интенсивный мастер-класс от LetterKing. Участники научатся основам леттеринга и создадут свою первую работу.',
            program: [
                {
                    time: '15:00',
                    title: 'Введение в леттеринг',
                    description: 'Теория и основные принципы'
                },
                {
                    time: '16:00',
                    title: 'Практическое занятие',
                    description: 'Создание эскизов'
                },
                {
                    time: '17:00',
                    title: 'Работа с цветом',
                    description: 'Колористика в леттеринге'
                }
            ],
            participants: [
                {
                    name: 'LetterKing',
                    role: 'Ведущий мастер-класса',
                    image: 'img/artist4.jpg'
                }
            ],
            gallery: [
                'img/gallery5.jpg',
                'img/gallery6.jpg'
            ]
        },
        3: {
            title: 'Выставка современного граффити',
            date: '1-10 августа 2025',
            time: '10:00 - 20:00',
            location: 'Галерея современного искусства "Новый формат", ул. Арт-стрит, 7, Москва',
            price: '500 ₽',
            image: 'img/event3.jpg',
            description: 'Уникальная выставка работ современных граффити-художников. Специальные гости: StreetMaster и NeonKnight.',
            program: [
                {
                    time: '10:00',
                    title: 'Открытие выставки',
                    description: 'Ежедневно'
                },
                {
                    time: '15:00',
                    title: 'Экскурсия с куратором',
                    description: 'По предварительной записи'
                },
                {
                    time: '18:00',
                    title: 'Встреча с художниками',
                    description: '5 и 7 августа'
                }
            ],
            participants: [
                {
                    name: 'StreetMaster',
                    role: 'Художник',
                    image: 'img/artist1.jpg'
                },
                {
                    name: 'NeonKnight',
                    role: 'Художник',
                    image: 'img/artist2.jpg'
                }
            ],
            gallery: [
                'img/gallery7.jpg',
                'img/gallery8.jpg',
                'img/gallery9.jpg'
            ]
        },
        4: {
            title: 'Конкурс молодых художников',
            date: '15 августа 2025',
            time: '11:00 - 19:00',
            location: 'Молодежный центр "Креатив", ул. Молодежная, 25, Москва',
            price: 'Бесплатно для участников',
            image: 'img/event4.jpg',
            description: 'Ежегодный конкурс для начинающих граффити-художников. Главный приз - возможность создать работу на центральной площади города.',
            program: [
                {
                    time: '11:00',
                    title: 'Регистрация участников',
                    description: 'Проверка документов и материалов'
                },
                {
                    time: '12:00',
                    title: 'Начало конкурса',
                    description: 'Объявление темы и правил'
                },
                {
                    time: '17:00',
                    title: 'Завершение работ',
                    description: 'Подготовка к оценке жюри'
                },
                {
                    time: '18:00',
                    title: 'Награждение',
                    description: 'Объявление победителей'
                }
            ],
            participants: [
                {
                    name: 'UrbanMaster',
                    role: 'Председатель жюри',
                    image: 'img/artist5.jpg'
                },
                {
                    name: 'ColorPro',
                    role: 'Член жюри',
                    image: 'img/artist6.jpg'
                }
            ],
            gallery: [
                'img/gallery10.jpg',
                'img/gallery11.jpg',
                'img/gallery12.jpg'
            ]
        }
    };

    const event = events[eventId];
    if (!event) {
        window.location.href = 'events.html';
        return;
    }

    // Заполняем данные события
    document.title = `${event.title} — GraffZone`;
    document.getElementById('eventImage').src = event.image;
    document.getElementById('eventImage').alt = event.title;
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDate').textContent = event.date;
    document.getElementById('eventTime').textContent = event.time;
    document.getElementById('eventLocation').textContent = event.location;
    document.getElementById('eventPrice').textContent = event.price;
    document.getElementById('eventDescription').textContent = event.description;

    // Заполняем программу
    const programHtml = event.program.map(item => `
        <div class="program-item mb-4">
            <div class="d-flex align-items-center mb-2">
                <span class="time text-primary me-3">${item.time}</span>
                <h3 class="h5 mb-0">${item.title}</h3>
            </div>
            <p class="ms-5 mb-0">${item.description}</p>
        </div>
    `).join('');
    document.getElementById('eventProgram').innerHTML = programHtml;

    // Заполняем участников
    const participantsHtml = event.participants.map(participant => `
        <div class="col-md-4">
            <div class="participant-card text-center">
                <img src="${participant.image}" alt="${participant.name}" class="rounded-circle mb-3" style="width: 150px; height: 150px; object-fit: cover;">
                <h4 class="h5">${participant.name}</h4>
                <p class="text-muted">${participant.role}</p>
            </div>
        </div>
    `).join('');
    document.getElementById('eventParticipants').innerHTML = participantsHtml;
}

// Обработка формы комментариев
document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Функция комментариев будет доступна позже');
}); 