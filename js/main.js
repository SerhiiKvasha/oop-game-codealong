

class Game {
    constructor(){
        this.player = null; 
        this.obstacles = []; 
    }

    start(){
        this.player = new Player();
        this.attachEventListeners();
        
        
        setInterval(() => {
            const newObstacle = new Obstacle();
            this.obstacles.push(newObstacle);
        }, 3000);
        
        
        setInterval(() => {
            this.obstacles.forEach( (obstacleInstance) => {
                obstacleInstance.moveDown();
                this.detectCollision(obstacleInstance);
                this.removeObstacleIfOutside(obstacleInstance);
    });
        }, 60);

       
    }
    attachEventListeners(){
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowLeft"){
                this.player.moveLeft();
            }else if(event.key === "ArrowRight"){
                this.player.moveRight();
            }
        });
    }

    detectCollision(obstacleInstance){
        if (
            this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.height + this.player.positionY > obstacleInstance.positionY
        ) {
            location.href = 'gameover.html'
        }

    }
    removeObstacleIfOutside(obstacleInstance){
        if(obstacleInstance.positionY < 0){
            obstacleInstance.domElement.remove();
            this.obstacles.shift();


        }
    }
}


class Player {
    constructor(){
        this.width = 20;
        this.height = 10;
        this.positionX = 50;
        this.positionY = 0;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement(){
        
        this.domElement = document.createElement('div');

        
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }
    moveLeft(){
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";
    }
    moveRight(){
        this.positionX++;
        this.domElement.style.left = this.positionX + "vw";
    }
}


class Obstacle {
    constructor(){
        this.width = 10;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1));                    
        this.positionY = 90;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement(){
        
        this.domElement = document.createElement('div');

        
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

       
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }
    moveDown(){
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

const game = new Game();
game.start();


