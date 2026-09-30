// All interactions work without a framework or build step.
(() => {
  'use strict';
  const root = document.getElementById('sara-direction');
  if (!root) return;
  root.classList.add('js-enabled');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const themeButton = root.querySelector('.sd-theme');
  const themeLabel = themeButton.querySelector('.sd-theme-label');
  const applyTheme = theme => {
    const night = theme === 'night';
    root.dataset.theme = night ? 'night' : 'day';
    themeButton.setAttribute('aria-pressed', String(night));
    themeButton.setAttribute('aria-label', night ? 'Switch to day theme' : 'Switch to night theme');
    themeLabel.textContent = night ? 'Day theme' : 'Night theme';
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = night ? '#101d33' : '#f5efe5';
    // Storage is optional: themes still work in restricted preview frames.
    try { localStorage.setItem('sara-portfolio-theme', root.dataset.theme); } catch {}
  };
  let savedTheme = 'day';
  try { savedTheme = localStorage.getItem('sara-portfolio-theme') || 'day'; } catch {}
  applyTheme(savedTheme);
  themeButton.addEventListener('click', () => applyTheme(root.dataset.theme === 'night' ? 'day' : 'night'));
  const menu = root.querySelector('.sd-menu');
  const navigation = root.querySelector('.sd-navlinks');
  const closeMenu = () => {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  };
  menu.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded));
    menu.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !expanded);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });

  const reveals = root.querySelectorAll('.reveal');
  let revealObserver;
  if ('IntersectionObserver' in window && !preference.matches) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    root.classList.add('motion-ready');
    reveals.forEach((element, index) => {
      if (element.classList.contains('sd-skill')) {
        element.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
      }
      revealObserver.observe(element);
    });
  }
  preference.addEventListener('change', event => {
    if (event.matches) {
      root.classList.remove('motion-ready');
      revealObserver?.disconnect();
    }
  });

  const progress = root.querySelector('.sd-progress');
  let scrollFrame = false;
  const updateProgress = () => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
    scrollFrame = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollFrame) {
      scrollFrame = true;
      window.requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  const portrait = root.querySelector('.sd-photoarea');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let portraitFrame = 0;
  portrait.addEventListener('pointermove', event => {
    if (preference.matches || !finePointer.matches) return;
    const bounds = portrait.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cancelAnimationFrame(portraitFrame);
    portraitFrame = requestAnimationFrame(() => {
      portrait.style.setProperty('--portrait-x', `${x * 12}px`);
      portrait.style.setProperty('--portrait-y', `${y * 12}px`);
      portrait.style.setProperty('--portrait-angle', `${x * 3}deg`);
    });
  });
  portrait.addEventListener('pointerleave', () => {
    cancelAnimationFrame(portraitFrame);
    portrait.style.setProperty('--portrait-x', '0px');
    portrait.style.setProperty('--portrait-y', '0px');
    portrait.style.setProperty('--portrait-angle', '0deg');
  });

  // Small pointer-driven effects; essential content never depends on hover.
  root.querySelectorAll('.sd-skill').forEach(tile => {
    let frame = 0;
    tile.addEventListener('pointermove', event => {
      if (preference.matches || !finePointer.matches) return;
      const rect = tile.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        tile.style.setProperty('--spot-x', `${x * 100}%`);
        tile.style.setProperty('--spot-y', `${y * 100}%`);
        tile.style.setProperty('--tilt-x', `${(0.5 - y) * 7}deg`);
        tile.style.setProperty('--tilt-y', `${(x - 0.5) * 7}deg`);
      });
    });
    tile.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      tile.style.setProperty('--tilt-x', '0deg');
      tile.style.setProperty('--tilt-y', '0deg');
    });
  });
  root.querySelectorAll('.sd-action').forEach(button => {
    let frame = 0;
    button.addEventListener('pointermove', event => {
      if (preference.matches || !finePointer.matches) return;
      const rect = button.getBoundingClientRect();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        button.style.setProperty('--magnetic-x', `${(event.clientX - rect.left - rect.width / 2) * 0.12}px`);
        button.style.setProperty('--magnetic-y', `${(event.clientY - rect.top - rect.height / 2) * 0.12}px`);
      });
    });
    button.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      button.style.setProperty('--magnetic-x', '0px');
      button.style.setProperty('--magnetic-y', '0px');
    });
  });
})();
