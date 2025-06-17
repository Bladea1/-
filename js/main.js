// Инициализация AOS анимаций
AOS.init({
  duration: 800,
  once: true
});

// Функция для фильтрации галереи
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    if (!item) return;
    const itemCategory = item.getAttribute('data-category');
    if (category === 'all' || itemCategory === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Функция фильтрации блога
function filterBlogPosts(filter) {
  const posts = document.querySelectorAll('article.card');
  posts.forEach(post => {
    const postCategories = post.getAttribute('data-categories').split(',');
    const postTags = post.getAttribute('data-tags').split(',');
    
    if (filter === 'all' || postCategories.includes(filter) || postTags.includes(filter)) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
}

// Обработчики для кнопок фильтрации
document.addEventListener('DOMContentLoaded', function() {
  // Фильтрация галереи
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterGallery(this.getAttribute('data-filter'));
      });
    });
  }

  // Фильтрация блога по категориям
  const blogCategoryLinks = document.querySelectorAll('.category-list a');
  if (blogCategoryLinks) {
    blogCategoryLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.getAttribute('data-category');
        filterBlogPosts(category);
      });
    });
  }

  // Фильтрация блога по тегам
  const blogTagLinks = document.querySelectorAll('.tag-badge');
  if (blogTagLinks) {
    blogTagLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const tag = this.getAttribute('data-tag');
        filterBlogPosts(tag);
      });
    });
  }

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Валидация формы
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      const inputs = this.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
      });

      if (isValid) {
        // Здесь будет отправка формы
        alert('Сообщение отправлено!');
        this.reset();
      }
    });
  }

  // Динамическая загрузка изображений
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Темная тема
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('dark-theme', isDark);
    });

    // Проверка сохраненной темы
    if (localStorage.getItem('dark-theme') === 'true') {
      document.body.classList.add('dark-theme');
    }
  }

  // Функционал кнопки "Наверх"
  const scrollToTopButton = document.getElementById('scrollToTop');
  
  // Показывать кнопку при прокрутке более 300px
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopButton.classList.add('visible');
    } else {
      scrollToTopButton.classList.remove('visible');
    }
  });

  // Плавная прокрутка наверх при клике
  scrollToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}); 