const sections = Array.from(document.querySelectorAll('.doc-section'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const progressBar = document.getElementById('progressBar');

const flowData = {
  idea: {
    title: 'Idea',
    text: 'Define the UX goal: what should the user understand, feel, and do?',
  },
  prompt: {
    title: 'Prompt',
    text: 'Write a clear prompt with goal, context, constraints, and output format.',
  },
  code: {
    title: 'Code',
    text: 'Generate a first draft, then refine structure, spacing, and interactions as a designer.',
  },
  run: {
    title: 'Run',
    text: 'Test on localhost. Save often and validate changes in real time.',
  },
  publish: {
    title: 'Publish',
    text: 'Push to GitHub and deploy so you can share a real URL.',
  },
};

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
    rootMargin: '-42% 0px -50% 0px',
    threshold: 0,
  }
);

sections.forEach((section) => activeObserver.observe(section));

function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
  progressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const flowNodes = Array.from(document.querySelectorAll('.flow-node'));
const flowPanel = document.getElementById('flowPanel');

flowNodes.forEach((node) => {
  const activate = () => {
    const key = node.dataset.flow;
    const content = flowData[key];

    flowNodes.forEach((item) => item.classList.remove('active'));
    node.classList.add('active');

    flowPanel.innerHTML = `<h3>${content.title}</h3><p>${content.text}</p>`;
  };

  node.addEventListener('click', activate);
  node.addEventListener('mouseenter', activate);
});

const codeBlocks = Array.from(document.querySelectorAll('[data-code]'));

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function decorateConsoleLine(line) {
  const trimmed = line.trim();
  if (!trimmed) {
    return '';
  }

  const commentIndex = line.indexOf('#');
  let base = line;
  let comment = '';

  if (commentIndex >= 0) {
    base = line.slice(0, commentIndex).trimEnd();
    comment = line.slice(commentIndex);
  }

  const tokens = base.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) {
    return `<span class="comment">${escapeHtml(comment)}</span>`;
  }

  const [first, ...rest] = tokens;
  const isCommand = /^(git|npm|npx|cd|ls|pwd|code|mkdir|rm)$/i.test(first);
  const firstToken = isCommand ? `<span class="cmd">${escapeHtml(first)}</span>` : escapeHtml(first);
  const restTokens = rest
    .map((token) => {
      if (token.startsWith('-')) {
        return `<span class="flag">${escapeHtml(token)}</span>`;
      }
      if (token.includes('/') || token.includes('.') || token.includes(':')) {
        return `<span class="arg">${escapeHtml(token)}</span>`;
      }
      return escapeHtml(token);
    })
    .join(' ');

  const withComment = comment ? ` <span class="comment">${escapeHtml(comment)}</span>` : '';
  return `${firstToken}${restTokens ? ` ${restTokens}` : ''}${withComment}`;
}

codeBlocks.forEach((block) => {
  const button = block.querySelector('.copy-btn');
  const code = block.querySelector('code');
  const raw = code.textContent || '';
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  code.innerHTML = lines.map((line) => decorateConsoleLine(line)).join('\n');

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.innerText);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Failed';
    }

    window.setTimeout(() => {
      button.textContent = 'Copy';
    }, 1100);
  });
});
