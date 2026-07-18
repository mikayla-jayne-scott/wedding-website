const weddingDate = new Date('2027-07-17T15:30:00-04:00').getTime();
const timeUnits = { days: 86400000, hours: 3600000, minutes: 60000, seconds: 1000 };

function updateCountdown() {
  let remaining = Math.max(0, weddingDate - Date.now());
  Object.entries(timeUnits).forEach(([unit, milliseconds]) => {
    const value = Math.floor(remaining / milliseconds);
    remaining %= milliseconds;
    const field = document.getElementById(unit);
    field.textContent = unit === 'days' ? String(value).padStart(3, '0') : String(value).padStart(2, '0');
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

const header = document.getElementById('navbar');
const menuButton = document.querySelector('.menu-toggle');
const menuLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
menuButton.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
menuLinks.forEach(link => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', () => {
  const flipped = card.classList.toggle('is-flipped');
  card.setAttribute('aria-pressed', String(flipped));
}));

const initialAdventureImages = [
  ['photos/Adventures/Graduation.jpeg', '3 / 4'],
  ['photos/Adventures/Barcelona.jpeg', '1932 / 1626'],
  ['photos/Adventures/Hiking.jpeg', '4 / 3'],
  ['photos/Adventures/Skiing.jpeg', '3 / 4'],
  ['photos/Adventures/MackinacIsland.jpeg', '1812 / 1536'],
  ['photos/Adventures/OffRoading.jpeg', '3 / 4']
];
document.querySelectorAll('.memory-card .memory-front').forEach((front, index) => {
  const [image, ratio] = initialAdventureImages[index] || [];
  if (image) {
    front.closest('.memory-card').style.setProperty('--card-ratio', ratio);
    front.insertAdjacentHTML('afterbegin', `<img class="memory-photo" src="${image}" alt="Adventure memory ${index + 1}">`);
  }
});

const extraAdventures = [
  ['Turks & Caicos', 'A favorite sun-soaked escape.', 'photos/Adventures/TurksAndCaicos.jpeg', '4 / 3'],
  ['Snorkeling', 'A little adventure beneath the surface.', 'photos/Adventures/Snorkeling.png', '1504 / 1113'],
  ['Caribbean', 'Warm water and sunshine together.', 'photos/Adventures/Carribbean.jpeg', '4 / 3'],
  ['Christmas', 'One of our coziest traditions.', 'photos/Adventures/Christmas.jpeg', '4 / 3'],
  ['Lisbon', 'Pastéis, tiled streets, and so much color.', 'photos/Adventures/Lisbon.jpeg', '3 / 4'],
  ['Rome', 'A very good excuse for a long walk and pasta.', 'photos/Adventures/Rome.jpeg', '4 / 3'],
  ['Puerto Rico', 'Warm water and sunshine together.', 'photos/Adventures/PuertoRico.jpeg', '3 / 4'],
  ['University of Michigan', 'A chapter we will always be grateful for.', 'photos/Adventures/UniversityOfMichigan.jpeg', '2041 / 1439'],
  ['Amalfi Coast', 'A view we will never forget.', 'photos/Adventures/AlmalfiCoast.jpeg', '992 / 792'],
  ['Snowshoeing', 'A winter adventure worth bundling up for.', 'photos/Adventures/SnowShoeing.png', '3 / 4'],
  ['Studying', 'Making even the ordinary days an adventure.', 'photos/Adventures/Studying.jpeg', '4 / 3']
];
const adventureGrid = document.querySelector('.adventure-grid');
if (adventureGrid) extraAdventures.forEach(([title, memory, image, ratio], index) => {
  const card = document.createElement('button');
  card.className = 'memory-card reveal visible';
  card.type = 'button';
  card.style.setProperty('--card-ratio', ratio);
  card.setAttribute('aria-pressed', 'false');
  card.innerHTML = `<span class="memory-inner"><span class="memory-face memory-front"><img class="memory-photo" src="${image}" alt="${title}"><span>${String(index + 7).padStart(2, '0')}</span></span><span class="memory-face memory-back"><b>${title}</b><small>${memory}</small></span></span>`;
  card.addEventListener('click', () => card.setAttribute('aria-pressed', String(card.classList.toggle('is-flipped'))));
  adventureGrid.append(card);
});

const travelTabs = document.querySelectorAll('.travel-tab');
const travelPanels = document.querySelectorAll('.travel-panel');
travelTabs.forEach(tab => tab.addEventListener('click', () => {
  const panelId = tab.dataset.travelTab;
  travelTabs.forEach(button => {
    const selected = button === tab;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-selected', String(selected));
  });
  travelPanels.forEach(panel => {
    const selected = panel.id === panelId;
    panel.classList.toggle('is-active', selected);
    panel.hidden = !selected;
  });
}));

const airportTab = document.querySelector('[data-travel-tab="fly-guide"]');
const bridgeTab = document.querySelector('[data-travel-tab="bridge-guide"]');
const ferryTab = document.querySelector('[data-travel-tab="ferry-guide"]');
const travelTabList = document.querySelector('.travel-tabs');
if (travelTabList && airportTab && bridgeTab && ferryTab) travelTabList.append(airportTab, bridgeTab, ferryTab);
if (airportTab) airportTab.click();

const directionLinks = [
  ['#ferry-guide .text-link', 'https://www.google.com/maps/dir/?api=1&destination=Drummond+Island+Ferry%2C+De+Tour+Village%2C+MI', 'Get directions to the ferry'],
  ['#bridge-guide .text-link', 'https://www.google.com/maps/dir/?api=1&origin=Mackinac+Bridge&destination=Drummond+Island+Ferry%2C+De+Tour+Village%2C+MI', 'Bridge to ferry directions'],
  ['#fly-guide .airport-list', 'https://www.google.com/maps/dir/?api=1&destination=Drummond+Island+Ferry%2C+De+Tour+Village%2C+MI', 'Get directions from your airport']
];
directionLinks.forEach(([selector, href, label]) => {
  const target = document.querySelector(selector);
  if (target) target.insertAdjacentHTML('afterend', `<a class="directions-link" href="${href}" target="_blank" rel="noreferrer">${label} <b>↗</b></a>`);
});

const activityAdditions = [
  ['.water-card .activity-links', '<a href="https://visitdrummondisland.com/places/kayaking-paddle-boarding/" target="_blank" rel="noreferrer">More paddle rentals <b>↗</b></a><a href="https://islandershoppe.com/pages/rentals" target="_blank" rel="noreferrer">Islander Shoppe rentals <b>↗</b></a>'],
  ['.orv-card .activity-links', '<a href="https://beaversondi.com/index.html" target="_blank" rel="noreferrer">ATV rentals <b>↗</b></a><a href="https://visitdrummondisland.com/places/drummond-island-outdoor-toys/" target="_blank" rel="noreferrer">Outdoor Toys rentals <b>↗</b></a>'],
  ['.visitor-card .text-link', '<div class="app-links"><span>Take the guide with you</span><a href="https://apps.apple.com/us/app/drummond-island-tourism/id6759264682" target="_blank" rel="noreferrer">Download for iPhone <b>↗</b></a><a href="https://play.google.com/store/apps/details?id=com.visitwidget.drummondisland" target="_blank" rel="noreferrer">Download for Android <b>↗</b></a></div>']
];
activityAdditions.forEach(([selector, markup]) => {
  const target = document.querySelector(selector);
  if (target) target.insertAdjacentHTML('beforeend', markup);
});

const activityGrid = document.querySelector('.activity-grid');
if (activityGrid) activityGrid.insertAdjacentHTML('beforeend', `
  <article class="activity-card golf-card reveal visible"><p class="eyebrow">On the green</p><h3>Golf the island</h3><p>Choose a relaxed 9 holes at the Drummond Island Township Golf Course or a championship round at The Rock.</p><div class="activity-links"><a href="https://www.drummondislandtownship.org/golfcourse" target="_blank" rel="noreferrer">Township Golf Course <b>↗</b></a><a href="https://www.drummondisland.com/michigan-golf-packages" target="_blank" rel="noreferrer">The Rock <b>↗</b></a></div></article>
  <article class="activity-card shop-card reveal visible"><p class="eyebrow">Take a little piece home</p><h3>Shop the island</h3><p>Browse local shops for island essentials, gifts, souvenirs, outdoor gear, and all the little finds that make a trip memorable.</p><a class="text-link" href="https://visitdrummondisland.com/shopping/" target="_blank" rel="noreferrer">Explore local shops <b>↗</b></a></article>
  <article class="activity-card food-card reveal visible"><p class="eyebrow">Come hungry</p><h3>Eat &amp; drink</h3><p>Make room for the TeePee, Northwood, Pins, Esther’s, and the island’s seasonal food trucks.</p><div class="activity-links"><a href="https://www.northwooddrummondisland.com/" target="_blank" rel="noreferrer">Northwood <b>↗</b></a><a href="https://www.drummondisland.com/drummond-islands-restaurants/pins-bar-grills" target="_blank" rel="noreferrer">Pins <b>↗</b></a><a href="https://visitdrummondisland.com/food-drink/" target="_blank" rel="noreferrer">Island dining guide <b>↗</b></a></div></article>
`);

const timelineDestinations = [
  'Northwood Restaurant and Bar, Drummond Island, MI',
  'Drummond Island Lutheran Church, Drummond Island, MI',
  '33492 S Water St, Drummond, MI 49726',
  '33492 S Water St, Drummond, MI 49726',
  'Drummond Island Town Hall, Drummond Island, MI'
];
document.querySelectorAll('.timeline .event').forEach((event, index) => {
  const venue = event.querySelector('p');
  const destination = timelineDestinations[index];
  if (venue && destination) venue.insertAdjacentHTML('afterend', `<a class="directions-link timeline-directions" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}" target="_blank" rel="noreferrer">Directions <b>↗</b></a>`);
});

// Wedding-party profiles: replace the prompts below with each person's real details.
const partyProfiles = [
  { name: 'Alexis Wilkinson', role: 'Matron of Honor', photo: 'portrait-1', connection: 'Add how Alexis knows Jeremy & Mikayla.', favorite: 'Add Alexis’s favorite memory with the couple.', superlative: 'Most likely to…' },
  { name: 'Jordan Scott', role: 'Maid of Honor', photo: 'portrait-2', connection: 'Add how Jordan knows Jeremy & Mikayla.', favorite: 'Add Jordan’s favorite memory with the couple.', superlative: 'Most likely to…' },
  { name: 'Harley Rogers', role: 'Bridesmaid', photo: 'portrait-3', connection: 'Add how Harley knows Jeremy & Mikayla.', favorite: 'Add Harley’s favorite memory with the couple.', superlative: 'Most likely to…' },
  { name: 'Maxwell Scott', role: 'Man of Honor', photo: 'portrait-4', connection: 'Add how Maxwell knows Jeremy & Mikayla.', favorite: 'Add Maxwell’s favorite memory with the couple.', superlative: 'Most likely to…' },
  { name: 'Nick Daleo', role: 'Best Man', photo: 'portrait-5', connection: 'Add how Nick knows Jeremy & Mikayla.', favorite: 'Add Nick’s favorite memory with the couple.', superlative: 'Most likely to…' },
  { name: 'Wendell Kinnaird', role: 'Groomsman', photo: 'portrait-6', connection: 'Add how Wendell knows Jeremy & Mikayla.', favorite: 'Add Wendell’s favorite memory with the couple.', superlative: 'Most likely to…' },
  { name: 'Robert Rogers', role: 'Groomsman', photo: 'portrait-7', connection: 'Add how Robert knows Jeremy & Mikayla.', favorite: 'Add Robert’s favorite memory with the couple.', superlative: 'Most likely to…' },
  { name: 'Daniel Rogers', role: 'Groomsman', photo: 'portrait-8', connection: 'Add how Daniel knows Jeremy & Mikayla.', favorite: 'Add Daniel’s favorite memory with the couple.', superlative: 'Most likely to…' },
  { name: 'Ellie Rogers', role: 'Flower Girl', photo: 'portrait-9', connection: 'Add a sweet note about Ellie.', favorite: 'Add Ellie’s favorite memory or fun fact.', superlative: 'Most likely to scatter the most petals.' },
  { name: 'William Rogers', role: 'Ring Bearer', photo: 'portrait-10', connection: 'Add a sweet note about William.', favorite: 'Add William’s favorite memory or fun fact.', superlative: 'Most likely to guard the rings.' },
  { name: 'Jackson Rogers', role: 'Ring Bearer', photo: 'portrait-11', connection: 'Add a sweet note about Jackson.', favorite: 'Add Jackson’s favorite memory or fun fact.', superlative: 'Most likely to guard the rings.' }
];

const profileDialog = document.createElement('dialog');
profileDialog.className = 'profile-dialog';
document.body.append(profileDialog);
const partyTitle = document.querySelector('.party .section-heading h2');
if (partyTitle) partyTitle.insertAdjacentHTML('afterend', '<p class="party-profile-hint">Click a profile to read more <span>↓</span></p>');
document.querySelectorAll('.party-person').forEach((person, index) => {
  const profile = partyProfiles[index];
  if (!profile) return;
  const portraitLabel = person.querySelector('.portrait span');
  if (portraitLabel) portraitLabel.innerHTML = `<b>${profile.name.split(' ')[0]}</b>${profile.role}`;
  person.tabIndex = 0;
  person.setAttribute('role', 'button');
  person.setAttribute('aria-label', `Open ${profile.name}'s profile`);
  const openProfile = () => {
    profileDialog.innerHTML = `<button class="profile-close" aria-label="Close profile">×</button><div class="profile-photo ${profile.photo}"></div><div class="profile-copy"><p class="eyebrow">${profile.role}</p><h2>${profile.name}</h2><div class="gold-rule"></div><p><b>Part of our story</b>${profile.connection}</p><p><b>Favorite memory</b>${profile.favorite}</p><p><b>Wedding-weekend superlative</b>${profile.superlative || 'Add a playful answer.'}</p></div>`;
    profileDialog.showModal();
    profileDialog.querySelector('.profile-close').focus();
  };
  person.addEventListener('click', openProfile);
  person.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProfile(); }
  });
});
profileDialog.addEventListener('click', event => {
  if (event.target === profileDialog || event.target.closest('.profile-close')) profileDialog.close();
});

