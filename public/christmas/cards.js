import { cards, release } from './cover-data.js';

const titles = new Map(cards.map(card => [card.id, card]));
const composer = document.body.dataset.mode === 'compose';
const initialCover = new URLSearchParams(location.search).get('cover');
const fields = {
  to: document.querySelector('#to'),
  from: document.querySelector('#from'),
  message: document.querySelector('#note'),
};
const fold = document.querySelector('.fold');
const coverButton = document.querySelector('.cover');
const coverImage = coverButton.querySelector('img');
const toggle = document.querySelector('.toggle');
const inside = document.querySelector('#greeting');
const recipient = document.querySelector('#recipient-name');
const note = document.querySelector('#message');
const signed = document.querySelector('#signed');
const status = document.querySelector('.status');
const fallback = document.querySelector('.share-url');
const png = document.querySelector('#png');
const choices = [...document.querySelectorAll('.choice')];

let selected = titles.get(composer && initialCover ? initialCover : document.body.dataset.design) ?? cards[1];
let sampleIndex = 0;

function normalizeGreeting(data) {
  return Object.fromEntries(Object.entries(fields).map(([key, field]) => [
    key,
    typeof data[key] === 'string' ? data[key].slice(0, field.maxLength).trim() : '',
  ]));
}

function readGreeting() {
  const data = new URLSearchParams(location.hash.slice(1)).get('g');
  if (!data || data.length > 3000 || !/^[A-Za-z0-9_-]+$/.test(data)) return {};
  try {
    const base64 = data.replaceAll('-', '+').replaceAll('_', '/');
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const value = JSON.parse(new TextDecoder().decode(bytes));
    return value?.v === 1 ? normalizeGreeting(value) : {};
  } catch {
    return {};
  }
}

const incoming = readGreeting();

function currentGreeting() {
  if (!composer) return incoming;
  return normalizeGreeting(Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value])));
}

function shareUrl() {
  const url = new URL('/christmas/' + selected.id + '/', 'https://onemorephoton.com');
  const greeting = currentGreeting();
  if (Object.values(greeting).some(Boolean)) {
    const bytes = new TextEncoder().encode(JSON.stringify({ v: 1, ...greeting }));
    url.hash = 'g=' + btoa(String.fromCharCode(...bytes))
      .replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
  }
  return url.href;
}

function updateGreeting() {
  const { to, from, message } = currentGreeting();
  recipient.hidden = !to;
  recipient.textContent = to ? 'To ' + to : '';
  signed.hidden = !from;
  signed.textContent = from ? 'From ' + from : '';
  note.textContent = message || selected.message;
  status.textContent = '';
  fallback.hidden = true;
}

function setOpen(open) {
  fold.dataset.open = String(open);
  inside.setAttribute('aria-hidden', String(!open));
  inside.inert = !open;
  coverButton.inert = open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close card' : 'Open card';
}

function changeCover(card) {
  selected = card;
  sampleIndex = 0;
  setOpen(false);
  fold.dataset.shape = card.shape;
  coverImage.src = card.image;
  coverImage.alt = card.alt;
  coverButton.setAttribute('aria-label', 'Open ' + card.title);
  fields.message.placeholder = card.message;
  png.href = release + 'orion-' + card.id + '.png';
  for (const choice of choices) choice.setAttribute('aria-pressed', String(choice.dataset.id === card.id));
  updateGreeting();
}

for (const choice of choices) choice.addEventListener('click', () => changeCover(titles.get(choice.dataset.id)));
for (const field of Object.values(fields)) field.addEventListener('input', updateGreeting);

document.querySelector('.sample').addEventListener('click', () => {
  const available = [selected, ...cards.filter(card => card !== selected)];
  fields.message.value = available[sampleIndex % available.length].message;
  sampleIndex++;
  updateGreeting();
});

coverButton.addEventListener('click', () => {
  setOpen(true);
  toggle.focus({ preventScroll: true });
});
toggle.addEventListener('click', () => setOpen(fold.dataset.open === 'false'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && fold.dataset.open === 'true') {
    setOpen(false);
    toggle.focus({ preventScroll: true });
  }
});

document.querySelector('.copy').addEventListener('click', async () => {
  const url = shareUrl();
  try {
    await navigator.clipboard.writeText(url);
    status.textContent = 'Card link copied.';
    fallback.hidden = true;
  } catch {
    fallback.value = url;
    fallback.hidden = false;
    fallback.focus();
    fallback.select();
    status.textContent = 'Copy the selected link to send your card.';
  }
});

if (composer) {
  for (const [key, field] of Object.entries(fields)) field.value = incoming[key] ?? '';
}
changeCover(selected);
