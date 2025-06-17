document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Получаем все элементы
    const categoryLinks = document.querySelectorAll('.category-list a');
    const tagBadges = document.querySelectorAll('.tag-badge');
    const blogPosts = document.querySelectorAll('article[data-categories]');
    const resetButton = document.querySelector('.btn-reset-filters');
    const postsCounter = document.createElement('div');
    postsCounter.className = 'posts-counter';
    document.querySelector('.blog-filters div').appendChild(postsCounter);

    // Загрузка сохраненного фильтра
    const savedFilter = localStorage.getItem('blogFilter');
    const savedFilterType = localStorage.getItem('blogFilterType');

    // Функция обновления счетчика
    function updateCounter(visiblePosts) {
        postsCounter.textContent = `Показано постов: ${visiblePosts} из ${blogPosts.length}`;
    }

    // Функция обновления видимости кнопки сброса
    function updateResetButton(filterType, filterValue) {
        if (filterValue === 'all' && filterType === 'category') {
            resetButton.classList.add('hidden');
        } else {
            resetButton.classList.remove('hidden');
        }
    }

    // Функция сброса фильтров
    function resetFilters() {
        // Удаляем активные классы
        categoryLinks.forEach(cat => cat.classList.remove('active'));
        tagBadges.forEach(tag => tag.classList.remove('active'));
        
        // Очищаем localStorage
        localStorage.removeItem('blogFilter');
        localStorage.removeItem('blogFilterType');
        
        // Показываем все посты
        filterPosts('category', 'all');
        
        // Скрываем кнопку сброса
        resetButton.classList.add('hidden');
    }

    // Функция фильтрации постов
    function filterPosts(filterType, filterValue) {
        let visiblePosts = 0;
        
        // Сохраняем фильтр
        if (filterValue !== 'all') {
            localStorage.setItem('blogFilter', filterValue);
            localStorage.setItem('blogFilterType', filterType);
        } else {
            localStorage.removeItem('blogFilter');
            localStorage.removeItem('blogFilterType');
        }

        blogPosts.forEach(post => {
            const categories = post.getAttribute('data-categories').split(',');
            const tags = post.getAttribute('data-tags').split(',');
            
            if (filterValue === 'all' || 
                (filterType === 'category' && categories.includes(filterValue)) ||
                (filterType === 'tag' && tags.includes(filterValue))) {
                
                // Показываем пост с анимацией
                if (post.style.display === 'none') {
                    post.style.display = 'block';
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        post.style.opacity = '1';
                        post.style.transform = 'translateY(0)';
                    }, 100);
                }
                visiblePosts++;
            } else {
                // Скрываем пост с анимацией
                if (post.style.display !== 'none') {
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        post.style.display = 'none';
                    }, 300);
                }
            }
        });

        updateCounter(visiblePosts);
        updateResetButton(filterType, filterValue);
    }

    // Обработчики для категорий
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            categoryLinks.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterPosts('category', category);
        });
    });

    // Обработчики для тегов
    tagBadges.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            tagBadges.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const tagValue = this.getAttribute('data-tag');
            filterPosts('tag', tagValue);
        });
    });

    // Обработчик для кнопки сброса
    resetButton.addEventListener('click', resetFilters);

    // Применяем сохраненный фильтр при загрузке
    if (savedFilter && savedFilterType) {
        if (savedFilterType === 'category') {
            const savedCategory = document.querySelector(`.category-list a[data-category="${savedFilter}"]`);
            if (savedCategory) {
                savedCategory.classList.add('active');
                filterPosts('category', savedFilter);
            }
        } else if (savedFilterType === 'tag') {
            const savedTag = document.querySelector(`.tag-badge[data-tag="${savedFilter}"]`);
            if (savedTag) {
                savedTag.classList.add('active');
                filterPosts('tag', savedFilter);
            }
        }
    } else {
        // Показываем все посты по умолчанию
        filterPosts('category', 'all');
    }
}); 