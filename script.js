const destinations = [
  {
    id: 'bir', name: 'Bir', state: 'Himachal Pradesh', mood: ['mountains','adventure'], budget: 5600,
    time: '8–10 hr', best: 'Paragliding + cafés', tag: 'Air & altitude',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=84',
    blurb: 'A tiny mountain reset with ridiculous views, Tibetan cafés and enough paragliding to make Monday feel very far away.',
    itinerary: [['FRI · 20:00','Take the overnight bus north. Download the playlist. Ignore work.'],['SAT · 09:00','Breakfast in Bir, then head for a tandem paragliding flight over the valley.'],['SAT · 16:00','Slow café crawl, monastery walk and sunset from the landing site.'],['SUN · 09:30','Rent a cycle, explore nearby villages, eat one last excellent meal.'],['SUN · 18:00','Start home before you accidentally move here.']]
  },
  {
    id: 'udaipur', name: 'Udaipur', state: 'Rajasthan', mood: ['slow','food'], budget: 7200,
    time: '1.5 hr flight', best: 'Lakes + old city', tag: 'Soft city break',
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1400&q=84',
    blurb: 'Golden light, rooftop dinners and lake views. Udaipur is a weekend that feels much longer than it actually is.',
    itinerary: [['FRI · 19:00','Arrive, drop your bag and find a rooftop table overlooking Lake Pichola.'],['SAT · 08:30','City Palace before the crowds, then wander through the old lanes.'],['SAT · 17:30','Boat ride at golden hour followed by dinner with a view.'],['SUN · 10:00','Lazy brunch, vintage-car museum or café hopping.'],['SUN · 17:00','One last lakeside walk, then head home.']]
  },
  {
    id: 'rishikesh', name: 'Rishikesh', state: 'Uttarakhand', mood: ['adventure','mountains'], budget: 4800,
    time: '5–6 hr', best: 'River + rafting', tag: 'Energy reset',
    image: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?auto=format&fit=crop&w=1400&q=84',
    blurb: 'White-water mornings, river beaches and quiet evening walks. Equal parts adrenaline and exhale.',
    itinerary: [['FRI · 21:00','Late bus out. Arrive early and check into a simple riverside stay.'],['SAT · 09:00','Raft the Ganga, then reward yourself with a giant breakfast.'],['SAT · 16:30','Cross the river, browse cafés and catch the evening aarti.'],['SUN · 08:00','Short waterfall hike before the heat arrives.'],['SUN · 15:30','Lunch, river time, then begin the ride back.']]
  },
  {
    id: 'pondicherry', name: 'Pondicherry', state: 'Puducherry', mood: ['slow','food'], budget: 8800,
    time: '3 hr from Chennai', best: 'Sea + bakeries', tag: 'Coastal slow-down',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=84',
    blurb: 'Pastel streets, sea air, excellent bakeries and a pace that actively refuses your usual schedule.',
    itinerary: [['FRI · 20:30','Reach the French Quarter and take a late promenade walk.'],['SAT · 08:00','Cycle through White Town, stopping anywhere that smells like coffee.'],['SAT · 15:00','Auroville detour, then back to town for dinner.'],['SUN · 06:30','Sunrise at Rock Beach followed by a very unhurried breakfast.'],['SUN · 14:00','Shop small, eat well, start back before evening.']]
  },
  {
    id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', mood: ['food','adventure'], budget: 6500,
    time: '1 hr flight / train', best: 'Food + forts', tag: 'Full-colour weekend',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=84',
    blurb: 'A maximalist weekend: forts in the morning, bazaars in the afternoon and kachori whenever the situation demands it.',
    itinerary: [['FRI · 19:00','Check in near the old city and go directly to dinner.'],['SAT · 07:30','Amber Fort early, then Panna Meena ka Kund before noon.'],['SAT · 14:00','Old-city food crawl and bazaar wandering.'],['SUN · 08:30','Hawa Mahal, coffee, then Albert Hall or Nahargarh.'],['SUN · 17:00','Pick up sweets for home and leave on a sugar high.']]
  },
  {
    id: 'coorg', name: 'Coorg', state: 'Karnataka', mood: ['mountains','slow'], budget: 7600,
    time: '5 hr from Bengaluru', best: 'Coffee + rain', tag: 'Green mode',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1400&q=84',
    blurb: 'Coffee estates, wet roads, forest air and a phone signal just unreliable enough to improve your personality.',
    itinerary: [['FRI · 18:30','Drive out after work, reach your homestay late and sleep hard.'],['SAT · 08:30','Estate breakfast followed by a guided coffee plantation walk.'],['SAT · 15:30','Abbey Falls and a slow scenic drive with unnecessary stops.'],['SUN · 07:30','Misty viewpoint, local breakfast and zero urgency.'],['SUN · 14:30','Buy coffee beans, begin the drive back.']]
  }
];

const state = { mood: 'all', budget: 'all', saved: new Set(JSON.parse(localStorage.getItem('escape-saved') || '[]')) };
const grid = document.getElementById('destinationGrid');
const emptyState = document.getElementById('emptyState');
const resultCount = document.getElementById('resultCount');
const savedCount = document.getElementById('savedCount');
const drawer = document.getElementById('tripDrawer');
const drawerContent = document.getElementById('drawerContent');
const scrim = document.getElementById('scrim');
const toast = document.getElementById('toast');
let toastTimer;

