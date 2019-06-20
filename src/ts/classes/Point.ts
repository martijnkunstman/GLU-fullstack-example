export default class Point {
    public x: number;
    public y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
    public distance(point: Point): number {
        return Math.sqrt(Math.pow(this.y - point.y, 2) + Math.pow(this.x - point.x, 2));
    }
    public angle(point: Point): number {
        return Math.atan2(this.y - point.y, this.x - point.x) * 180 / Math.PI;
    }
}