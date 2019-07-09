import Point from "../Point"
import Input from "../Input"
import Controls from "../Controls"
import GameElement from "../GameElement"
import Laser from "../Laser"

export default class Player extends GameElement {

    //speed
    //manouvre
    //shield
    //wingmancount
    //wingmantype



    public speedFactor: number = 1;
    public controls: Controls;

    constructor(spriteSrc: string, point: Point = new Point(), rotation: number = 0, speed: number = 0, speedFactor: number = 1) {
        super(spriteSrc, point, rotation, speed);
        this.speedFactor = speedFactor;
        this.controls = new Controls();
    }

    public update(input: Input, ctx: any): void {
        this.controls.update(input);
        this.controls.draw(input);
       
        this.rotation = this.controls.rotation;

        this.point.x += (this.controls.vector.x*this.speedFactor);
        this.point.y += (this.controls.vector.y*this.speedFactor);

        if (input.keySpaceActive)
        {
            let laser = new Laser(this.point.x, this.point.y, this.rotation, this.controls.laserPower);
            laser.draw(ctx);
        }
    }
}