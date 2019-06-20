import GameElement from "../GameElement"
import Point from "../Point"
import Bullet from "./Bullet"
export default class Enemy extends GameElement {
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
            gameElements.push(new Bullet("bullet.png", new Point(this.point.x, this.point.y), this.rotation, 8));
        }
    }
}