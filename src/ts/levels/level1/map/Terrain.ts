import Player from "../../../classes/GameElement/Player"
export default class Terrain {
    public map: Array<Array<number>>;
    public scale: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(scale: number = 0.4, x: number = 0, y: number = 0, width: number = 500, height: number = 500) {
        this.scale = scale;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.map = [
            [1, 2, 3, 4, 5],
            [2, 3, 4, 5, 6],
            [3, 4, 5, 6, 7],
            [4, 5, 6, 7, 8],
            [5, 6, 7, 8, 9]
        ];
    }

    public update(player: Player) {
        /*
        if (input.keyUpActive) { this.y -= -2 }
        if (input.keyDownActive) { this.y += -2 }
        if (input.keyLeftActive) { this.x -= -2 }
        if (input.keyRightActive) { this.x += -2 }
        */
       let a = Math.abs(player.point.x-this.width/2);
       let b = Math.abs(player.point.y-this.height/2);
       let dist = Math.sqrt(a*a+b*b);

       this.x -= Math.cos(player.rotation*Math.PI/180)*dist/16;
       this.y -= Math.sin(player.rotation*Math.PI/180)*dist/16;

    }
    public draw(ctx: any) {

        for (let a = 0; a < this.map.length; a++) {
            for (let b = 0; b < this.map[a].length; b++) {
                //
                let x1 = a * this.width * this.scale + this.x % (this.width * this.scale * (this.map[a].length));
                if (x1 < -this.width) {
                    x1 = this.width + (x1 + this.width);
                }
                else {
                    if (x1 > this.width) {
                        x1 = (x1 - this.width) - this.width;
                    }
                }
                let x2 = this.width * this.scale;
                //                
                let y1 = b * this.height * this.scale + this.y % (this.height * this.scale * (this.map.length));
                if (y1 < -this.height) {
                    y1 = this.height + (y1 + this.height);
                }
                else {
                    if (y1 > this.height) {
                        y1 = (y1 - this.height) - this.height;
                    }
                }
                let y2 = this.height * this.scale;
                //if (((x1 < this.width) && (y1 < this.height)) || ((x2 > 0) && (y2 >0))) {
                ctx.beginPath();
                ctx.rect(x1, y1, x2, y2);
                ctx.fillStyle = this.colorByNumber(this.map[a][b]);
                ctx.fill();
                ctx.closePath();
                //}
            }
        }

    }

    private colorByNumber(number: number) {
        if (number == 0) {
            return "#ffffff";
        }
        if (number == 1) {
            return "#eeeeee";
        }
        if (number == 2) {
            return "#dddddd";
        }
        if (number == 3) {
            return "#cccccc";
        }
        if (number == 4) {
            return "#bbbbbb";
        }
        if (number == 5) {
            return "#aaaaaa";
        }
        if (number == 6) {
            return "#999999";
        }
        if (number == 7) {
            return "#888888";
        }
        if (number == 8) {
            return "#777777";
        }
        if (number == 9) {
            return "#666666";
        }
    }

}