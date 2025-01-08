class ImagePreview {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
        this.currentIndex = 0;
        this.imgList = [];
        this.previewEl = document.querySelector('.preview-container');
    }
    
    init(images) {
        this.imgList = images;
        if(!this.isMobile) {
            this.bindEvents();
        }
    }
    
    show(index) {
        if(this.isMobile) {
            previewImage.start({
                urls: [...this.imgList],
                current: this.imgList[index]
            });
            return;
        }
        
        this.currentIndex = index;
        this.previewEl.innerHTML = `
            <img src="${this.imgList[index]}" class="preview-img" />
            <img src="../image/previous.svg" onclick="imagePreview.prev(event)" 
                class="preview-nav prev" style="display:${index <= 0 ? 'none' : 'block'}" />
            <img src="../image/next.svg" onclick="imagePreview.next(event)"
                class="preview-nav next" style="display:${index >= this.imgList.length - 1 ? 'none' : 'block'}" />
        `;
        this.previewEl.style.display = 'flex';
    }
    
    hide() {
        this.previewEl.style.display = 'none';
    }
    
    prev(e) {
        e.stopPropagation();
        if(this.currentIndex > 0) {
            this.show(this.currentIndex - 1);
        }
    }
    
    next(e) {
        e.stopPropagation();
        if(this.currentIndex < this.imgList.length - 1) {
            this.show(this.currentIndex + 1);
        }
    }
    
    bindEvents() {
        this.previewEl.addEventListener('click', () => this.hide());
    }
}

const imagePreview = new ImagePreview();
