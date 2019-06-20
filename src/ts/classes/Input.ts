export default class Input {
    public keyUpActive = false;
    public keyDownActive = false;
    public keyRightActive = false;
    public keyLeftActive = false;
    constructor() {
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
    }
    private keyDown(e: KeyboardEvent): void {
        switch (e.code) {
            case "ArrowUp": this.keyUpActive = true; break;
            case "ArrowDown": this.keyDownActive = true; break;
            case "ArrowLeft": this.keyLeftActive = true; break;
            case "ArrowRight": this.keyRightActive = true; break;
        }
    };
    private keyUp(e: KeyboardEvent): void {
        switch (e.code) {
            case "ArrowUp": this.keyUpActive = false; break;
            case "ArrowDown": this.keyDownActive = false; break;
            case "ArrowLeft": this.keyLeftActive = false; break;
            case "ArrowRight": this.keyRightActive = false; break;
        }
    };
}