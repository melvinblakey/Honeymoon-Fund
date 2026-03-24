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

// ── Click-to-copy ──────────────────────────────
const toast      = document.getElementById('toast');
let   toastTimer = null;

document.querySelectorAll('.payment-method').forEach((btn) => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    copyText(text);
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
