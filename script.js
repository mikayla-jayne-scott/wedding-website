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

const landingPageImages = [
  'photos/LandingPageImages/web/Mikayla+Jeremy-102.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-112.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-114.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-118.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-129.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-142.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-153.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-27.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-63.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-67.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-86.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-91.jpg',
  'photos/LandingPageImages/web/Mikayla+Jeremy-99.jpg'
];
const heroSlides = [...document.querySelectorAll('.hero-slide')];

if (heroSlides.length === 2 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let activeSlide = 0;
  let imageIndex = 0;
  let isLoading = false;

  setInterval(() => {
    if (document.hidden || isLoading) return;
    isLoading = true;
    const nextImageIndex = (imageIndex + 1) % landingPageImages.length;
    const nextSlide = activeSlide === 0 ? 1 : 0;
    const image = new Image();

    image.addEventListener('load', () => {
      heroSlides[nextSlide].style.backgroundImage = `url('${landingPageImages[nextImageIndex]}')`;
      heroSlides[nextSlide].classList.add('is-active');
      heroSlides[activeSlide].classList.remove('is-active');
      activeSlide = nextSlide;
      imageIndex = nextImageIndex;
      isLoading = false;
    }, { once: true });

    image.addEventListener('error', () => { isLoading = false; }, { once: true });

    image.src = landingPageImages[nextImageIndex];
  }, 4000);
}

document.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', () => {
  const flipped = card.classList.toggle('is-flipped');
  card.setAttribute('aria-pressed', String(flipped));
}));

const initialAdventures = [
  ['Kayla\'s Graduation', 'After years of research and hard work Kayla finally graduated with her Doctorate of Engineering. We celebrated in Washington DC this past May.', 'photos/Adventures/Graduation.jpeg', '3 / 4'],
  ['Spain', 'Spain was an absolute dream, although Jeremy almost did cause an international incident on a bike. Ask Jordan about it!', 'photos/Adventures/Barcelona.jpeg', '1932 / 1626'],
  ['Hiking at Home', 'Just north of us there are some great trails to explore especially in the fall when the leaves are changing. Rex almost pulled Jeremy down the mountain, he\'s a better hiker than the both of us.', 'photos/Adventures/Hiking.jpeg', '4 / 3'],
  ['Skiing', 'Jeremy learned how to ski! He\'s a natural, literally skiied into the rental return.', 'photos/Adventures/Skiing.jpeg', '3 / 4'],
  ['Mackinac Island', 'Every summer we bike the island, we even took Scott and Karla with us one year! This year we skipped the biking and swapped it for engagement photos.', 'photos/Adventures/MackinacIsland.jpeg', '1812 / 1536'],
  ['Drummond Island', 'We spend a lot of time on Drummond Island, exploring the trails, enjoying the lake and being around family! Ask Scott about the Tank Traps!', 'photos/Adventures/OffRoading.jpeg', '3 / 4']
];
document.querySelectorAll('.memory-card').forEach((card, index) => {
  const [title, memory, image, ratio] = initialAdventures[index] || [];
  if (!image) return;

  card.style.setProperty('--card-ratio', ratio);
  card.querySelector('.memory-front').insertAdjacentHTML('afterbegin', `<img class="memory-photo" src="${image}" alt="${title}">`);
  card.querySelector('.memory-back b').textContent = title;
  card.querySelector('.memory-back small').textContent = memory;
});

