export function initMenu() {
  const menuToggle = document.getElementById('MenuToggle');
  const overlayMenu = document.getElementById('OverlayMenu');
  const mainGrid = document.getElementById('MainGrid');
  const contentToBlur = document.getElementById('Content');
  const menuContent = document.getElementById('MenuContent');
  if (!menuToggle || !overlayMenu || !mainGrid || !contentToBlur || !menuContent) return;

  overlayMenu.classList.add('hidden');
  let tmpDisable = false;

  const toggle = () => {
    tmpDisable = true;
    menuToggle.classList.toggle('change');
    overlayMenu.classList.toggle('hidden');
    contentToBlur.classList.toggle('blur');
    mainGrid.classList.toggle('noClick');
    setTimeout(() => {
      tmpDisable = false;
    }, 200);
  };

  menuToggle.onclick = toggle;

  document.addEventListener('click', (event) => {
    if (!overlayMenu.classList.contains('hidden') && !tmpDisable) {
      if (!menuContent.contains(event.target as Node)) toggle();
    }
  });

  document.onkeydown = (evt) => {
    const e = evt || window.event;
    if (e.key === 'Escape' && !overlayMenu.classList.contains('hidden')) toggle();
  };
}

initMenu();
