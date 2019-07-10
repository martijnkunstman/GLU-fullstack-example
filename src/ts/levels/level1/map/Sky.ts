import Player from "../../../classes/GameElement/Player"
export default class Sky {
    public map: Array<Array<number>>;
    public scale: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(scale: number = 0.35, x: number = 0, y: number = 0, width: number = 500, height: number = 500) {
        this.scale = scale;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.map = [
            [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8],
            [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9],
            [3, 4, 5, 6, 7, 8, 9, 10, 3, 4, 5, 6, 7, 8, 9, 10],
            [4, 5, 6, 7, 8, 9, 10, 11, 4, 5, 6, 7, 8, 9, 10, 11],
            [5, 6, 7, 8, 9, 10, 11, 12, 5, 6, 7, 8, 9, 10, 11, 12],
            [6, 7, 8, 9, 10, 11, 12, 13, 6, 7, 8, 9, 10, 11, 12, 13],
            [7, 8, 9, 10, 11, 12, 13, 14, 7, 8, 9, 10, 11, 12, 13, 14],
            [8, 9, 10, 11, 12, 13, 14, 15, 8, 9, 10, 11, 12, 13, 14, 15],
            [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8],
            [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9],
            [3, 4, 5, 6, 7, 8, 9, 10, 3, 4, 5, 6, 7, 8, 9, 10],
            [4, 5, 6, 7, 8, 9, 10, 11, 4, 5, 6, 7, 8, 9, 10, 11],
            [5, 6, 7, 8, 9, 10, 11, 12, 5, 6, 7, 8, 9, 10, 11, 12],
            [6, 7, 8, 9, 10, 11, 12, 13, 6, 7, 8, 9, 10, 11, 12, 13],
            [7, 8, 9, 10, 11, 12, 13, 14, 7, 8, 9, 10, 11, 12, 13, 14],
            [8, 9, 10, 11, 12, 13, 14, 15, 8, 9, 10, 11, 12, 13, 14, 15]
        ];
    }

    public update(player: Player) {

        let a = Math.abs(player.point.x - this.width / 2);
        let b = Math.abs(player.point.y - this.height / 2);
        let dist = Math.sqrt(a * a + b * b);

        this.x -= Math.cos(player.rotation * Math.PI / 180) * dist * this.scale/4;
        this.y -= Math.sin(player.rotation * Math.PI / 180) * dist * this.scale/4;

    }
    public draw(ctx: any) {

        for (let a = 0; a < this.map.length; a++) {
            for (let b = 0; b < this.map[a].length; b++) {
                //
                let x1 = a * this.width * this.scale + (this.x % (this.width * this.scale * (this.map[a].length)));

                x1 = x1 + this.width/2 - this.width * this.scale/2;
                
                if (x1 < -this.map[a].length * this.width * this.scale + this.width) {
                    let difference = (-this.map[a].length * this.width * this.scale + this.width) - x1;
                    x1 = this.width - difference;
                }
                else {
                    if (x1 > (this.map[a].length - 1) * this.width * this.scale) {
                        let difference = x1 - (this.map[a].length * this.width * this.scale);
                        x1 = difference;
                    }
                }
                let x2 = this.width * this.scale;
                //
                let y1 = b * this.height * this.scale + (this.y % (this.height * this.scale * (this.map.length)));

                y1 = y1 + this.height/2 - this.height * this.scale/2;

                if (y1 < -this.map.length * this.height * this.scale + this.height) {
                    let difference = (-this.map.length * this.height * this.scale + this.height) - y1;
                    y1 = this.height - difference;
                }
                else {
                    if (y1 > (this.map.length - 1) * this.height * this.scale) {
                        let difference = y1 - (this.map.length * this.height * this.scale);
                        y1 = difference;
                    }
                }
                let y2 = this.height * this.scale;
                //
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#0000ff";
                ctx.beginPath();
                ctx.rect(x1, y1, x2, y2);
                ctx.fillStyle = this.colorByNumber(this.map[a][b]);
                ctx.stroke();
                //ctx.fill();
                ctx.closePath(); 
                ctx.fillStyle = "#0000ff";
                ctx.font = "12px Arial";
                ctx.textAlign = "start";
                ctx.fillText(a+"-"+b, x1+10, y1+20);
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
        if (number == 10) {
            return "#555555";
        }
        if (number == 11) {
            return "#444444";
        }
        if (number == 12) {
            return "#333333";
        }
        if (number == 13) {
            return "#222222";
        }
        if (number == 14) {
            return "#111111";
        }
        if (number == 15) {
            return "#000000";
        }
    }

}