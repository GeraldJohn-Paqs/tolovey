/* ================================================================
   THE GARDEN OF YOU — interactions
   ================================================================ */
(function () {
  'use strict';

  /* ----- DOM CACHE ----- */
  const $ = (id) => document.getElementById(id);
  const body = document.body;

  const heartsLayer  = $('heartsLayer');
  const petalsLayer  = $('petalsLayer');
  const sparklesLayer = $('sparklesLayer');

  const sceneIntro   = $('sceneIntro');
  const sceneInvite  = $('sceneInvite');
  const sceneMessage = $('sceneMessage');
  const scenePeek    = $('scenePeek');
  const sceneBouquet = $('sceneBouquet');
  const messageCountdown = $('messageCountdown');
  const countdownDigit   = $('countdownDigit');
  const countdownDigit2  = $('countdownDigit2');
  const peekButton       = $('peekButton');
  const peekStage        = $('peekStage');
  const letterOverlay = $('letterOverlay');
  const letterCard   = $('letterCard');
  const letterClose  = $('letterClose');
  const letterBackdrop = $('letterBackdrop');

  const beginButton  = $('beginButton');
  const ctaButton    = $('ctaButton');
  const bouquetEnvelope = $('bouquetEnvelope');

  const bouquetNote      = $('bouquetNote');
  const bouquetCat       = $('bouquetCat');
  const bouquetImageWrap = $('bouquetImageWrap');

  const musicPlayer  = $('musicPlayer');
  const mpAudio      = $('mpAudio');
  const mpProgress   = $('mpProgress');
  const mpProgressFill = $('mpProgressFill');
  const mpVolume     = $('mpVolume');
  const mpHeart      = $('mpHeart');

  const messageLine1 = $('messageLine1');
  const messageLine2 = $('messageLine2');

  /* ----- CONFIG ----- */
  const HEART_COUNT = 60;
  const PETAL_COUNT = 24;
  const SPARKLE_COUNT = 14;

  const PETAL_PALETTE = [
    '#f4a8b6', '#d97a8a', '#e8b4b4', '#cf9595',
    '#f4c8cf', '#d4a5a5', '#fae1e5', '#c98888',
    '#e8a4a4', '#b55868', '#f0bcbc', '#dca0a0',
    '#c9a878', '#e8d4b6', '#a8a098'
  ];

  const SPARKLE_COLOR = '#c9a878';

  /* ================================================================
     AMBIENT — floating hearts, petals & sparkles
     ================================================================ */
  function spawnHearts() {
    // Soft, dusty rose tones — gentle on the warm cream
    const palette = [
      '#d4a5a5', '#c98888', '#e0b0b0', '#b87878',
      '#e8b4b4', '#cf9595', '#d9a3a3', '#c47e7e',
      '#f4a8b6', '#d97a8a', '#b55868'
    ];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < HEART_COUNT; i++) {
      const el = document.createElement('span');
      el.className = 'heart-float';
      el.setAttribute('aria-hidden', 'true');

      const size = 10 + Math.random() * 18;          // 10–28px
      const left = Math.random() * 100;
      const duration = 12 + Math.random() * 18;      // 12–30s
      const delay = -Math.random() * 30;
      const drift = (Math.random() - 0.5) * 180;     // -90 to 90 px
      const rotation = (Math.random() - 0.5) * 90;  // -45° to 45°
      const opacity = 0.18 + Math.random() * 0.18;  // 0.18–0.36 (subtle, doesn't crowd text)
      const color = palette[Math.floor(Math.random() * palette.length)];

      el.style.left = left + 'vw';
      el.style.setProperty('--drift', drift + 'px');
      el.style.setProperty('--rotation', rotation + 'deg');
      el.style.setProperty('--heart-opacity', opacity.toFixed(2));
      el.style.animation = `heart-rise ${duration.toFixed(2)}s linear ${delay.toFixed(2)}s infinite`;

      el.innerHTML =
        '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + color + '">' +
          '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>' +
        '</svg>';
      fragment.appendChild(el);
    }
    heartsLayer.appendChild(fragment);
  }

  function spawnPetals() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < PETAL_COUNT; i++) {
      const el = document.createElement('span');
      el.className = 'petal';
      el.setAttribute('aria-hidden', 'true');

      const size = 8 + Math.random() * 16;
      const left = Math.random() * 100;
      const duration = 14 + Math.random() * 18;
      const delay = -Math.random() * 32;
      const drift = (Math.random() - 0.5) * 200;
      const rotation = (Math.random() - 0.5) * 540;
      const opacity = 0.30 + Math.random() * 0.45;
      const color = PETAL_PALETTE[Math.floor(Math.random() * PETAL_PALETTE.length)];

      el.style.left = left + 'vw';
      el.style.setProperty('--drift', drift + 'px');
      el.style.setProperty('--rotation', rotation + 'deg');
      el.style.setProperty('--petal-opacity', opacity.toFixed(2));
      el.style.animation = `petal-rise ${duration.toFixed(2)}s linear ${delay.toFixed(2)}s infinite`;

      // Use a softer floral shape — a teardrop
      el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}"><path d="M12 2 C 17 5, 18 13, 12 22 C 6 13, 7 5, 12 2 Z"/></svg>`;
      fragment.appendChild(el);
    }
    petalsLayer.appendChild(fragment);
  }

  function spawnSparkles() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const el = document.createElement('span');
      el.className = 'sparkle';
      el.setAttribute('aria-hidden', 'true');

      const size = 6 + Math.random() * 10;
      const left = Math.random() * 100;
      const top  = Math.random() * 100;
      const duration = 2.4 + Math.random() * 3.2;
      const delay = -Math.random() * 5;
      const opacity = 0.4 + Math.random() * 0.5;

      el.style.left = left + 'vw';
      el.style.top  = top + 'vh';
      el.style.setProperty('--sparkle-opacity', opacity.toFixed(2));
      el.style.animation = `sparkle-twinkle ${duration.toFixed(2)}s ease-in-out ${delay.toFixed(2)}s infinite`;

      el.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${SPARKLE_COLOR}">
          <path d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z" />
        </svg>
      `;
      fragment.appendChild(el);
    }
    sparklesLayer.appendChild(fragment);
  }

  /* ================================================================
     BURSTS — hearts / petals on click
     ================================================================ */
  function spawnBurst(cx, cy, count, palette, isPetal) {
    const shapePath = isPetal
      ? '<path d="M12 2 C 17 5, 18 13, 12 22 C 6 13, 7 5, 12 2 Z"/>'
      : '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>';

    for (let i = 0; i < count; i++) {
      const b = document.createElement('span');
      b.className = 'burst';
      const size = 8 + Math.random() * 14;
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const dist = 80 + Math.random() * 80;
      const bx = Math.cos(angle) * dist;
      const by = Math.sin(angle) * dist;
      const rot = (Math.random() - 0.5) * 360;
      const color = palette[Math.floor(Math.random() * palette.length)];

      b.style.left = cx + 'px';
      b.style.top  = cy + 'px';
      b.style.setProperty('--bx', bx + 'px');
      b.style.setProperty('--by', by + 'px');
      b.style.setProperty('--br', rot + 'deg');

      b.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">${shapePath}</svg>`;

      body.appendChild(b);
      b.addEventListener('animationend', () => b.remove(), { once: true });
    }
  }

  function spawnPetalCascade(cx, cy) {
    spawnBurst(cx, cy, 24, PETAL_PALETTE, true);
  }

  function spawnHeartBurst(cx, cy) {
    const palette = ['#d97a8a', '#f4a8b6', '#d4a5a5', '#b55868', '#e8b4b4', '#c98888'];
    spawnBurst(cx, cy, 14, palette, false);
  }

  /* ================================================================
     MUSIC PLAYER
     ================================================================ */
  let userInteracted = false;

  // Always resumes/plays the song. Safe to call on every play-button press.
  function playAudio() {
    try { mpAudio.volume = 1; } catch (e) {}
    if (mpAudio.muted) mpAudio.muted = false;
    // If the audio is at the end, restart from 0 (defensive)
    if (mpAudio.currentTime >= (mpAudio.duration || 0) - 0.1 && mpAudio.duration) {
      try { mpAudio.currentTime = 0; } catch (e) {}
    }
    const p = mpAudio.play();
    if (p && p.catch) {
      p.catch((err) => {
        // Surface the error so debugging is easier. Common causes:
        // - NotSupportedError: bad source
        // - NotAllowedError: autoplay blocked
        console.warn('[love-site] play() rejected:', err && err.name, err && err.message);
      });
    }
  }

  // One-shot unlock for autoplay-restricted browsers. Called from any
  // first user interaction (begin button, first click/tap anywhere).
  // After the first call, this becomes a no-op so the play button can
  // freely call playAudio() without being short-circuited.
  function unlockAudio() {
    if (userInteracted) return;
    userInteracted = true;
    playAudio();
  }

  function setupMusicPlayer() {
    // No play/pause button — the song just plays on loop once unlocked.
    // Heart icon reflects the play state.
    mpAudio.addEventListener('play',  () => mpHeart.classList.add('is-playing'));
    mpAudio.addEventListener('pause', () => mpHeart.classList.remove('is-playing'));
    mpAudio.addEventListener('ended', () => {
      mpHeart.classList.remove('is-playing');
      mpProgressFill.style.width = '0%';
    });

    mpAudio.addEventListener('timeupdate', () => {
      if (mpAudio.duration && isFinite(mpAudio.duration)) {
        mpProgressFill.style.width = ((mpAudio.currentTime / mpAudio.duration) * 100) + '%';
      }
    });
    mpAudio.addEventListener('loadedmetadata', () => { mpProgressFill.style.width = '0%'; });

    function seekFromEvent(e) {
      if (!mpAudio.duration || !isFinite(mpAudio.duration)) return;
      const rect = mpProgress.getBoundingClientRect();
      const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      mpAudio.currentTime = pct * mpAudio.duration;
    }
    mpProgress.addEventListener('click', seekFromEvent);
    mpProgress.addEventListener('touchstart', (e) => { seekFromEvent(e); e.preventDefault(); }, { passive: false });
    mpProgress.addEventListener('keydown', (e) => {
      if (!mpAudio.duration || !isFinite(mpAudio.duration)) return;
      const step = mpAudio.duration * 0.05;
      if (e.key === 'ArrowRight') { mpAudio.currentTime = Math.min(mpAudio.duration, mpAudio.currentTime + step); e.preventDefault(); }
      if (e.key === 'ArrowLeft')  { mpAudio.currentTime = Math.max(0, mpAudio.currentTime - step); e.preventDefault(); }
    });

    mpVolume.addEventListener('click', () => {
      mpAudio.muted = !mpAudio.muted;
      mpVolume.classList.toggle('is-muted', mpAudio.muted);
    });

    mpHeart.addEventListener('click', () => {
      mpHeart.classList.remove('is-popped');
      void mpHeart.offsetWidth;
      mpHeart.classList.add('is-popped');
    });
  }

  /* ================================================================
     SCENE PROGRESSION
     ================================================================ */
  function revealScene(scene) {
    if (!scene) return;
    if (scene.hasAttribute('hidden')) scene.removeAttribute('hidden');
    // Allow the next frame so the transition picks up the initial state
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scene.classList.add('is-visible');
        observeScene(scene);
      });
    });
  }

  function revealAfterScene(scene) {
    if (!scene) return Promise.resolve();
    return new Promise((resolve) => {
      if (scene.hasAttribute('hidden')) scene.removeAttribute('hidden');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scene.classList.add('is-visible');
          observeScene(scene);
          // Resolve after the transition completes
          setTimeout(resolve, 700);
        });
      });
    });
  }

  /* ================================================================
     TAP TO BEGIN
     ================================================================ */
  function setupBeginButton() {
    beginButton.addEventListener('click', (e) => {
      if (beginButton.disabled) return;
      beginButton.disabled = true;

      // Visual feedback
      const rect = beginButton.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      spawnHeartBurst(cx, cy);
      spawnPetalCascade(cx, cy);

      // Unlock audio & start music
      unlockAudio();
      showMusicPlayer();

      // Transition: fade out intro, reveal invite
      sceneIntro.classList.add('is-leaving');
      setTimeout(() => {
        sceneIntro.classList.add('is-hidden-final');
        revealScene(sceneInvite);
      }, 600);
    });
  }

  function showMusicPlayer() {
    if (!musicPlayer.hasAttribute('hidden')) {
      musicPlayer.classList.add('is-shown');
      return;
    }
    musicPlayer.removeAttribute('hidden');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        musicPlayer.classList.add('is-shown');
      });
    });
  }

  /* ================================================================
     CLICK HERE — reveal the rest of the story
     ================================================================ */
  let ctaTriggered = false;

  // Type a single message line with a blinking cursor at the end.
  // Calls onDone() once the full string has been typed.
  let messageTypers = [];
  function typeMessageLine(p, text, charDelay) {
    if (!p) return Promise.resolve();
    return new Promise((resolve) => {
      let cancelled = false;
      const cancelToken = () => { cancelled = true; };
      messageTypers.push(cancelToken);
      p.textContent = '';
      const cursor = document.createElement('span');
      cursor.className = 'message-typed-cursor';
      p.appendChild(cursor);

      let i = 0;
      const step = () => {
        if (cancelled) { resolve(); return; }
        if (i >= text.length) {
          p.classList.add('is-typing-done');
          if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
          resolve();
          return;
        }
        const ch = text[i++];
        // Insert the next character before the cursor
        p.insertBefore(document.createTextNode(ch), cursor);
        setTimeout(step, charDelay);
      };
      step();
    });
  }

  function setupCtaButton() {
    ctaButton.addEventListener('click', async (e) => {
      if (ctaTriggered) return;
      ctaTriggered = true;

      // Pop animation
      ctaButton.classList.remove('is-pulsing');
      void ctaButton.offsetWidth;
      ctaButton.classList.add('is-pulsing');

      // Burst at click point
      const rect = ctaButton.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      spawnPetalCascade(cx, cy);

      // Reveal message scene
      setTimeout(() => {
        revealAfterScene(sceneMessage);
        setTimeout(() => {
          sceneMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);

        // Reveal the first line, then type it
        setTimeout(() => {
          messageLine1.classList.add('is-visible');
          typeMessageLine(
            messageLine1,
            messageLine1.getAttribute('data-text') || '',
            38
          ).then(() => {
            // Then reveal + type the second line
            setTimeout(() => {
              messageLine2.classList.add('is-visible');
              typeMessageLine(
                messageLine2,
                messageLine2.getAttribute('data-text') || '',
                38
              ).then(() => {
                // After line 2 finishes, wait 4 seconds, then start the countdown
                setTimeout(() => {
                  runCountdown();
                }, 4000);
              });
            }, 350);
          });
        }, 300);
      }, 400);
    });
  }

  /* ================================================================
     INTERSECTION OBSERVER — fade scenes in on scroll
     ================================================================ */
  let sceneObserver = null;
  function createSceneObserver() {
    if (sceneObserver) return sceneObserver;
    sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            sceneObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    return sceneObserver;
  }

  function observeScene(scene) {
    if (!scene) return;
    if (!scene.classList.contains('is-visible')) {
      const observer = createSceneObserver();
      observer.observe(scene);
    }
  }

  /* ================================================================
     LETTER — open / close / typewriter
     ================================================================ */
  let typewriterCancel = null;
  function typeAll(elements, charDelay, paraDelay) {
    if (typewriterCancel) typewriterCancel();
    elements.forEach((el) => { el.textContent = ''; });
    let cancelled = false;
    typewriterCancel = () => { cancelled = true; };

    const typeElement = (el, charIdx, cb) => {
      if (cancelled) return;
      const text = el.getAttribute('data-text') || '';
      if (charIdx >= text.length) {
        const c = el.querySelector('.letter-cursor');
        if (c) c.remove();
        cb();
        return;
      }
      el.textContent = text.substring(0, charIdx + 1);
      const cursor = document.createElement('span');
      cursor.className = 'letter-cursor';
      el.appendChild(cursor);
      setTimeout(() => typeElement(el, charIdx + 1, cb), charDelay);
    };

    const processElements = (idx) => {
      if (cancelled) return;
      if (idx >= elements.length) {
        document.querySelectorAll('.letter-cursor').forEach((c) => c.remove());
        return;
      }
      typeElement(elements[idx], 0, () => {
        if (cancelled) return;
        if (idx < elements.length - 1) {
          setTimeout(() => processElements(idx + 1), paraDelay);
        } else {
          setTimeout(() => {
            document.querySelectorAll('.letter-cursor').forEach((c) => c.remove());
          }, 1100);
        }
      });
    };

    processElements(0);
  }

  let letterOpen = false;
  function openLetter() {
    if (letterOpen) return;
    letterOpen = true;
    letterOverlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        letterOverlay.classList.add('is-open');
        letterOverlay.setAttribute('aria-hidden', 'false');
      });
    });
    // Begin typewriter after the card slides in
    setTimeout(() => {
      const targets = [];
      document.querySelectorAll('.letter-body p').forEach((p) => targets.push(p));
      const sign = document.querySelector('.letter-sign');
      if (sign) targets.push(sign);
      typeAll(targets, 24, 360);
    }, 500);
  }

  function closeLetter() {
    if (!letterOpen) return;
    letterOpen = false;
    letterOverlay.classList.remove('is-open');
    letterOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (typewriterCancel) typewriterCancel();
    document.querySelectorAll('.letter-cursor').forEach((c) => c.remove());
    setTimeout(() => {
      letterOverlay.setAttribute('hidden', '');
    }, 450);
  }

  /* ================================================================
     COUNTDOWN — "Close your eyes and count to 3" (in message scene)
              → then PEEK scene (cat + "Pag piyong ba" + Try again button)
              → on button click, second countdown in peek scene
              → then reveal bouquet
     ================================================================ */
  let countdownActive = false;
  let peekCountdownStarted = false;
  function runCountdown() {
    if (countdownActive) return;
    countdownActive = true;
    // Reveal countdown block in the message scene
    messageCountdown.classList.add('is-shown');
    setTimeout(() => {
      sceneMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    // First tick: 3 → 2 → 1 in the message scene
    const tickFirst = (n) => {
      if (n < 1) {
        // After first countdown, transition to the peek scene
        setTimeout(() => {
          revealAfterScene(scenePeek).then(() => {
            setTimeout(() => {
              scenePeek.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
            // Wait for the user to tap "Try again" before counting down
          });
        }, 700);
        return;
      }
      countdownDigit.textContent = String(n);
      countdownDigit.classList.remove('is-pop');
      // Force reflow so the animation restarts on each tick
      void countdownDigit.offsetWidth;
      countdownDigit.classList.add('is-pop');
      setTimeout(() => tickFirst(n - 1), 1000);
    };
    tickFirst(3);
  }

  // Run the second countdown in the peek scene, then reveal the bouquet
  function runPeekCountdown() {
    if (peekCountdownStarted) return;
    peekCountdownStarted = true;
    // Hide the Try again button + show the countdown stage
    peekButton.classList.add('is-hidden');
    peekStage.style.opacity = '1';
    const tickSecond = (m) => {
      if (m < 1) {
        setTimeout(() => {
          revealAfterScene(sceneBouquet).then(() => {
            bouquetNote.classList.add('is-shown');
            bouquetCat.classList.add('is-shown');
            bouquetEnvelope.classList.add('is-shown');
            setTimeout(() => {
              sceneBouquet.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
          });
          countdownActive = false;
          peekCountdownStarted = false;
        }, 700);
        return;
      }
      countdownDigit2.textContent = String(m);
      countdownDigit2.classList.remove('is-pop');
      void countdownDigit2.offsetWidth;
      countdownDigit2.classList.add('is-pop');
      setTimeout(() => tickSecond(m - 1), 1000);
    };
    tickSecond(3);
  }

  function setupPeekButton() {
    peekButton.addEventListener('click', () => {
      const rect = peekButton.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      spawnHeartBurst(cx, cy, 8);
      runPeekCountdown();
    });
  }

  function setupLetter() {
    bouquetEnvelope.addEventListener('click', () => {
      const rect = bouquetEnvelope.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      spawnHeartBurst(cx, cy);
      openLetter();
    });
    // Keyboard: Enter/Space when envelope is focused
    bouquetEnvelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        bouquetEnvelope.click();
      }
    });
    letterClose.addEventListener('click', closeLetter);
    letterBackdrop.addEventListener('click', closeLetter);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && letterOpen) closeLetter();
    });
  }

  /* ================================================================
     GLOBAL — first interaction unlocks audio
     ================================================================ */
  function setupGlobalAudioUnlock() {
    const handler = () => {
      unlockAudio();
      ['click', 'pointerdown', 'touchstart', 'keydown'].forEach((evt) => {
        document.removeEventListener(evt, handler, true);
      });
    };
    ['click', 'pointerdown', 'touchstart', 'keydown'].forEach((evt) => {
      document.addEventListener(evt, handler, true);
    });
  }

  /* ================================================================
     INIT
     ================================================================ */
  function init() {
    spawnHearts();
    spawnPetals();
    spawnSparkles();
    setupMusicPlayer();
    setupBeginButton();
    setupCtaButton();
    setupPeekButton();
    setupLetter();
    setupGlobalAudioUnlock();

    // The first scene is always visible from the start
    sceneIntro.classList.add('is-visible');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
