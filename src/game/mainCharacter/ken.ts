class Ken {
    img: HTMLImageElement
    x: number
    y: number
    w: number
    h: number
    
      constructor() {
        // propiedades del pollo
        this.img = new Image();
        this.img.src = "../../../images/kenWalking.png";
        this.x = 0; // posición en eje x
        this.y = 0; // posición en eje y
        this.w = 49; // ancho
        this.h = 87; // alto
        
    
      }
    
      
      drawKen = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h, 50, 200, 100, 150)
      }
    
      animateKen = (frames: number, right: boolean, left: boolean) => {
        if ( frames % 29 === 0 && ( right || left )) {
            this.x += 49
        } if ( this.x === 196) {
            this.x = 0
        }
      }

    }