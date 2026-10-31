/*
01010011 01011001 01010011 01010100 01000101 01001101
=======================================================

███████╗██████╗ ██████╗  █████╗ ██╗   ██╗
██╔════╝██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝
███████╗██████╔╝██████╔╝███████║ ╚████╔╝ 
╚════██║██╔═══╝ ██╔══██╗██╔══██║  ╚██╔╝  
███████║██║     ██║  ██║██║  ██║   ██║   
╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   

スプレイ スクリプツ // JS MODULE
=======================================================
[VERSION]   : v0.2
[DEPLOYED]  : 2026-10-31
[SYSTEM]    : JAVASCRIPT
=======================================================
01000100 01001111 01010111 01010000 01011001 01000111
*/

class spraySlides {
    constructor(slidesElement, dotsElement) {
        this.carousel = slidesElement;
        this.dotsContainer = dotsElement;
        this.slides = this.carousel.querySelectorAll('.s-slide');
        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.carousel.style.cursor = 'grab';
        this.carousel.style.userSelect = 'none';
        this.carousel.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        window.addEventListener('mouseup', () => this.handleMouseUp());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.renderDots();
        this.carousel.addEventListener('scroll', () => this.handleScroll());
    }

    renderDots() {
        if (!this.dotsContainer) return;
        this.dotsContainer.innerHTML = '';

        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('s-slides-circle');
            if (index === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                const slideWidth = this.carousel.clientWidth;
                this.carousel.scrollTo({
                    left: index * slideWidth,
                    behavior: 'smooth'
                });
            });

            this.dotsContainer.appendChild(dot);
        });
    }

    handleScroll() {
        const slideWidth = this.carousel.clientWidth;
        if (slideWidth === 0) return;

        const newIndex = Math.round(this.carousel.scrollLeft / slideWidth);
        if (newIndex !== this.currentIndex) {
            this.currentIndex = newIndex;
            this.updateDots();
        }
    }

    updateDots() {
        if (!this.dotsContainer) return;
        const dots = this.dotsContainer.querySelectorAll('.s-slides-circle');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    handleMouseDown(e) {
        if (e.button !== 0) return;
        this.isDown = true;
        this.carousel.style.cursor = 'grabbing';
        this.carousel.style.scrollSnapType = 'none';
        this.startX = e.clientX;
        this.scrollLeft = this.carousel.scrollLeft;
    }

    handleMouseUp() {
        if (!this.isDown) return;
        this.isDown = false;
        this.carousel.style.cursor = 'grab';
        this.carousel.style.scrollSnapType = 'x mandatory';
    }

    handleMouseMove(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.clientX;
        const walk = x - this.startX;
        this.carousel.scrollLeft = this.scrollLeft - walk;
    }
}

function sprayInsert() {
    let z = document.getElementsByTagName("*");
    for (let i = 0; i < z.length; i++) {
        let elmnt = z[i];
        let file = elmnt.getAttribute("s-insert");
        if (file) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) elmnt.innerHTML = this.responseText;
                    if (this.status == 404) elmnt.innerHTML = "Page not found.";
                    elmnt.removeAttribute("s-insert");
                    sprayInsert();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}