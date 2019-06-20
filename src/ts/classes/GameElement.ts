import Point from "./Point"
export default class GameElement {
    private sprite = new Image();
    private spriteLoaded: boolean = false;
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