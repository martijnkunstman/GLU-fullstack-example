import Player from "./GameElement/Player"
import Input from "./Input"
import Point from "./Point"
import Enemy from "./GameElement/Enemy"
export default class Game {
    public player: Player;
    private input: Input = new Input();
    private width: number;
    private height: number;
    private gameElements: Array<any> = new Array();
    constructor(width: number, height: number, enemyCount: number) {
        this.player = new Player("player.png", new Point(width / 2, height / 2), 0, 0, 5, 0.2, 0, 3, 0.1);
        this.width = width;
        this.height = height;
        for (let a = 0; a < enemyCount; a++) {
            this.gameElements.push(new Enemy("enemy.png", new Point(Math.random() * width, Math.random() * height), 0, 4));
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