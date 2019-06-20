//---------------------------------------------
// classes
//---------------------------------------------

class Point {
    public x: number;
    public y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
    public distance(point: Point): number {
        return Math.sqrt(Math.pow(this.y - point.y, 2) + Math.pow(this.x - point.x, 2));
    }
    public angle(point: Point): number {
        return Math.atan2(this.y - point.y, this.x - point.x) * 180 / Math.PI;
    }
}

class GameElement {
    public sprite = new Image();
    public spriteLoaded: boolean = false;
    public point: Point = new Point();
    public rotation: number;
    public speed: number;
    public width: number = 0;
    public height: number = 0;
    constructor(spriteSrc: string, point: Point = new Point(), rotation: number = 0, speed: number = 0) {
        this.sprite.addEventListener("load", this.load.bind(this));
        this.sprite.src = spriteSrc;
        this.point.x = point.x;
        this.point.y = point.y;
        this.rotation = rotation;
        this.speed = speed;
    }
    private load(e: any): void {
        this.width = e.currentTarget.width;
        this.height = e.currentTarget.height;
        this.spriteLoaded = true;
        e.currentTarget.removeEventListener("load", this.load);
    }
    public draw(ctx: any): void {
        if (this.spriteLoaded) {
            ctx.save();
            //ctx.globalCompositeOperation = 'xor'; 
            ctx.translate(this.point.x, this.point.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.drawImage(this.sprite, -this.width / 2, -this.height / 2);
            ctx.restore();
        }
    }
}

//---------------------------------------------
class Player extends GameElement {
    public speedMax: number = 0;
    public speedDamping: number = 0;
    public steer: number = 0;
    public steerMax: number = 0;
    public steerDamping: number = 0;

    private horizontal: number = 0;
    private vertical: number = 0;
    public difference: number = 0.5;


