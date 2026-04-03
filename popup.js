const textarea = document.getElementById('note');
const charCount = document.getElementById('charCount');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const iconCopy = document.getElementById('iconCopy');
const iconCheck = document.getElementById('iconCheck');
const themeBtn = document.getElementById('themeBtn');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');
const STORAGE_KEY = 'jot_note';
const THEME_KEY = 'jot_theme';

function updateCount(text) {
  const len = text.length;
  charCount.textContent = len === 0 ? '0 chars' : `${len} char${len === 1 ? '' : 's'}`;
}

// Apply saved theme
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  } else {
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
  }
}

const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
  textarea.focus();
});

// Load saved note
textarea.value = localStorage.getItem(STORAGE_KEY) || '';
updateCount(textarea.value);

// Cursor at end
textarea.setSelectionRange(textarea.value.length, textarea.value.length);
textarea.focus();

// Save + update count on every change
textarea.addEventListener('input', () => {
  localStorage.setItem(STORAGE_KEY, textarea.value);
  updateCount(textarea.value);
});

// Copy all
copyBtn.addEventListener('click', () => {
  if (!textarea.value) return;
  navigator.clipboard.writeText(textarea.value).then(() => {
    iconCopy.style.display = 'none';
    iconCheck.style.display = 'block';
    copyBtn.style.color = 'var(--accent)';
    setTimeout(() => {
      iconCopy.style.display = 'block';
      iconCheck.style.display = 'none';
      copyBtn.style.color = '';
    }, 1500);
  });
  textarea.focus();
});

// Clear note
clearBtn.addEventListener('click', () => {
  textarea.value = '';
  localStorage.removeItem(STORAGE_KEY);
  updateCount('');
  textarea.focus();
});
