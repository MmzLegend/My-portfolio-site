'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
if (menuButton && navigation) {
  menuButton.hidden = false;
  navigation.dataset.enhanced = 'true';
  const closeMenu = () => { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); };
  menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
  window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const filters = document.querySelector('.filters');
if (filters) {
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    let visible = 0;
    document.querySelectorAll('.work-card').forEach(card => {
      card.hidden = button.dataset.filter !== 'All work' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) visible++;
    });
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.getElementById('filter-status').textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown`;
  });
}
const form = document.getElementById('contactForm');
if (form) {
  const service = new URLSearchParams(window.location.search).get('service');
  if (Array.from(form.elements.service.options).some(option => option.value === service)) form.elements.service.value = service;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('[type="submit"]');
    if (button.disabled) return;
    const status = document.getElementById('form-status');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    button.disabled = true;
    button.textContent = 'Sending your enquiry…';
    status.dataset.state = 'pending';
    status.textContent = 'Please wait while your enquiry is sent.';
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error('The form service did not accept the enquiry.');
      status.dataset.state = 'success';
      status.textContent = 'Your enquiry has been submitted. Thank you — I’ll get back to you by email.';
      form.reset();
    } catch (_) {
      status.dataset.state = 'error';
      status.textContent = 'We couldn’t confirm your enquiry was sent. Your details are still here. Please try again, or email mukhtarzik@gmail.com directly.';
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      button.textContent = 'Send project enquiry ↗';
    }
  });
}
