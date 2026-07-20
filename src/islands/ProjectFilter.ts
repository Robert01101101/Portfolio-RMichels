const activeFilters: string[] = [];
const andActive = true;

function sortProjects() {
  const hiddenDiv = document.getElementById('projectTileHidden');
  const visibleDiv = document.getElementById('projectTileVisible');
  const projectCount = document.getElementById('projectCount');
  if (!hiddenDiv || !visibleDiv) return;

  const itemsArr = Array.from(visibleDiv.children).filter(
    (n): n is HTMLElement => n.nodeType === 1,
  );
  if (projectCount) projectCount.textContent = String(itemsArr.length);
  itemsArr.sort((a, b) => Number(a.dataset.tile) - Number(b.dataset.tile));
  itemsArr.forEach((item) => visibleDiv.appendChild(item));
}

function initFilterButtons() {
  document.querySelectorAll<HTMLButtonElement>('.filterBtn').forEach((item) => {
    let toggle = false;
    const slug = item.dataset.js;
    if (!slug) return;
    item.addEventListener('click', () => {
      item.classList.toggle('filterBtn--selected');
      toggle = !toggle;
      if (toggle) activeFilters.push(slug);
      else {
        const index = activeFilters.indexOf(slug);
        if (index > -1) activeFilters.splice(index, 1);
      }
      document.dispatchEvent(
        new CustomEvent('updateProject', {
          bubbles: true,
          detail: { slug: () => slug, toggle: () => toggle },
        }),
      );
      setTimeout(sortProjects, 10);
      window.locoScroll?.update();
    });
  });
}

function initProjectRows() {
  const hiddenDiv = document.getElementById('projectTileHidden');
  const visibleDiv = document.getElementById('projectTileVisible');
  if (!hiddenDiv || !visibleDiv) return;

  let counter = 0;
  document.querySelectorAll<HTMLElement>('.projRow').forEach((item) => {
    const roles = (item.dataset.js ?? '').split(',').filter(Boolean);
    const position = counter;
    item.setAttribute('data-tile', String(position));
    counter++;

    window.addEventListener('updateProject', () => {
      let active = false;
      let missedHit = false;
      if (activeFilters.length > 0) {
        activeFilters.forEach((element) => {
          if (roles.includes(element)) active = true;
          else if (andActive) missedHit = true;
        });
      } else active = true;
      if (missedHit) active = false;

      if (active) {
        item.classList.remove('projRow--hidden');
        visibleDiv.appendChild(item);
      } else {
        item.classList.add('projRow--hidden');
        hiddenDiv.appendChild(item);
      }
    });
  });
}

function applyUrlFilter() {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get('filter');
  if (!filter) {
    document.cookie = 'visitorFilter=; Max-Age=0; path=/';
    return;
  }
  document.cookie = `visitorFilter=${encodeURIComponent(filter)}; path=/; max-age=31536000`;
  const filters = filter.split(',');
  filters.forEach((slug) => {
    const btn = document.querySelector<HTMLButtonElement>(`.filterBtn[data-js="${slug}"]`);
    if (btn) btn.click();
  });
}

initFilterButtons();
initProjectRows();
applyUrlFilter();

export {};