const extraAdventures = [
  ['Turks & Caicos', 'Nothing like the crystal-clear waters and pristine beaches to celebrate Jeremy\'s 30th birthday!', 'photos/Adventures/TurksAndCaicos.jpeg', '4 / 3'],
  ['Saint John', 'We (+Nana) went snorkeling at the Virgin Islands National Park Underwater Snorkeling Trail. After a sketchy taxi ride we saw the most incredible fish, boats and views.', 'photos/Adventures/Snorkeling.png', '1504 / 1113'],
  ['St. Thomas', 'If there is one thing you can count on, Kayla will get a picutre of the sun setting! This past year the sunset over the caribbean was absolutely breathtaking.', 'photos/Adventures/Carribbean.jpeg', '4 / 3'],
  ['Christmas', 'Every year we spend christmas on the island then head down to St. Louis to be with the Roger\'s fam!', 'photos/Adventures/Christmas.jpeg', '4 / 3'],
  ['Lisbon', 'Lisbon was seven hills of wonder, great views, peacocks and castles. The hills are not for the weak. We absolutely loved it! This is probably our favorite place we have been thus far.', 'photos/Adventures/Lisbon.jpeg', '3 / 4'],
  ['Rome', 'We think this had to be the hottest day in existance, the tar was melting through the streets! We made it to the Trevi Fountain and even ate at the McDonald\'s in Vatican. The french fries tasted the same.', 'photos/Adventures/Rome.jpeg', '4 / 3'],
  ['Puerto Rico', 'Peurto Rico is one of our most recent adventures, Jeremy even saw a dolphin!', 'photos/Adventures/PuertoRico.jpeg', '3 / 4'],
  ['University of Michigan', 'Kayla\'s family may have converted Jeremy into a Wolverine (Like it took that much convincing) after one trip to the big house he was sold.', 'photos/Adventures/UniversityOfMichigan.jpeg', '2041 / 1439'],
  ['Amalfi Coast', 'We took a train up the almafi coast and had the best gelato and focaccia ever! Jeremy asks that you don\'t ask about his nightmare haircut, he knows it was atrocious.', 'photos/Adventures/AlmalfiCoast.jpeg', '992 / 792'],
  ['Snowshoeing', 'After a certain number of months of being snowed in, we finally hit the trails.', 'photos/Adventures/SnowShoeing.png', '3 / 4'],
  ['Studying', 'A lot of our nights over the years have been filled with learning, writing, and napping. Jeremy and Rex are often found in this exact spot.', 'photos/Adventures/Studying.jpeg', '4 / 3']
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

const airportList = document.querySelector('.airport-list');
const airportOrder = ['CIU', 'YAM', 'PLN', 'TVC', 'DTW'];
if (airportList) {
  const airportsByCode = new Map(
    [...airportList.children].map(airport => [airport.querySelector('b').textContent, airport])
  );
  airportOrder.forEach(code => airportList.append(airportsByCode.get(code)));
}

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
  ['.orv-card .activity-links', '<a href="https://visitdrummondisland.com/wp-content/uploads/2026/03/44777_Map_hires.pdf" target="_blank" rel="noreferrer">ORV trail map <b>↗</b></a><a href="https://beaversondi.com/index.html" target="_blank" rel="noreferrer">ATV rentals <b>↗</b></a>'],
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

const dinnerMenuDialog = document.createElement('dialog');
dinnerMenuDialog.className = 'dinner-menu-dialog';
dinnerMenuDialog.innerHTML = `
  <button class="dinner-menu-close" type="button" aria-label="Close dinner menu">×</button>
  <div class="dinner-menu-copy">
    <p class="eyebrow">Saturday evening</p>
    <h2>Dinner Menu</h2>
    <div class="gold-rule"></div>
    <p>Check back closer to the celebration to see what will be served.</p>
    <p class="dinner-caterer">A farm-to-table dinner thoughtfully prepared by <a href="https://www.jerefarms.com/" target="_blank" rel="noreferrer">Jere Farms <b>↗</b></a></p>
  </div>`;
document.body.append(dinnerMenuDialog);

const receptionEvent = document.querySelectorAll('.timeline .event')[3];
if (receptionEvent) {
  receptionEvent.querySelector('div').insertAdjacentHTML('beforeend', '<button class="directions-link timeline-directions playlist-link dinner-menu-trigger" type="button">View dinner menu <b>↗</b></button>');
  receptionEvent.querySelector('.dinner-menu-trigger').addEventListener('click', () => {
    dinnerMenuDialog.showModal();
    dinnerMenuDialog.querySelector('.dinner-menu-close').focus();
  });
}

dinnerMenuDialog.addEventListener('click', event => {
  if (event.target === dinnerMenuDialog || event.target.closest('.dinner-menu-close')) dinnerMenuDialog.close();
});

// Wedding-party profiles: replace the prompts below with each person's real details.
const partyProfiles = [
  { name: 'Alexis Wilkinson', role: 'Matron of Honor', photo: 'portrait-1', connection: 'Lexi is Kayla\'s oldest sister.', About: 'Lexi lives in Michigan with her husband Max and dog Luna. She enjoys reading, hiking and cooking. Lexi\'s DnD character is an Elven Princess Warrior named Elara, and is the hostest with the mostest when it comes to game nights.', superlative: 'Most likely to break her shoe' },
  { name: 'Jordan Scott', role: 'Maid of Honor', photo: 'portrait-2', connection: 'Jordan is Kayla\'s youngest sister.', About: 'Jordan lives in Arizona with her long time boyfriend Jake. She enjoys pilates, water skiing, boating and being at the lake. Jordan is a chicken connoisseur, ask her about it.', superlative: 'Most likely to be hysterically crying throughout the day' },
  { name: 'Maxwell Scott', role: 'Man of Honor', photo: 'portrait-3', connection: 'Max is Kayla\'s brother.', About: 'Max is a senior at Eastern Michigan University where he studies Business Education. He enjoys talking sports, gaming, golfing and playing cards. Don\'t touch his cards.', superlative: 'Most likely to spill his drink on you' },
  { name: 'Harley Rogers', role: 'Bridesmaid', photo: 'portrait-4', connection: 'Harley is Jeremy\'s sister.', About: 'Harley lives in Illinois with her dog Echo. She enjoys photography, talking about animals, and has a purple truck. Harley has an awesome collection of Harley Davidson patches!', superlative: 'Most likely to be prepared for any situation' },
  { name: 'Nick Daleo', role: 'Best Man', photo: 'portrait-5', connection: 'Nick is one of Jeremy\'s best friends.', About: 'Nick lives in Missouri. Nick enjoys gaming, watching movies, going to concerts and traveling.', superlative: 'Most likely to play "bangers" on any sound system he can find' },
  { name: 'Wendell Kinnaird', role: 'Groomsman', photo: 'portrait-6', connection: 'Wendell is one of Jermy\'s best friends.', About: 'Wendell lives in California with his long time girlfriend Ami. Wendell enjoys gaming, disc golf, and snowboarding. Wendell and Jeremy share a love for smoking food!', superlative: 'Most get a sun burn before the wedding' },
  { name: 'Robert Rogers', role: 'Groomsman', photo: 'portrait-7', connection: 'Robert is Jeremy\'s oldest brother.', About: 'Robert lives in Missouri with his three children Ellie, William and Jackson. Robert enjoys gaming, watching movies, reading and cooking. Robert has been planning his reception entrance for over a year!', superlative: 'Most likely to "cut a rug" on the dance floor' },
  { name: 'Daniel Rogers', role: 'Groomsman', photo: 'portrait-8', connection: 'Daniel is Jeremy\'s brother.', About: 'Daniel lives in Missouri with his wife Ida and dog Zeke. Daniel enjoys gaming, working out and scuba diving. Daniel plans to dive around the Island leading up to the wedding!', superlative: 'Most likely to end up swimming at the reception' },
  { name: 'Ellie Rogers', role: 'Flower Girl', photo: 'portrait-9', connection: 'Ellie is Jeremy\'s niece.', About: 'Ellie is heading into middle school! Ellie loves squishies, slime, roblox and axolotls. ', superlative: 'Most likely to scatter the most petals.' },
  { name: 'William Rogers', role: 'Ring Bearer', photo: 'portrait-10', connection: 'William is Jeremy\'s nephew.', About: 'William is Jackson\'s identical twin. Will loves monster trucks, spiderman and playing roblox.', superlative: 'Most likely to guard the rings.' },
  { name: 'Jackson Rogers', role: 'Ring Bearer', photo: 'portrait-11', connection: 'Jackson is Jeremy\'s nephew.', About: 'Jackson is William\'s identical twin. Jackson loves monster trucks, spiderman and playing roblox.', superlative: 'Most likely to guard the rings.' }
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
    profileDialog.innerHTML = `<button class="profile-close" aria-label="Close profile">×</button><div class="profile-photo ${profile.photo}"></div><div class="profile-copy"><p class="eyebrow">${profile.role}</p><h2>${profile.name}</h2><div class="gold-rule"></div><p><b>How we know them</b>${profile.connection}</p><p><b>About</b>${profile.About}</p><p><b>Wedding-weekend superlative</b>${profile.superlative || 'Add a playful answer.'}</p></div>`;
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