    constructor(spriteSrc: string, point: Point = new Point(), rotation: number = 0, speed: number = 0, speedMax: number = 0, speedDamping: number = 0, steer: number = 0, steerMax: number = 0, steerDamping: number = 0) {
        super(spriteSrc, point, rotation, speed);
        this.speedMax = speedMax;
        this.speedDamping = speedDamping;
        this.steer = steer;
        this.steerMax = steerMax;
        this.steerDamping = steerDamping;
    }
    public update(up: boolean, down: boolean, left: boolean, right: boolean, width: number, height: number): void {
        // version 1

        /*
        if (up) { this.speed -= 0.3; }
        if (down) { this.speed += 0.3; }
        if (left) { this.steer += 0.3; }
        if (right) { this.steer -= 0.3; }

        if (this.steer > 0) {
            this.steer = this.steer - this.steerDamping;
            if (this.steer < 0) { this.steer = 0 };
        }
        else {
            this.steer = this.steer + this.steerDamping
            if (this.steer > 0) { this.steer = 0 };
        }

        if (this.speed > 0) {
            this.speed = this.speed - this.speedDamping;
            if (this.speed < 0) { this.speed = 0 };
        }
        else {
            this.speed = this.speed + this.speedDamping;
            if (this.speed > 0) { this.speed = 0 };
        }

        if (this.speed > this.speedMax) { this.speed = this.speedMax }
        if (this.speed < -this.speedMax) { this.speed = -this.speedMax }
        if (this.steer > this.steerMax) { this.steer = this.steerMax }
        if (this.steer < -this.steerMax) { this.steer = -this.steerMax }

        this.rotation = this.rotation - this.steer;

        this.point.x += this.speed * Math.cos(this.rotation * Math.PI / 180);
        this.point.y += this.speed * Math.sin(this.rotation * Math.PI / 180);

        this.point.x += this.speed * Math.cos(this.rotation * Math.PI / 180);
        this.point.y += this.speed * Math.sin(this.rotation * Math.PI / 180);
        */

        //version 2

        if (up) { this.vertical += this.difference; }
        if (down) { this.vertical -= this.difference; }
        if (left) { this.horizontal -= this.difference; }
        if (right) { this.horizontal += this.difference; }

        if (this.horizontal > this.speedMax) { this.horizontal = this.speedMax }
        if (this.horizontal < -this.speedMax) { this.horizontal = -this.speedMax }

        if (this.vertical > this.speedMax) { this.vertical = this.speedMax }
        if (this.vertical < -this.speedMax) { this.vertical = -this.speedMax }

        if (this.horizontal != 0) {
            if (this.horizontal > 0) {
                this.horizontal = this.horizontal - this.steerDamping;
                if (this.horizontal < 0) { this.horizontal = 0; };
            }
            else {
                this.horizontal = this.horizontal + this.steerDamping
                if (this.horizontal > 0) { this.horizontal = 0; };
            }
        }

        if (this.vertical != 0) {
            if (this.vertical > 0) {
                this.vertical = this.vertical - this.steerDamping;
                if (this.vertical < 0) { this.vertical = 0; };
            }
            else {
                this.vertical = this.vertical + this.steerDamping;
                if (this.vertical > 0) { this.vertical = 0; };
            }
        }

        this.point.x += this.horizontal;
        this.point.y -= this.vertical;

        if ((this.vertical > this.difference || this.vertical < -this.difference) || (this.horizontal > this.difference || this.horizontal < -this.difference)) {
            //this.rotation = Math.atan2(this.point.y - (this.point.y - this.vertical), -this.point.x + (this.point.x - this.horizontal)) * 180 / Math.PI;
            var newrotation = Math.atan2(this.point.y - (this.point.y - this.vertical), -this.point.x + (this.point.x - this.horizontal)) * 180 / Math.PI;
            var difference = this.rotation - newrotation;
            if (difference > 180) {
                difference = -360 + difference;
            }
            if (difference < -180) {
                difference = 360 + difference;
            }
            this.rotation = this.rotation - difference / 8;
        }


        // version 3

        /*
       if (up) { this.point.y -= 2; }
       if (down) { this.point.y += 2; }
       if (left) { this.point.x -= 2; }
       if (right) { this.point.x += 2; }
       */

        if (this.point.x > width) { this.point.x = 0 };
        if (this.point.y > height) { this.point.y = 0 };
        if (this.point.x < 0) { this.point.x = width };
        if (this.point.y < 0) { this.point.y = height };

    }
}
//---------------------------------------------
class Enemy extends GameElement {
    private timer: number = 0;
    private fireRate: number = 100;
    public update(index: number, width: number, height: number, gameElements: Array<any>, xPlayer: number, yPlayer: number): void {

        //rotation
        var newrotation = Math.atan2(this.point.y - yPlayer, this.point.x - xPlayer) * 180 / Math.PI;
        var difference = this.rotation - newrotation;
        if (difference > 180) {
            difference = -360 + difference;
        }
        if (difference < -180) {
            difference = 360 + difference;
        }
        this.rotation = this.rotation - difference / 128;

        //position
        this.point.x -= this.speed * Math.cos(this.rotation * Math.PI / 180);
        this.point.y -= this.speed * Math.sin(this.rotation * Math.PI / 180);


        if (this.point.x > width) { this.point.x = 0 };
        if (this.point.y > height) { this.point.y = 0 };
        if (this.point.x < 0) { this.point.x = width };
        if (this.point.y < 0) { this.point.y = height };

        //bullet
        this.timer++;
        if (this.timer > this.fireRate) {
            this.timer = 0;
            gameElements.push(new Bullet("./assets/img/bullet.png", new Point(this.point.x, this.point.y), this.rotation, 8));
        }
    }
}
//---------------------------------------------
class Bullet extends GameElement {
    public update(index: number, width: number, height: number, gameElements: Array<any>, xPlayer: number, yPlayer: number): void {
        this.point.x -= this.speed * Math.cos(this.rotation * Math.PI / 180);
        this.point.y -= this.speed * Math.sin(this.rotation * Math.PI / 180);
        if (this.point.x < 0) { gameElements[index] = null; }
        if (this.point.y < 0) { gameElements[index] = null; }
        if (this.point.x > width) { gameElements[index] = null; }
        if (this.point.y > height) { gameElements[index] = null; }
        if (this.speed < 0) { gameElements[index] = null; }
    }
}
//---------------------------------------------
class Input {
    public keyUpActive = false;
    public keyDownActive = false;
    public keyRightActive = false;
    public keyLeftActive = false;
    constructor() {
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
    }
    private keyDown(e: KeyboardEvent): void {
        switch (e.code) {
            case "ArrowUp": this.keyUpActive = true; break;
            case "ArrowDown": this.keyDownActive = true; break;
            case "ArrowLeft": this.keyLeftActive = true; break;
            case "ArrowRight": this.keyRightActive = true; break;
        }
    };
    private keyUp(e: KeyboardEvent): void {
        switch (e.code) {
            case "ArrowUp": this.keyUpActive = false; break;
            case "ArrowDown": this.keyDownActive = false; break;
            case "ArrowLeft": this.keyLeftActive = false; break;
            case "ArrowRight": this.keyRightActive = false; break;
        }
    };
}
//---------------------------------------------
class Game {
    public player: Player;
    private input: Input = new Input();
    private width: number;
    private height: number;
    private gameElements: Array<any> = new Array();
    constructor(width: number, height: number, enemyCount: number) {
        this.player = new Player("./assets/img/player.png", new Point(width / 2, height / 2), 0, 0, 5, 0.2, 0, 3, 0.1);
        this.width = width;
        this.height = height;
        for (let a = 0; a < enemyCount; a++) {
            this.gameElements.push(new Enemy("./assets/img/enemy.png", new Point(Math.random() * width, Math.random() * height), 0, 4));
            this.gameElements[a].fireRate = 4;
        }
        var canvas = document.createElement('canvas');
        canvas.id = "game";
        canvas.width = width;
        canvas.height = height;
        canvas.style.zIndex = "1";
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        document.getElementsByTagName("body")[0].appendChild(canvas);
        window.requestAnimationFrame(this.gameloop.bind(this));
    }
    private gameloop() {
        //update
        this.player.update(this.input.keyUpActive, this.input.keyDownActive, this.input.keyLeftActive, this.input.keyRightActive, this.width, this.height)
        for (let i in this.gameElements) {
            this.gameElements[i].update(i, this.width, this.height, this.gameElements, this.player.point.x, this.player.point.y);
        }
        this.gameElements = this.gameElements.filter(Boolean);
        //draw
        let canvas: any = document.getElementById("game");
        let ctx = canvas.getContext("2d");


        ////clear canvas
        ctx.clearRect(0, 0, this.width, this.height);

        ////trail effect
        //ctx.fillStyle = 'rgba(255, 255, 255, .05)';
        //ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.player.draw(ctx);
        for (let i in this.gameElements) {
            this.gameElements[i].draw(ctx);
        }


        window.requestAnimationFrame(this.gameloop.bind(this));
    }
}


//---------------------------------------------
// create game
//---------------------------------------------

let width = 500;
let height = 500;
let enemyCount = 5;
let game = new Game(width, height, enemyCount);

function level1() {
    game.player.difference = 0.2;
    game.player.steerDamping = 0.1;
    game.player.speedMax = 3;
}
function level2() {
    game.player.difference = 0.7;
    game.player.steerDamping = 0.4;
    game.player.speedMax = 6;
}
function level3() {
    game.player.difference = 1.1;
    game.player.steerDamping = 0.7;
    game.player.speedMax = 9;
}

