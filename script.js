let highestZ = 1;
class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  mouseTouchX = 0;
  mouseTouchY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
  
    if (paper.classList.contains('heart')) {
      return;
    }

    const moveHandler = (e) => {
      let clientX, clientY;
      if (e.type === 'mousemove') {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.velX = clientX - this.prevTouchX;
          this.velY = clientY - this.prevTouchY;

          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;

          this.prevTouchX = clientX;
          this.prevTouchY = clientY;

          paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        }
      }
    };

    const startHandler = (e) => {
      e.preventDefault(); 

      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;

      if (e.type === 'mousedown') {
        this.mouseTouchX = e.clientX;
        this.mouseTouchY = e.clientY;
        this.prevTouchX = e.clientX;
        this.prevTouchY = e.clientY;
      } else if (e.type === 'touchstart') {
        this.mouseTouchX = e.touches[0].clientX;
        this.mouseTouchY = e.touches[0].clientY;
        this.prevTouchX = e.touches[0].clientX;
        this.prevTouchY = e.touches[0].clientY;
      }
    };

    const endHandler = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Eventos de mouse
    document.addEventListener('mousemove', moveHandler);
    paper.addEventListener('mousedown', startHandler);
    window.addEventListener('mouseup', endHandler);

    // Eventos de toque (mobile)
    document.addEventListener('touchmove', moveHandler);
    paper.addEventListener('touchstart', startHandler);
    window.addEventListener('touchend', endHandler);
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

document.getElementById("pdf").addEventListener("click", function() {
  const link = document.createElement("a");
  link.href = "pdf2.pdf";
  link.download = "paraVoce.pdf";
  link.click();
});
