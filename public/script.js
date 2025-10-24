const formats = ['Claude Skills', 'llms.txt', 'MCP Servers', 'Prompt Links'];
let currentIndex = 0;
let currentText = '';
let isDeleting = false;
let charIndex = 0;

function type() {
  const typingElement = document.getElementById('typing-text');
  const currentFormat = formats[currentIndex];

  if (isDeleting) {
    currentText = currentFormat.substring(0, charIndex - 1);
    charIndex--;
  } else {
    currentText = currentFormat.substring(0, charIndex + 1);
    charIndex++;
  }

  typingElement.textContent = currentText;

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentFormat.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentIndex = (currentIndex + 1) % formats.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 500);
});
