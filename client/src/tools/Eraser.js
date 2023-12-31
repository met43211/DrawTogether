import Tool from "./Tool";
import toolState from "../store/toolState";

export default class Eraser extends Tool{
    constructor(canvas, socket, id){
        super(canvas, socket, id)
        this.listen()
    }
    listen(){
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }
    mouseUpHandler(e){
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish'
            }
        }))
        this.ctx.strokeStyle = this.actualColor
        this.sendToServer(toolState.id)
    }
    mouseDownHandler(e){
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseMoveHandler(e){
        if(this.mouseDown){
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft, 
                    y: e.pageY - e.target.offsetTop,
                    lineWidth: this.ctx.lineWidth,
                    actualColor: this.actualColor
                },
            }))
        }
    }
    static draw(ctx, x, y, lineWidth){
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = 'white'
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}