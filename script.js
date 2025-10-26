// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const list = document.getElementById('nav-list');
if (toggle && list) {
  toggle.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      list && list.classList.remove('open');
      toggle && toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Basic coach demo logic (rule-based)
const chat = document.getElementById('chat');
const form = document.getElementById('form');
const mealInput = document.getElementById('meal');
const goalSel = document.getElementById('goal');

function coachResponse(meal, goal) {
  meal = meal.toLowerCase();
  const out = [];

  if (!/(chicken|egg|yogurt|tofu|fish|bean|lentil|paneer|nuts|paneer)/.test(meal))
    out.push('Consider adding a protein (eggs, yogurt, beans, chicken) to stay fuller.');
  else out.push('Nice protein — great for satiety and recovery.');

  if (/(apple|banana|veg|broccoli|spinach|salad|fruit|oat|quinoa|brown rice|millet)/.test(meal))
    out.push('Fiber/plant points earned — steady energy.');
  else out.push('Add a fruit/veg or whole grain for fiber.');

  if (/(soda|cola|cookie|cake|dessert|ice cream|candy|juice)/.test(meal))
    out.push('Sweet treat detected — pair with protein/fiber to smooth the spike.');

  if (goal === 'energize') out.push('Goal: Energize → balance carbs + protein, hydrate.');
  if (goal === 'lean') out.push('Goal: Lean → prioritize protein + veg, watch refined carbs.');
  if (goal === 'build') out.push('Goal: Build → target ~25–35g protein at this meal.');

  out.push('You’ve got this. Small steps add up!');
  return out.join(' ');
}

if (form && chat && mealInput && goalSel) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const meal = mealInput.value.trim();
    const goal = goalSel.value;
    if (!meal) return;

    const you = document.createElement('div');
    you.className = 'msg you';
    you.textContent = meal;
    chat.appendChild(you);

    const coach = document.createElement('div');
    coach.className = 'msg coach';
    coach.textContent = coachResponse(meal, goal);
    chat.appendChild(coach);

    chat.scrollTop = chat.scrollHeight;
    mealInput.value = '';
    localStorage.setItem('lastGoal', goal);
  });

  // restore last chosen goal
  const last = localStorage.getItem('lastGoal');
  if (last) goalSel.value = last;
}

// Clear local demo data
const clearBtn = document.getElementById('clear-storage');
if (clearBtn) clearBtn.addEventListener('click', () => {
  localStorage.clear();
  if (chat) chat.innerHTML = '<div class="msg coach">Local data cleared. Try typing another meal!</div>';
});

// Fake contact form (no backend yet)
const contactForm = document.getElementById('contact-form');
const status = document.getElementById('contact-status');
if (contactForm && status) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Thanks! Your message is saved locally for now.';
    setTimeout(() => { status.textContent = ''; }, 4000);
  });
}
