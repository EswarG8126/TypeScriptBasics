function copyCode(button) {
    const pre = button.nextElementSibling;
    const code = pre.innerText;
    
    const textArea = document.createElement('textarea');
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        button.innerText = 'Copied!';
    } catch (err) {
        console.error('Failed to copy text: ', err);
        button.innerText = 'Failed!';
    }

    document.body.removeChild(textArea);

    setTimeout(() => {
        button.innerText = 'Copy';
    }, 2000);
}

function checkTypeSafety(textarea) {
    const code = textarea.value;
    const errorDiv = document.getElementById('type-safety-error');
    
    const ageAssignmentRegex = /age\s*=\s*(.*);?/;
    const match = code.match(ageAssignmentRegex);
    
    if (match && match[1]) {
        const value = match[1].trim();
        if (value.startsWith('"') || value.startsWith("'") || value.startsWith("`")) {
            errorDiv.innerText = "Error: Type 'string' is not assignable to type 'number'.";
        } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
             errorDiv.innerText = "";
        } else {
            errorDiv.innerText = "Error: Invalid assignment.";
        }
    } else {
        errorDiv.innerText = "";
    }
}

const initialEditorText = `let age: number;\nage = 30;\n`;
document.getElementById('type-safety-editor').value = initialEditorText;


window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    
    if (current === 'intro') current = 'setup';

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});