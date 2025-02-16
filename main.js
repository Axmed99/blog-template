// Post data structure
const posts = [
    {
        id: 1,
        title: 'Sida loo isticmaalo Git iyo GitHub',
        excerpt: 'Baro sida loo isticmaalo Git iyo GitHub si aad u maamusho code-kaaga...',
        author: 'Ahmed Hassan',
        date: '2024-03-20',
        image: 'https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg'
    },
    {
        id: 2,
        title: 'API Development-ka Node.js',
        excerpt: 'Baro sida loo sameeyo API-yo xoog leh adiga oo isticmaalaya Node.js...',
        author: 'Faadumo Ali',
        date: '2024-03-18',
        image: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg'
    },
    {
        id: 3,
        title: 'React Hooks-ka Cusub',
        excerpt: 'Baro hooks-ka cusub ee React 18 iyo sida loo isticmaalo...',
        author: 'Mohamed Jama',
        date: '2024-03-15',
        image: 'https://cdn.pixabay.com/photo/2016/11/19/22/52/coding-1841550_1280.jpg'
    }
];

// Trending posts data
const trendingPosts = [
    {
        id: 1,
        title: 'Sida loo isticmaalo HTML5',
        excerpt: 'Baro aasaaska HTML5 iyo sida loo sameeyo website-yo casri ah...',
        views: 1500,
        image: 'https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png'  // HTML5 logo
    },
    {
        id: 2,
        title: 'Barashada CSS Grid',
        excerpt: 'Baro sida loo isticmaalo CSS Grid si aad u sameyso layout-yo casri ah...',
        views: 1200,
        image: 'https://cdn.worldvectorlogo.com/logos/css-3.svg'  // CSS3 logo
    },
    {
        id: 3,
        title: 'JavaScript-ka Asaasiga ah',
        excerpt: 'Baro aasaaska JavaScript iyo sida loo sameeyo website-yo dynamic ah...',
        views: 980,
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'  // JavaScript logo
    }
];

// DOM Elements
const postsContainer = document.getElementById('postsContainer');
const categoryButtons = document.querySelectorAll('.categories-filter button');

// Initialize the blog
document.addEventListener('DOMContentLoaded', () => {
    displayPosts(posts);
    initializeCategoryFilter();
    initializeNewsletterForm();
    initializeTrendingPosts();

    // Add modal triggers
    const categoriesLink = document.querySelector('a[href="#categories"]');
    const aboutLink = document.querySelector('a[href="#about"]');

    categoriesLink.addEventListener('click', (e) => {
        e.preventDefault();
        const categoriesModal = new bootstrap.Modal(document.getElementById('categoriesModal'));
        categoriesModal.show();
    });

    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutModal = new bootstrap.Modal(document.getElementById('aboutModal'));
        aboutModal.show();
    });

    // Initialize modals for each category
    // Technology Modal
    const techButton = document.querySelector('[data-category="technology"]');
    techButton.addEventListener('click', (e) => {
        e.preventDefault();
        const techModal = new bootstrap.Modal(document.getElementById('techModal'));
        techModal.show();
    });

    // Development Modal
    const devButton = document.querySelector('[data-category="development"]');
    devButton.addEventListener('click', (e) => {
        e.preventDefault();
        const devModal = new bootstrap.Modal(document.getElementById('devModal'));
        devModal.show();
    });

    // Design Modal
    const designButton = document.querySelector('[data-category="design"]');
    designButton.addEventListener('click', (e) => {
        e.preventDefault();
        const designModal = new bootstrap.Modal(document.getElementById('designModal'));
        designModal.show();
    });
});

// Display posts function
function displayPosts(postsToShow) {
    postsContainer.innerHTML = '';
    
    postsToShow.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

// Create post element with enhanced layout
function createPostElement(post) {
    const article = document.createElement('div');
    article.className = 'post-card';
    article.innerHTML = `
        <div class="card-img-wrapper">
            <img src="${post.image}" class="card-img-top" alt="${post.title}">
        </div>
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.excerpt}</p>
            <div class="post-meta">
                <div class="meta-item">
                    <i class="bi bi-person"></i>
                    <span>${post.author}</span>
                </div>
                <div class="meta-item">
                    <i class="bi bi-calendar"></i>
                    <span>${formatDate(post.date)}</span>
                </div>
            </div>
            <a href="post.html?id=${post.id}" class="btn btn-primary mt-3 w-100">
                Sii Akhri <i class="bi bi-arrow-right ms-2"></i>
            </a>
        </div>
    `;
    return article;
}

// Initialize category filter
function initializeCategoryFilter() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            const filteredPosts = category === 'all' 
                ? posts 
                : posts.filter(post => post.category === category);
            
            displayPosts(filteredPosts);
        });
    });
}

// Initialize newsletter form
function initializeNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Add newsletter subscription logic here
        console.log(`Subscribed with email: ${email}`);
        
        // Show success message
        showToast('Successfully subscribed to the newsletter!');
        form.reset();
    });
}

// Initialize trending posts with correct numbering
function initializeTrendingPosts() {
    const trendingContainer = document.querySelector('.trending-section .row');
    trendingContainer.innerHTML = ''; // Clear existing content
    
    trendingPosts.forEach((post, index) => {
        const div = document.createElement('div');
        div.className = 'col-md-4';
        div.innerHTML = `
            <div class="trending-post card hover-shadow">
                <img src="${post.image}" class="card-img-top trending-img" alt="${post.title}">
                <span class="trending-badge">${index + 1}</span>
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.excerpt}</p>
                    <div class="post-meta d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            <i class="bi bi-eye"></i> ${post.views} views
                        </small>
                        <a href="post.html?id=${post.id}" class="btn btn-sm btn-outline-primary">
                            Sii Akhri <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        trendingContainer.appendChild(div);
    });
}

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function showToast(message) {
    // Create and show a Bootstrap toast
    const toastContainer = document.createElement('div');
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '11';
    
    toastContainer.innerHTML = `
        <div class="toast" role="alert">
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    document.body.appendChild(toastContainer);
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();
    
    // Remove toast after it's hidden
    toastContainer.addEventListener('hidden.bs.toast', () => {
        toastContainer.remove();
    });
} 