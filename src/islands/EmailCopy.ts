export function initEmailCopy() {
  const emailLink = document.getElementById('emailLink');
  const copyConfirm = document.getElementById('copyConfirm');
  if (!emailLink || !copyConfirm) return;

  emailLink.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    const textArea = document.createElement('textarea');
    textArea.value = 'hi@rmichels.com';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch {
      copyConfirm.textContent = 'Unable to copy';
    }
    document.body.removeChild(textArea);
    copyConfirm.classList.remove('hidden');
    setTimeout(() => copyConfirm.classList.add('hidden'), 2200);
    return false;
  });

  document.addEventListener('mousemove', (e) => {
    copyConfirm.style.left = e.pageX + 'px';
    copyConfirm.style.top = e.pageY + 'px';
  });
}

initEmailCopy();
