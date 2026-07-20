// Homepage URL filter — mirrors index.php ?filter= behavior
const section = document.getElementById('MyWork');
if (!section) {
  // no-op
} else {
  const params = new URLSearchParams(window.location.search);
  const filterParam = params.get('filter');
  if (filterParam) {
    document.cookie = `visitorFilter=${encodeURIComponent(filterParam)}; path=/; max-age=31536000`;
  } else {
    document.cookie = 'visitorFilter=; path=/; max-age=0';
  }
}
