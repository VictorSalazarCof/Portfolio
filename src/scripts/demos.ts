// Reproducción eficiente de demos:
// 1. Los <video> usan preload="none": no se descarga nada hasta que se necesitan.
// 2. IntersectionObserver los reproduce al entrar al viewport y los pausa al salir.
// 3. Con prefers-reduced-motion o Ahorro de datos no se autorreproducen; queda el poster y el botón.
// 4. El botón de pausa es obligatorio por accesibilidad (WCAG 2.2.2: movimiento de más de 5 s).

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = (navigator as any).connection?.saveData === true;
const autoplayAllowed = !reduceMotion && !saveData;
const userPaused = new WeakSet<HTMLVideoElement>();

function setToggle(video: HTMLVideoElement) {
  const btn = video.parentElement?.querySelector<HTMLButtonElement>('[data-demo-toggle]');
  if (!btn) return;
  const paused = video.paused;
  btn.setAttribute('aria-pressed', String(paused));
  btn.setAttribute('aria-label', paused ? 'Reproducir demo' : 'Pausar demo');
}

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      const panelHidden = v.closest('[hidden]');
      if (e.isIntersecting && !panelHidden && autoplayAllowed && !userPaused.has(v)) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    }
  },
  { threshold: 0.5 },
);

document.querySelectorAll<HTMLVideoElement>('video[data-demo]').forEach((v) => {
  io.observe(v);
  v.addEventListener('play', () => setToggle(v));
  v.addEventListener('pause', () => setToggle(v));
  setToggle(v);
  v.parentElement?.querySelector('[data-demo-toggle]')?.addEventListener('click', () => {
    if (v.paused) { userPaused.delete(v); v.play().catch(() => {}); }
    else { userPaused.add(v); v.pause(); }
  });
});

// Consola del hero: pestañas accesibles con rotación automática.
const reel = document.querySelector<HTMLElement>('[data-reel]');
if (reel) {
  const tabs = [...reel.querySelectorAll<HTMLButtonElement>('[data-reel-tab]')];
  const panels = [...reel.querySelectorAll<HTMLElement>('[data-reel-panel]')];
  const meta = JSON.parse(reel.querySelector('[data-reel-meta]')?.textContent ?? '[]');
  const kindEl = reel.querySelector('[data-reel-kind]');
  const stackEl = reel.querySelector('[data-reel-stack]');
  const MS = 7000;
  let index = 0;
  let timer: number | undefined;

  const select = (i: number, focus = false) => {
    index = (i + tabs.length) % tabs.length;
    tabs.forEach((t, j) => {
      const on = j === index;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[j].hidden = !on;
      panels[j].querySelector<HTMLVideoElement>('video')?.[on && autoplayAllowed ? 'play' : 'pause']()?.catch?.(() => {});
    });
    if (kindEl) kindEl.textContent = meta[index]?.kind ?? '';
    if (stackEl) stackEl.textContent = meta[index]?.stack ?? '';
    if (focus) tabs[index].focus();
    // Solo desplaza la fila de pestañas en horizontal; nunca la página.
    const list = tabs[index].parentElement;
    if (list && list.scrollWidth > list.clientWidth) {
      const dx = tabs[index].getBoundingClientRect().left - list.getBoundingClientRect().left;
      list.scrollTo({ left: list.scrollLeft + dx - 8, behavior: 'smooth' });
    }
    schedule();
  };

  let inView = true;
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; schedule(); }).observe(reel);

  const schedule = () => {
    window.clearTimeout(timer);
    if (!autoplayAllowed || !inView || reel.classList.contains('is-paused')) return;
    timer = window.setTimeout(() => select(index + 1), MS);
  };

  reel.style.setProperty('--reel-ms', `${MS}ms`);
  tabs.forEach((t, i) => t.addEventListener('click', () => select(i)));
  reel.querySelector('[role=tablist]')?.addEventListener('keydown', (e) => {
    const k = (e as KeyboardEvent).key;
    if (k === 'ArrowRight') select(index + 1, true);
    if (k === 'ArrowLeft') select(index - 1, true);
  });
  // Pausa al pasar el mouse o enfocar dentro: el usuario está mirando.
  const pause = () => { reel.classList.add('is-paused'); window.clearTimeout(timer); };
  const resume = () => { reel.classList.remove('is-paused'); schedule(); };
  reel.addEventListener('pointerenter', pause);
  reel.addEventListener('pointerleave', resume);
  reel.addEventListener('focusin', pause);
  reel.addEventListener('focusout', resume);
  schedule();
}
