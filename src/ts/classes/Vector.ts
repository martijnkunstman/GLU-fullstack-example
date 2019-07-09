export default class Vector {

  public x: number = 0;
  public y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public plus(v: Vector) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }

  public length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public correction(maxLength: number, minLength: number, ) {
    var tempLength = this.length();
    if (tempLength > maxLength) {
      this.x = this.x / tempLength;
      this.y = this.y / tempLength;
      if (Math.abs(Math.abs(this.x) - maxLength) < minLength/10) {
        this.y = 0;
      }
      else if (Math.abs(Math.abs(this.y) - maxLength) < minLength/10) {
        this.x = 0;
      }
    }
    else if (tempLength < minLength) {
      this.x = 0;
      this.y = 0;
    }
  }

  public damping(d: number) {
    this.x = this.x - this.x * d;
    this.y = this.y - this.y * d;
  }

  public friction(d: number) {
    var tempLength = this.length();
    if (tempLength > d) {
      this.x = this.x - this.x / tempLength * d;
      this.y = this.y - this.y / tempLength * d;
    }
    else {
      this.x = 0;
      this.y = 0;
    }
  }

}