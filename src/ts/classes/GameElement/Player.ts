import Point from "../Point"
import GameElement from "../GameElement"
export default class Player extends GameElement {
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