// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Explore Button - Scroll to Tools Section
const exploreBtn = document.getElementById('exploreBtn');

exploreBtn.addEventListener('click', () => {
    document.getElementById('tools').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Search Functionality
const heroSearch = document.getElementById('heroSearch');
const heroSearchBtn = document.getElementById('heroSearchBtn');
const toolCards = document.querySelectorAll('.tool-card');

// Remove highlights from all tools
function removeHighlights() {
    toolCards.forEach(card => {
        card.classList.remove('highlighted');
    });
}

// Search function
function performSearch() {
    const searchTerm = heroSearch.value.trim().toLowerCase();
    
    if (!searchTerm) {
        removeHighlights();
        return;
    }

    removeHighlights();
    
    let found = false;
    toolCards.forEach(card => {
        const toolName = card.getAttribute('data-tool-name').toLowerCase();
        const toolTitle = card.querySelector('.tool-name').textContent.toLowerCase();
        
        if (toolName.includes(searchTerm) || toolTitle.includes(searchTerm)) {
            card.classList.add('highlighted');
            found = true;
            
            // Scroll to the highlighted tool
            card.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    });

    if (!found) {
        alert(`No tools found for "${searchTerm}". Try searching for: Image, PDF, Calculator, Video, etc.`);
    }
}

// Event listeners for search
heroSearchBtn.addEventListener('click', performSearch);
heroSearch.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Clear search when clicking on search input
heroSearch.addEventListener('click', function() {
    this.select();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Tool button click handlers
document.querySelectorAll('.tool-btn').forEach(button => {
    button.addEventListener('click', function() {
        const toolName = this.parentElement.querySelector('.tool-name').textContent;
        
        // Check if it's Image Converter
        if (toolName === "All-in-One Converter") {
            window.location.href = "all-in-one-converter.html";
        } 
        // For other tools, show coming soon message
        else {
            alert(`"${toolName}" tool is coming soon! We're working hard to bring you this feature.`);
        }
    });
});

// Autocomplete Suggestions Data
const toolSuggestions = [
    "Image Converter", "Image Compressor", "Image Resizer", "Image Cropper", 
    "Image to Text OCR", "Image Rotator Flipper", "PDF to Word", "Word to PDF",
    "PDF Compressor", "PDF Merger", "PDF Splitter", "Document Converter",
    "PDF Lock", "PDF Unlock", "eSign PDF", "Scientific Calculator",
    "Age Calculator", "BMI Calculator", "Loan EMI Calculator", "GST Calculator",
    "Currency Converter", "Random Password Generator",
    "All-in-One Converter"
];

// Autocomplete Functionality
function setupAutocomplete() {
    const searchInput = document.getElementById('heroSearch');
    const suggestionsContainer = document.getElementById('searchSuggestions');

    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        suggestionsContainer.innerHTML = '';
        
        if (value.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        const filteredSuggestions = toolSuggestions.filter(tool => 
            tool.toLowerCase().includes(value)
        );

        if (filteredSuggestions.length > 0) {
            filteredSuggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.className = 'autocomplete-suggestion';
                div.textContent = suggestion;
                div.addEventListener('click', function() {
                    searchInput.value = suggestion;
                    suggestionsContainer.style.display = 'none';
                    performSearch();
                });
                suggestionsContainer.appendChild(div);
            });
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

// Initialize autocomplete when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupAutocomplete();
});

// New Hero Section JavaScript
document.querySelector('.cta-button').addEventListener('click', function() {
    document.getElementById('tools').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Search functionality for new hero
document.querySelector('.search-button').addEventListener('click', function() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput.value.trim() !== '') {
        heroSearch.value = searchInput.value;
        performSearch();
    }
});

// Enter key for new search
document.querySelector('.search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.querySelector('.search-button').click();
    }
});

// Tool icons hover effect
const toolIcons = document.querySelectorAll('.tool-icon');
toolIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
