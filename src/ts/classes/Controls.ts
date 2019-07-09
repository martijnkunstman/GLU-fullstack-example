import Vector from "./Vector"
export default class Controls {
    public vector: Vector;

    public damping: number;
    public friction: number;
    public force: number;
    public rotation: number;
    public laserPower: number;

    constructor(damping: number = 0.05, friction: number = 0.05, force: number = 0.15) {
        this.damping = damping;
        this.friction = friction;
        this.force = force;
        this.vector = new Vector(0, 0);
        this.rotation = 0;
        this.laserPower = 100;
    }

    public update(up: boolean, down: boolean, left: boolean, right: boolean, space: boolean): void {
        this.vector.damping(this.damping);
        this.vector.friction(this.friction);
        if (up) { this.vector.plus(new Vector(0, -this.force)) }
        if (down) { this.vector.plus(new Vector(0, this.force)) }
        if (left) { this.vector.plus(new Vector(-this.force, 0)) }
        if (right) { this.vector.plus(new Vector(this.force, 0)) }
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
        if (space) {
            if (up || down || left || right) {
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
            if (up || down || left || right) {
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

    public draw(up: boolean, down: boolean, left: boolean, right: boolean, space: boolean): void {
        let canvas: any = document.getElementById("game2");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = 'rgba(255, 255, 255, .5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        if (space) {
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

        if (up) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(100, 0);
            ctx.stroke();
            ctx.closePath();
        }
        if (down) {
            ctx.beginPath();
            ctx.moveTo(0, 100);
            ctx.lineTo(100, 100);
            ctx.stroke();
            ctx.closePath();
        }
        if (left) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 100);
            ctx.stroke();
            ctx.closePath();
        }
        if (right) {
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

        ctx.font = "12px Arial";
        ctx.textAlign = "end";
        ctx.fillText("x:" + this.vector.x.toFixed(3), 95, 15);
        ctx.fillText("y:" + this.vector.y.toFixed(3), 95, 25);
        ctx.fillText("r:" + this.rotation.toFixed(3), 95, 35);
        ctx.fillText("l:" + this.laserPower.toFixed(3), 95, 35);


        ctx.restore();
    }
}