import Tool from "./Tool";

export default class Broom extends Tool{
    constructor(canvas){
        super(canvas)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}