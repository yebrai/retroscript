
class Ken {
    imgWalk: HTMLImageElement
    walk: {
        x: number
        y: number
        w: number
        h: number
    }
    imgJump: HTMLImageElement
    jump: {
        x: number
        y: number
        w: number
        h: number
    }

    img: HTMLImageElement
    
      constructor() {
        // propiedades del pollo
        this.imgWalk = new Image(),
        this.imgWalk.src = "../../../images/kenWalking.png",
        this.walk = {
            x: 0, // posición en eje x
            y: 0, // posición en eje y
            w: 49, // ancho
            h: 87, // alto
        }

        this.imgJump = new Image(),
        this.imgJump.src = "../../../images/kenJump.png"
        this.jump = {
            x: 0,
            y: 0,
            w: 60,
            h: 95
        }
        
        this.img = this.imgWalk
      }
    
      
      
      drawKen = () => {
        ctx.drawImage(this.img, this.walk.x, this.walk.y, this.walk.w, this.walk.h, 50, 200, 70, 100)
      }

      animateKen = (frames: number, right: boolean, left: boolean, isJumping: boolean) => {
        if (!isJumping) {
            this.animateKenWalking(frames, right, left)
        } else {this.animateKenJumping(frames, isJumping)}

      }
    
      animateKenWalking = (frames: number, right: boolean, left: boolean) => {
        this.img = this.imgWalk
        if ( frames % 29 === 0 && ( right || left )) {
            this.walk.x += 49
        } if ( this.walk.x === 196) {
            this.walk.x = 0
        }
      }

      animateKenJumping = (frames: number, isJumping: boolean) => {
        this.img = this.imgJump
        if ( frames % 29 === 0) {
            this.jump.x += 60
        } if ( this.jump.x === 300) {
            this.jump.x = 0
        }
      }

    }