function money(value) { return new Intl.NumberFormat('en-IN').format(value); }

function renderDestinations() {
  const filtered = destinations.filter(d => {
    const moodMatch = state.mood === 'all' || d.mood.includes(state.mood);
    const budgetMatch = state.budget === 'all' || d.budget <= Number(state.budget);
    return moodMatch && budgetMatch;
  });

  resultCount.textContent = filtered.length;
  emptyState.hidden = filtered.length !== 0;
  grid.innerHTML = filtered.map((d, index) => `
    <article class="destination-card" data-id="${d.id}" tabindex="0" aria-label="Open ${d.name} weekend plan" style="animation-delay:${index * 50}ms">
      <div class="card-image-wrap">
        <div class="card-topline">
          <span class="tag">${d.tag}</span>
          <button class="save-button ${state.saved.has(d.id) ? 'saved' : ''}" data-save="${d.id}" aria-label="${state.saved.has(d.id) ? 'Remove from' : 'Save to'} saved trips">${state.saved.has(d.id) ? '♥' : '♡'}</button>
        </div>
        <img src="${d.image}" alt="${d.name}, ${d.state}" loading="lazy" />
      </div>
      <div class="card-copy">
        <div><h3>${d.name}</h3><p>${d.state} · ${d.time}</p></div>
        <span class="price">≈ ₹${money(d.budget)}</span>
      </div>
    </article>
  `).join('');
  updateSavedCount();
}

function updateSavedCount() { savedCount.textContent = state.saved.size; }
function persistSaved() { localStorage.setItem('escape-saved', JSON.stringify([...state.saved])); updateSavedCount(); }

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function toggleSave(id) {
  const d = destinations.find(item => item.id === id);
  if (state.saved.has(id)) { state.saved.delete(id); showToast(`${d.name} removed from saved.`); }
  else { state.saved.add(id); showToast(`${d.name} saved for later.`); }
  persistSaved();
  renderDestinations();
}

function openDrawer(id) {
  const d = destinations.find(item => item.id === id);
  if (!d) return;
  drawerContent.innerHTML = `
    <img class="drawer-image" src="${d.image}" alt="${d.name}, ${d.state}" />
    <div class="drawer-body">
      <span class="drawer-kicker">48-hour field note · ${d.state}</span>
      <h2 id="drawerTitle">${d.name}</h2>
      <p class="drawer-intro">${d.blurb}</p>
      <div class="drawer-meta">
        <div><span>Getting there</span><strong>${d.time}</strong></div>
        <div><span>Budget</span><strong>≈ ₹${money(d.budget)}</strong></div>
        <div><span>Go for</span><strong>${d.best}</strong></div>
      </div>
      <div class="itinerary">
        <h3>Steal this weekend</h3>
        ${d.itinerary.map(row => `<div class="timeline-row"><time>${row[0]}</time><p>${row[1]}</p></div>`).join('')}
      </div>
      <button class="drawer-action" data-drawer-save="${d.id}">${state.saved.has(d.id) ? '♥ Saved — keep dreaming' : '♡ Save this escape'}</button>
    </div>`;
  scrim.hidden = false;
  requestAnimationFrame(() => {
    scrim.classList.add('visible'); drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); document.body.classList.add('drawer-open');
  });
  document.getElementById('drawerClose').focus();
}

function closeDrawer() {
  drawer.classList.remove('open'); scrim.classList.remove('visible'); drawer.setAttribute('aria-hidden','true'); document.body.classList.remove('drawer-open');
  setTimeout(() => { scrim.hidden = true; }, 320);
}

document.addEventListener('click', e => {
  const filter = e.target.closest('[data-filter]');
  if (filter) {
    const group = filter.closest('.chip-row');
    group.querySelectorAll('.chip').forEach(chip => chip.classList.remove('active'));
    filter.classList.add('active');
    state[filter.dataset.filter] = filter.dataset.value;
    renderDestinations();
    return;
  }
  const save = e.target.closest('[data-save]');
  if (save) { e.stopPropagation(); toggleSave(save.dataset.save); return; }
  const drawerSave = e.target.closest('[data-drawer-save]');
  if (drawerSave) { toggleSave(drawerSave.dataset.drawerSave); openDrawer(drawerSave.dataset.drawerSave); return; }
  const card = e.target.closest('.destination-card');
  if (card) openDrawer(card.dataset.id);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  const card = e.target.closest?.('.destination-card');
  if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openDrawer(card.dataset.id); }
});

document.getElementById('drawerClose').addEventListener('click', closeDrawer);
scrim.addEventListener('click', closeDrawer);

document.getElementById('resetFilters').addEventListener('click', () => {
  state.mood = 'all'; state.budget = 'all';
  document.querySelectorAll('.chip-row').forEach(row => { row.querySelectorAll('.chip').forEach((chip, i) => chip.classList.toggle('active', i === 0)); });
  renderDestinations();
});

document.getElementById('savedLink').addEventListener('click', () => {
  const savedTrips = destinations.filter(d => state.saved.has(d.id));
  if (!savedTrips.length) { showToast('Save an escape first — future you will thank you.'); return; }
  openDrawer(savedTrips[0].id);
});

document.getElementById('menuButton').addEventListener('click', e => {
  const btn = e.currentTarget;
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  btn.textContent = open ? 'Menu' : 'Discover ↓';
  if (!open) document.getElementById('discover').scrollIntoView({behavior:'smooth'});
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

renderDestinations();
