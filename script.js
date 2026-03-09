const sections = Array.from(document.querySelectorAll('.doc-section'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const progressBar = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => sectionObserver.observe(section));

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  {
    rootMargin: '-38% 0px -52% 0px',
    threshold: 0,
  }
);

sections.forEach((section) => activeObserver.observe(section));

function updateProgress() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
  const clamped = Math.max(0, Math.min(100, progress));

  progressBar.style.width = `${clamped}%`;
  progressLabel.textContent = `${Math.round(clamped)}% complete`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const tabGroups = document.querySelectorAll('[data-tabs]');

tabGroups.forEach((group) => {
  const buttons = Array.from(group.querySelectorAll('.tab-btn'));
  const panels = Array.from(group.querySelectorAll('.tab-panel'));

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.tabTarget;

      buttons.forEach((btn) => {
        const isCurrent = btn === button;
        btn.classList.toggle('active', isCurrent);
        btn.setAttribute('aria-selected', String(isCurrent));
      });

      panels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.tabPanel === target);
      });
    });
  });
});

const codeBlocks = document.querySelectorAll('[data-code-block]');

codeBlocks.forEach((block) => {
  const button = block.querySelector('.copy-btn');
  const code = block.querySelector('code');

  button.addEventListener('click', async () => {
    const text = code.innerText;

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
      window.setTimeout(() => {
        button.textContent = 'Copy';
      }, 1200);
    } catch {
      button.textContent = 'Failed';
      window.setTimeout(() => {
        button.textContent = 'Copy';
      }, 1200);
    }
  });
});
