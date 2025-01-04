// Quill configuration object
const quillConfig = {
    theme: 'snow',
    modules: {
        toolbar: '#toolbar'
    },
    placeholder: 'Write your formatted text here...'
};

// Placeholder texts for different contexts
const placeholderTexts = {
    default: 'Write your formatted text here...',
    linkedin: 'Formatting for LinkedIn posts made easy! Write your content here...'
};

// Initialize Quill editor
let quill;

// Function to initialize Quill
function initQuill() {
    quill = new Quill('#editor', quillConfig);
}

// Function to update placeholder based on context
function updatePlaceholder(context) {
    if (quill && quill.root) {
        quill.root.dataset.placeholder = placeholderTexts[context] || placeholderTexts.default;
    }
}

// Event listener for placeholder updates
document.getElementById('toolbar').addEventListener('contextChange', function (event) {
    updatePlaceholder(event.detail.context);
});

// Lazy-load Quill resources if needed
if (window.Quill) {
    initQuill();
} else {
    const script = document.createElement('script');
    script.src = 'https://cdn.quilljs.com/1.3.6/quill.js';
    script.onload = initQuill;
    script.onerror = function() {
        console.error('Failed to load Quill library');
        // Fallback to a basic textarea if Quill fails to load
        const editor = document.getElementById('editor');
        editor.innerHTML = '<textarea placeholder="Write your text here..."></textarea>';
    };
    document.body.appendChild(script);
}

// Export the quill instance and updatePlaceholder function
export { quill, updatePlaceholder };
