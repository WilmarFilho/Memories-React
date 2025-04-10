export function resetAnimations() {
    const animatedElements = document.querySelectorAll(
      '.slide-in-top, .slide-in-top-2, .slide-in-top-3'
    );
    animatedElements.forEach((el) => {
      el.classList.remove('slide-in-top', 'slide-in-top-2', 'slide-in-top-3');
      void el.clientHeight;
      el.classList.add('slide-in-top');
    });
  }
  