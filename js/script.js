/* =========================================================
   RAFI PORTFOLIO — MAIN SCRIPT
   Vanilla JavaScript only. No external dependencies.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* Safe storage wrapper: file:// pages may block localStorage in some browsers. */
  function storageGet(key, fallback = null) {
    try {
      return window.localStorage.getItem(key) ?? fallback;
    } catch (error) {
      return fallback;
    }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // The portfolio still works when browser storage is unavailable.
    }
  }

  /* ============ 1. LOADING SCREEN ============ */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 500);
  });
  // Fallback in case 'load' fires very fast or is delayed
  setTimeout(() => loadingScreen.classList.add('hidden'), 3000);


  /* ============ 2. HEADER SCROLL STATE ============ */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  function onScroll() {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);
    backToTopBtn.classList.toggle('show', window.scrollY > 500);
    updateActiveNavLink();
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  backToTopBtn.dataset.bound = 'true';


  /* ============ 3. MOBILE HAMBURGER MENU ============ */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navBackdrop = document.getElementById('nav-backdrop');

  function setMobileMenu(isOpen) {
    navLinks.classList.toggle('open', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    navBackdrop.classList.toggle('show', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  }

  hamburger.addEventListener('click', () => {
    setMobileMenu(!navLinks.classList.contains('open'));
  });
  hamburger.dataset.bound = 'true';
  navBackdrop.addEventListener('click', () => setMobileMenu(false));

  // Close mobile menu when a nav link is clicked
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      setMobileMenu(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMobileMenu(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setMobileMenu(false);
  });


  /* ============ 4. ACTIVE NAV LINK ON SCROLL ============ */
  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    let currentId = sections[0] ? sections[0].id : '';
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinkEls.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }


  /* ============ 5. DARK / LIGHT MODE TOGGLE ============ */
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  const THEME_KEY = 'rafi-portfolio-theme';

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    storageSet(THEME_KEY, theme);
  }

  // Load saved theme, or fall back to system preference
  const savedTheme = storageGet(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
  themeToggle.dataset.bound = 'true';


  /* ============ 6. LANGUAGE TOGGLE (JA default / EN) ============ */
  const langToggle = document.getElementById('lang-toggle');
  const langLabel = document.getElementById('lang-label');
  const LANG_KEY = 'rafi-portfolio-lang';
  const i18nEls = document.querySelectorAll('[data-ja]');

  function applyLanguage(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'ja';
    langLabel.textContent = lang === 'en' ? 'EN' : 'JA';

    i18nEls.forEach((el) => {
      const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ja');
      if (text !== null) {
        el.textContent = text;
      }
    });

    storageSet(LANG_KEY, lang);
  }

  const savedLang = storageGet(LANG_KEY, 'ja');
  applyLanguage(savedLang);

  langToggle.addEventListener('click', () => {
    const current = storageGet(LANG_KEY, 'ja');
    applyLanguage(current === 'ja' ? 'en' : 'ja');
  });
  langToggle.dataset.bound = 'true';


  /* ============ 7. TYPING ANIMATION (HERO) ============ */
  const typingTextEl = document.getElementById('typing-text');
  const typingPhrases = {
    ja: [
      'IT専門学校生',
      'エンジニアを目指す学生',
      'Webデベロッパー',
      '問題解決が得意です'
    ],
    en: [
      'IT Student',
      'Aspiring Systems Engineer',
      'Web Developer',
      'Problem Solver'
    ]
  };

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  function getCurrentLang() {
    return storageGet(LANG_KEY, 'ja') === 'en' ? 'en' : 'ja';
  }

  function typeLoop() {
    const lang = getCurrentLang();
    const phrases = typingPhrases[lang];
    const currentPhrase = phrases[phraseIndex % phrases.length];

    if (!isDeleting) {
      charIndex++;
      typingTextEl.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        typingTimeout = setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      typingTextEl.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex++;
      }
    }

    const speed = isDeleting ? 45 : 90;
    typingTimeout = setTimeout(typeLoop, speed);
  }
  typeLoop();

  // Restart typing animation cleanly whenever the language changes
  langToggle.addEventListener('click', () => {
    clearTimeout(typingTimeout);
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typeLoop();
  });


  /* ============ 8. SCROLL REVEAL ANIMATIONS ============ */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ============ 9. PROJECT DETAILS MODAL ============ */
  const projectModal = document.getElementById('project-modal');
  const modalDialog = projectModal.querySelector('.project-modal-dialog');
  const modalImage = document.getElementById('project-modal-image');
  const modalTitle = document.getElementById('project-modal-title');
  const modalTagline = document.getElementById('project-modal-tagline');
  const modalDescription = document.getElementById('project-modal-description');
  const modalExtra = document.getElementById('project-modal-extra');
  const modalTags = document.getElementById('project-modal-tags');
  let lastFocusedElement = null;

  function translatedText(element, lang) {
    if (!element) return '';
    return element.getAttribute(`data-${lang}`) || element.textContent.trim();
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      projectModal.hidden = true;
    }, 180);
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  document.querySelectorAll('.project-details-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.project-card');
      const lang = getCurrentLang();
      const image = card.querySelector('.project-image');
      const title = card.querySelector('.project-title');
      const tagline = card.querySelector('.project-tagline');
      const description = card.querySelector('.project-desc');

      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modalTitle.textContent = title.textContent.trim();
      modalTagline.textContent = translatedText(tagline, lang);
      modalDescription.textContent = translatedText(description, lang);
      modalExtra.textContent = card.getAttribute(`data-details-${lang}`) || '';
      modalTags.innerHTML = '';
      card.querySelectorAll('.project-tags .tag').forEach((tag) => {
        modalTags.appendChild(tag.cloneNode(true));
      });

      lastFocusedElement = button;
      projectModal.hidden = false;
      document.body.classList.add('modal-open');
      requestAnimationFrame(() => {
        projectModal.classList.add('open');
        modalDialog.focus();
      });
    });
  });

  projectModal.querySelectorAll('[data-modal-close]').forEach((element) => {
    element.addEventListener('click', closeProjectModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !projectModal.hidden) closeProjectModal();
  });


  /* ============ 10. CONTACT FORM VALIDATION + WEB3FORMS ============ */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const contactSubmit = document.getElementById('contact-submit');

  function setFieldError(field, show) {
    const group = field.closest('.form-group');
    group.classList.toggle('error', show);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    let valid = true;

    if (!nameField.value.trim()) { setFieldError(nameField, true); valid = false; }
    else { setFieldError(nameField, false); }

    if (!emailField.value.trim() || !isValidEmail(emailField.value.trim())) {
      setFieldError(emailField, true); valid = false;
    } else { setFieldError(emailField, false); }

    if (!subjectField.value.trim()) { setFieldError(subjectField, true); valid = false; }
    else { setFieldError(subjectField, false); }

    if (!messageField.value.trim()) { setFieldError(messageField, true); valid = false; }
    else { setFieldError(messageField, false); }

    const lang = getCurrentLang();

    if (!valid) {
      formStatus.textContent = lang === 'en'
        ? 'Please fill in all required fields correctly.'
        : '必須項目を正しく入力してください。';
      formStatus.className = 'form-status show error';
      return;
    }

    contactSubmit.disabled = true;
    contactSubmit.classList.add('is-sending');
    contactSubmit.textContent = lang === 'en' ? 'Sending...' : '送信中...';
    formStatus.className = 'form-status';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submission failed');
      }

      formStatus.textContent = lang === 'en'
        ? 'Message sent successfully. Thank you!'
        : 'メッセージを送信しました。ありがとうございます！';
      formStatus.className = 'form-status show success';
      contactForm.reset();
    } catch (error) {
      formStatus.textContent = lang === 'en'
        ? 'Message could not be sent. Please try again or email me directly.'
        : '送信できませんでした。もう一度お試しいただくか、メールで直接ご連絡ください。';
      formStatus.className = 'form-status show error';
    } finally {
      contactSubmit.disabled = false;
      contactSubmit.classList.remove('is-sending');
      contactSubmit.textContent = lang === 'en' ? 'Send Message' : '送信する';
    }
  });
  contactForm.dataset.bound = 'true';

  // Clear individual field errors as the user types
  ['name', 'email', 'subject', 'message'].forEach((id) => {
    const field = document.getElementById(id);
    field.addEventListener('input', () => setFieldError(field, false));
  });


  /* ============ 10. AUTOMATIC COPYRIGHT YEAR ============ */
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Lets index.html know that the full external script loaded successfully.
  window.portfolioAppReady = true;

});
