import Vector from "./Vector"
import Input from "./Input"
export default class Controls {
    public vector: Vector;

    public damping: number;
    public friction: number;
    public force: number;
    public rotation: number;
    public laserPower: number;

    private lastDraw : number;
    private fps: number;


    constructor(damping: number = 0.05, friction: number = 0.05, force: number = 0.15) {
        this.damping = damping;
        this.friction = friction;
        this.force = force;
        this.vector = new Vector(0, 0);
        this.rotation = 0;
        this.laserPower = 100;
        this.lastDraw = Date.now(); 
        this.fps = 0;
    }

    public update(input: Input): void {


        input.keyUpActive, input.keyDownActive, input.keyLeftActive, input.keyRightActive, input.keySpaceActive

        this.vector.damping(this.damping);
        this.vector.friction(this.friction);
        let keyActive = false;
        if (input.keyUpActive) { this.vector.plus(new Vector(0, -this.force)); keyActive = true; }
        if (input.keyDownActive) { this.vector.plus(new Vector(0, this.force)); keyActive = true; }
        if (input.keyLeftActive) { this.vector.plus(new Vector(-this.force, 0)); keyActive = true; }
        if (input.keyRightActive) { this.vector.plus(new Vector(this.force, 0)); keyActive = true; }
        this.vector.correction(1, 0.005);

        let temp = 0;
        if ((Math.abs(this.vector.x) > 0.05) || (Math.abs(this.vector.y) > 0.05)) {
            temp = Math.atan2(this.vector.y, this.vector.x) * 180 / Math.PI;
            let a = this.angleBetweenTwoAngles(this.rotation, temp);
            this.rotation = (this.rotation + a * this.damping * 10) % 360;
        }
        //
        //to do: make speed of recovery and drainage of laserPower adjustable and dependant on vector force
        //to do: adjust vector force based on usage of space
        //
        if (input.keySpaceActive) {
            if (keyActive) {
                this.laserPower -= 2;
            }
            else {
                this.laserPower--;
            }
            if (this.laserPower < 0) {
                this.laserPower = 0;
            }
        }
        else {
            if (keyActive) {
                this.laserPower += 0.5;
            }
            else {
                this.laserPower++;
            }
            if (this.laserPower > 100) {
                this.laserPower = 100;
            }
        }
    }

    public angleBetweenTwoAngles(a: number, b: number) {
        let dif = (b - a + 360 + 180) % 360 - 180;
        return dif;
    }

    public draw(input:Input): void {
        let canvas: any = document.getElementById("game2");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = 'rgba(255, 255, 255, .5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        //ctx.save();

        if (input.keySpaceActive) {
            ctx.strokeStyle = "#FF0000";
        }
        else {
            ctx.strokeStyle = "#000000";
        }

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 75);
        ctx.lineTo(this.laserPower, 75);
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.laserPower, 75);
        ctx.lineTo(100, 75);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;

        if (input.keyUpActive) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(100, 0);
            ctx.stroke();
            ctx.closePath();
        }
        if (input.keyDownActive) {
            ctx.beginPath();
            ctx.moveTo(0, 100);
            ctx.lineTo(100, 100);
            ctx.stroke();
            ctx.closePath();
        }
        if (input.keyLeftActive) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 100);
            ctx.stroke();
            ctx.closePath();
        }
        if (input.keyRightActive) {
            ctx.beginPath();
            ctx.moveTo(100, 0);
            ctx.lineTo(100, 100);
            ctx.stroke();
            ctx.closePath();
        }

        ctx.strokeStyle = "#0000ff";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(50, 50, this.vector.length() * 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.arc(50, 50, 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(50 + this.vector.x * 50, 50 + this.vector.y * 50);
        ctx.stroke();
        ctx.closePath();

        let elapsed = Date.now() - this.lastDraw;
        this.lastDraw = Date.now()
        let newFps = 1000/elapsed;
        this.fps = this.fps - (this.fps - newFps)/16;

        ctx.font = "12px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "end";
        ctx.fillText("x:" + this.vector.x.toFixed(3), 95, 15);
        ctx.fillText("y:" + this.vector.y.toFixed(3), 95, 25);
        ctx.fillText("r:" + this.rotation.toFixed(3), 95, 35);
        ctx.fillText("l:" + this.laserPower.toFixed(3), 95, 45);
        ctx.fillText("f:" + Math.round(this.fps), 95, 55);

        //ctx.restore();
    }
}