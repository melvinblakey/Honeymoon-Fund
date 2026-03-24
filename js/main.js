/* ═══════════════════════════════════════════════
   HONEYMOON FUND — main.js
   ═══════════════════════════════════════════════ */

'use strict';

// ── Modal ──────────────────────────────────────
const overlay   = document.getElementById('modalOverlay');
const openBtn   = document.getElementById('openModal');
const closeBtn  = document.getElementById('closeModal');

function openModal() {
  overlay.classList.add('is-active');
  document.body.classList.add('modal-open');
  closeBtn.focus();
}

function closeModal() {
  overlay.classList.remove('is-active');
  document.body.classList.remove('modal-open');
  openBtn.focus();
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
    closeModal();
  }
});

// ── Click-to-copy (Zelle & Apple Pay only) ──────────────
const toast      = document.getElementById('toast');
let   toastTimer = null;

// Only attach copy handlers to buttons with data-copy (not <a> link methods)
document.querySelectorAll('button.payment-method[data-copy]').forEach((btn) => {
  btn.addEventListener('click', () => {
    copyText(btn.dataset.copy);
  });
});

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('Copied: ' + text))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showToast('Copied: ' + text);
  } catch {
    showToast('Tap & hold to copy: ' + text);
  }
  document.body.removeChild(ta);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

// ── Scroll fade-in ─────────────────────────────
const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: show everything immediately
  fadeEls.forEach((el) => el.classList.add('is-visible'));
}
