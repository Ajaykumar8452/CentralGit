// ---- mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', false);
}));

// ---- scroll-spy nav ----
const navLinks = document.querySelectorAll('[data-nav]');
const sections = ['about', 'skills', 'projects', 'experience', 'contact']
  .map(id => document.getElementById(id));
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = document.querySelector('[data-nav][href="#' + entry.target.id + '"]');
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => s && spy.observe(s));

// ---- reveal on scroll ----
const reveals = document.querySelectorAll('[data-reveal]');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => revealObs.observe(r));

// ---- skills tabs ----
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.chip-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector('[data-panel="' + btn.dataset.tab + '"]').classList.add('active');
  });
});

// ---- project architecture expand ----
document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = document.getElementById(btn.dataset.expand);
    const open = panel.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.innerHTML = open
      ? 'Hide details <span class="chev">▾</span>'
      : 'View details <span class="chev">▾</span>';
  });
});

// ---- copy email ----
const copyBtn = document.getElementById('copyEmailBtn');
const copyNote = document.getElementById('copyNote');
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(copyBtn.textContent.trim()).then(() => {
    copyNote.classList.add('show');
    setTimeout(() => copyNote.classList.remove('show'), 1800);
  });
});

// ---- contact form -> mailto ----
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
  window.location.href = 'mailto:ajayyadav8452@gmail.com?subject=' + subject + '&body=' + body;
});

// ---- back to top ----
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 500);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---- terminal typing animation ----
const script = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'out', text: 'ajay-yadav — cloud & devops engineer @ wipro' },
  { type: 'prompt', text: '$ aws sts get-caller-identity' },
  { type: 'out', text: '{ "User": "ajay", "Cert": "AWS-SAA", "Base": "Mumbai, IN" }' },
  { type: 'prompt', text: '$ python ec2_cost_optimizer.py --report' },
  { type: 'accent', text: 'Idle instances stopped. Monthly compute cost -30%.' },
  { type: 'prompt', text: '$ terraform apply -auto-approve' },
  { type: 'accent', text: 'Apply complete! Resources: 12 added, 0 changed, 0 destroyed.' },
  { type: 'prompt', text: '$ echo $STATUS' },
  { type: 'out', text: 'open to mid-level cloud / devops roles' },
];
const body = document.getElementById('terminalBody');
let lineIndex = 0, charIndex = 0;
const typeSpeed = 22;

function typeLoop() {
  if (lineIndex >= script.length) {
    setTimeout(() => {
      body.innerHTML = '';
      lineIndex = 0; charIndex = 0;
      typeLoop();
    }, 2600);
    return;
  }
  const current = script[lineIndex];
  if (charIndex === 0) {
    const p = document.createElement('div');
    p.className = 'line ' + current.type;
    p.innerHTML = '<span class="caret"></span>';
    body.appendChild(p);
  }
  const lineEl = body.lastChild;
  charIndex++;
  lineEl.innerHTML = current.text.slice(0, charIndex) + '<span class="caret"></span>';
  if (charIndex < current.text.length) {
    setTimeout(typeLoop, typeSpeed);
  } else {
    lineEl.innerHTML = current.text;
    lineIndex++; charIndex = 0;
    setTimeout(typeLoop, current.type === 'prompt' ? 300 : 550);
  }
}
typeLoop();
