export function initLqip() {
  const swapImages = () => {
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (img.hasAttribute('lqip-ignore')) continue;
      let src = img.src;
      src = src.replace('lqip/', '');
      if (src.includes('gif')) src = src.replace('gif', 'png');
      if (img.hasAttribute('lqip-gif')) src = src.replace('jpg', 'gif');
      if (img.hasAttribute('lqip-webp')) src = src.replace('jpg', 'webp');
      img.src = src;
    }
  };

  if (document.readyState === 'complete') {
    swapImages();
  } else {
    window.addEventListener('load', swapImages);
  }
}

initLqip();
