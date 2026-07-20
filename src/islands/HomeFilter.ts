// Homepage URL filter — mirrors index.php ?filter= behavior (client-side for static build)
const section = document.getElementById('MyWork');
if (section) {
  const params = new URLSearchParams(window.location.search);
  const filterParam = params.get('filter');
  const filters = filterParam ? filterParam.split(',').filter(Boolean) : [];

  if (filterParam) {
    document.cookie = `visitorFilter=${encodeURIComponent(filterParam)}; path=/; max-age=31536000`;
  } else {
    document.cookie = 'visitorFilter=; path=/; max-age=0';
  }

  const rows = Array.from(section.querySelectorAll<HTMLElement>('.projRow'));
  rows.forEach((row, index) => {
    const roles = (row.dataset.js ?? '').split(',').filter(Boolean);
    let visible = false;

    if (filters.length === 0) {
      visible = index < 6;
    } else {
      visible = filters.some((slug) => roles.includes(slug));
    }

    row.classList.toggle('projRow--hidden', !visible);
    row.style.display = visible ? '' : 'none';
  });
}
