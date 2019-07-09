import GameElement from "../GameElement"
import Player from "./Player"

export default class Bullet extends GameElement {
    public update(index: number, width: number, height: number, gameElements: Array<any>, player: Player): void {
        this.point.x -= this.speed * Math.cos(this.rotation * Math.PI / 180);
        this.point.y -= this.speed * Math.sin(this.rotation * Math.PI / 180);
        if (this.point.x < 0) { gameElements[index] = null; }
        if (this.point.y < 0) { gameElements[index] = null; }
        if (this.point.x > width) { gameElements[index] = null; }
        if (this.point.y > height) { gameElements[index] = null; }
        if (this.speed < 0) { gameElements[index] = null; }
    }
}