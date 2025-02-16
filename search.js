// Search functionality
const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('input[type="search"]');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    
    const searchResults = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm)
    );
    
    displayPosts(searchResults);
    
    // Update UI to show search results
    if (searchResults.length === 0) {
        postsContainer.innerHTML = `
            <div class="col-12 text-center">
                <h3>No results found for "${searchTerm}"</h3>
                <button class="btn btn-primary mt-3" onclick="displayPosts(posts)">
                    Clear Search
                </button>
            </div>
        `;
    }
});

// Add search suggestions
searchInput.addEventListener('input', debounce((e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length < 3) return;
    
    const suggestions = posts
        .filter(post => post.title.toLowerCase().includes(searchTerm))
        .slice(0, 5);
        
    showSearchSuggestions(suggestions);
}, 300));

function showSearchSuggestions(suggestions) {
    let suggestionsList = document.querySelector('.search-suggestions');
    
    if (!suggestionsList) {
        suggestionsList = document.createElement('div');
        suggestionsList.className = 'search-suggestions position-absolute bg-white w-100 shadow-sm';
        searchForm.appendChild(suggestionsList);
    }
    
    if (suggestions.length === 0) {
        suggestionsList.remove();
        return;
    }
    
    suggestionsList.innerHTML = suggestions
        .map(post => `
            <div class="suggestion p-2 hover-bg-light">
                <a href="post.html?id=${post.id}" class="text-decoration-none text-dark">
                    ${post.title}
                </a>
            </div>
        `)
        .join('');
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
} 