const guestbookEndpoint = 'https://script.google.com/macros/s/AKfycbxQqa4qhigfyXWNd8BNbKhKxPNFg3kJgNqUS83sjDx5RglxOoWDTmv_hRuXFfGOEpTXUg/exec';
const guestbookForm = document.querySelector('.guestbook-form');
const guestbookNotes = document.querySelector('.guestbook-notes');

function renderGuestbook(messages = []) {
  if (!guestbookNotes) return;
  guestbookNotes.replaceChildren();
  if (!messages.length) {
    const empty = document.createElement('p');
    empty.className = 'guestbook-empty';
    empty.textContent = 'Be the first to leave us a note.';
    guestbookNotes.append(empty);
    return;
  }
  messages.forEach(({ name, message }) => {
    const note = document.createElement('blockquote');
    const copy = document.createElement('p');
    const author = document.createElement('cite');
    copy.textContent = message;
    author.textContent = name || 'Anonymous';
    note.append(copy, author);
    guestbookNotes.append(note);
  });
}

function loadGuestbook() {
  if (!guestbookNotes) return;
  const callbackName = `guestbookCallback_${Date.now()}`;
  const request = document.createElement('script');
  const cleanup = () => {
    delete window[callbackName];
    request.remove();
  };
  window[callbackName] = data => {
    renderGuestbook(Array.isArray(data.messages) ? data.messages : []);
    cleanup();
  };
  request.onerror = () => {
    guestbookNotes.innerHTML = '<p class="guestbook-empty">Notes are taking a little break. Please try again soon.</p>';
    cleanup();
  };
  request.src = `${guestbookEndpoint}?prefix=${callbackName}`;
  document.head.append(request);
}

if (guestbookForm) guestbookForm.addEventListener('submit', async event => {
  event.preventDefault();
  const button = guestbookForm.querySelector('button');
  const status = guestbookForm.querySelector('.guestbook-status');
  const formData = new FormData(guestbookForm);
  button.disabled = true;
  status.textContent = 'Sending your note…';
  try {
    await fetch(guestbookEndpoint, { method: 'POST', body: new URLSearchParams(formData), mode: 'no-cors' });
    guestbookForm.reset();
    status.textContent = 'Your note was sent with love. Thank you!';
    window.setTimeout(loadGuestbook, 900);
  } catch (error) {
    status.textContent = 'We could not send that note. Please try again.';
  } finally {
    button.disabled = false;
  }
});
loadGuestbook();

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .14 });
document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
