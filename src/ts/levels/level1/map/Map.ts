import Player from "../../../classes/GameElement/Player"
export default class Map {
    public map: Array<Array<number>>;
    public scale: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public lineWidth: number;
    public lineColor: string;
    public playerX: number;
    public playerY: number; 

    constructor(scale: number = 0.35, width: number = 500, height: number = 500, lineWidth: number = 1, lineColor: string = "#000000") {
        this.scale = scale;
        this.x = 0;
        this.y = 0;
        this.playerX = 0;
        this.playerY = 0;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        //voorwaarde map = vierkant nu nog
        this.map = [
            [1, 2, 3, 4, 5, 4, 3, 2],
            [2, 3, 4, 5, 6, 5, 4, 3],
            [3, 4, 5, 6, 7, 6, 5, 4],
            [4, 5, 6, 7, 8, 7, 6, 5],
            [5, 6, 7, 8, 9, 8, 7, 6],
            [4, 5, 6, 7, 8, 7, 6, 5],
            [3, 4, 5, 6, 7, 6, 5, 4],
            [2, 3, 4, 5, 6, 5, 4, 3]
        ];
    }

    public update(player: Player) {


        let steering = 1;

        if (steering == 1) {
            let a = Math.abs(player.point.x - this.width / 2);
            let b = Math.abs(player.point.y - this.height / 2);
            let dist = Math.sqrt(a * a + b * b);

            this.x -= Math.cos(player.rotation * Math.PI / 180) * dist * this.scale / 8;
            this.y -= Math.sin(player.rotation * Math.PI / 180) * dist * this.scale / 8;
        }

        if (steering == 2) {
            let a = player.point.x - this.width / 2;
            let b = player.point.y - this.height / 2;
            this.x -= a  * this.scale / 8;
            this.y -= b  * this.scale / 8;
        }

        if (this.x > this.width * this.scale * this.map.length) {
            this.x = this.x - this.width * this.scale * this.map.length;
        }
        else if (this.x < - this.width * this.scale * this.map.length) {
            this.x = this.x + this.width * this.scale * this.map.length;
        }

        if (this.y > this.height * this.scale * this.map.length) {
            this.y = this.y - this.height * this.scale * this.map.length;
        }
        else if (this.y < - this.height * this.scale * this.map.length) {
            this.y = this.y + this.height * this.scale * this.map.length;
        }

        this.playerX = player.point.x- this.width / 2;
        this.playerY = player.point.y- this.height / 2;

    }
    public draw(ctx: any) {

        for (let a = 0; a < this.map.length; a++) {
            for (let b = 0; b < this.map[a].length; b++) {

                //
                let x1 = a * this.width * this.scale + this.x;

                x1 = x1 + this.width / 2 - this.width * this.scale / 2;

                x1 = x1 + this.playerX;

                if (x1 < - this.width * this.scale) {
                    x1 = x1 + this.width * this.scale * this.map[a].length;
                }
                else if (x1 > this.width) {
                    x1 = x1 - this.width * this.scale * this.map[a].length;
                    if (x1 > this.width) {
                        x1 = x1 - this.width * this.scale * this.map[a].length;
                    }
                }
                let x2 = this.width * this.scale;
                //
                let y1 = b * this.height * this.scale + this.y;

                y1 = y1 + this.height / 2 - this.height * this.scale / 2;

                y1 = y1 + this.playerY;

                if (y1 < - this.height * this.scale) {
                    y1 = y1 + this.height * this.scale * this.map.length;
                }
                else if (y1 > this.height) {
                    y1 = y1 - this.height * this.scale * this.map.length;
                    if (y1 > this.height) {
                        y1 = y1 - this.height * this.scale * this.map.length;
                    }
                }
                let y2 = this.height * this.scale;

                //

                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = this.lineColor;
                ctx.beginPath();
                ctx.rect(x1, y1, x2, y2);
                ctx.fillStyle = this.colorByNumber(this.map[a][b]);
                //ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                ctx.stroke();
                ctx.fill();
                ctx.closePath();

                ctx.font = "12px Arial";
                ctx.textAlign = "start";
                //ctx.fillText(a + "-" + b, x1 + 10, y1 + 20);
                //ctx.fillText(Math.round(x1) + "-" + Math.round(y1), x1 + 10, y1 + 40);
            }
        }

    }

    private colorByNumber(number: number) {

        let factor = 20;
        let string = "rgba(" + (255 - (number * factor)) + ", " + (100 + (number * factor)) + ", " + (255 - (number * factor)) + ", 0.5)";
        return string;
    }

}