

import GameElement from "../GameElement"
import Point from "../Point"
import Bullet from "./Bullet"
import Player from "./Player"
export default class Enemy extends GameElement {
    public timer: number = 0;
    public fireRate: number = 100;
    public update(index: number, width: number, height: number, gameElements: Array<any>, player: Player): void {

        //rotation
        var newrotation = Math.atan2(this.point.y - player.point.y, this.point.x - player.point.x) * 180 / Math.PI;
        var difference = this.rotation - newrotation;
        if (difference > 180) {
            difference = -360 + difference;
        }
        if (difference < -180) {
            difference = 360 + difference;
        }
        this.rotation = this.rotation - difference / 4;

        //position
        this.point.x -= this.speed * Math.cos(this.rotation * Math.PI / 180);
        this.point.y -= this.speed * Math.sin(this.rotation * Math.PI / 180);


        if (this.point.x > width) { this.point.x = 0 };
        if (this.point.y > height) { this.point.y = 0 };
        if (this.point.x < 0) { this.point.x = width };
        if (this.point.y < 0) { this.point.y = height };

        //bullet
        this.timer++;
        //console.log(this.fireRate);
        //console.log(this.timer);
        if (this.timer > this.fireRate) {
            this.timer = 0;
            gameElements.push(new Bullet("bullet.png", new Point(this.point.x, this.point.y), this.rotation, 1));
        }
    }
}