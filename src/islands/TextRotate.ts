class TxtRotate {
  private loopNum = 0;
  private txt = '';
  private isDeleting = false;

  constructor(
    private el: HTMLElement,
    private toRotate: string[],
    private period: number,
  ) {
    this.tick();
  }

  private tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];
    if (this.isDeleting) this.txt = fullTxt.substring(0, this.txt.length - 1);
    else this.txt = fullTxt.substring(0, this.txt.length + 1);
    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    let delta = 150 - Math.random() * 100;
    if (this.isDeleting) delta /= 2;
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 300;
    }
    setTimeout(() => this.tick(), delta);
  }
}

export function initTextRotate() {
  const elements = document.getElementsByClassName('txt-rotate');
  if (!elements.length) return;
  const el = elements[0] as HTMLElement;
  const firstText = el.innerHTML;
  el.innerHTML = '<span class="wrap">' + firstText + '</span>';
  let curText = firstText;

  const deletePlaceholder = () => {
    curText = firstText.substring(0, curText.length - 1);
    el.innerHTML = '<span class="wrap">' + curText + '</span>';
    const delta = (150 - Math.random() * 100) / 2;
    setTimeout(() => {
      if (curText !== '') deletePlaceholder();
      else startRotate();
    }, delta);
  };

  const startRotate = () => {
    for (let i = 0; i < elements.length; i++) {
      const node = elements[i] as HTMLElement;
      const toRotate = node.getAttribute('data-rotate');
      const period = node.getAttribute('data-period');
      if (toRotate) new TxtRotate(node, JSON.parse(toRotate), parseInt(period ?? '2000', 10));
    }
  };

  setTimeout(deletePlaceholder, 4000);
}

initTextRotate();
