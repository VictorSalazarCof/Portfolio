// Arma el mensaje del formulario y lo abre en WhatsApp o en el correo del visitante.
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
if (form) {
  const status = form.querySelector<HTMLElement>('[data-contact-status]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const via = ((e as SubmitEvent).submitter as HTMLButtonElement | null)?.value ?? 'email';
    const data = new FormData(form);
    const nombre = String(data.get('nombre') ?? '').trim();
    const mensaje = String(data.get('mensaje') ?? '').trim();

    const missing = [!nombre && 'tu nombre', !mensaje && 'una descripción del proyecto'].filter(Boolean);
    if (missing.length) {
      if (status) { status.textContent = `Falta ${missing.join(' y ')}.`; status.classList.add('text-live'); }
      form.querySelector<HTMLElement>(!nombre ? '[name=nombre]' : '[name=mensaje]')?.focus();
      return;
    }
    status?.classList.remove('text-live');

    const empresa = String(data.get('empresa') ?? '').trim();
    const tipos = data.getAll('tipo').map(String);
    const lines = [
      `Hola Víctor, soy ${nombre}${empresa ? ` de ${empresa}` : ''}.`,
      tipos.length ? `Necesito: ${tipos.join(', ')}.` : '',
      `Presupuesto aproximado: ${data.get('presupuesto')}.`,
      '',
      mensaje,
    ].filter((l, i) => l !== '' || i === 3);
    const text = lines.join('\n');

    if (via === 'whatsapp' && form.dataset.whatsapp) {
      window.open(`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    } else {
      const subject = `Proyecto${tipos.length ? `: ${tipos[0]}` : ''} · ${nombre}`;
      window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    if (status) status.textContent = 'Mensaje listo. Si no se abrió nada, escríbeme directo al correo.';
  });
}
