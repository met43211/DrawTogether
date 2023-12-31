import Tool from "./Tool";
import toolState from "../store/toolState";

export default class Line extends Tool{
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
                type: 'line',
                x1: this.startX, 
                y1: this.startY,
                x2: this.currentX,
                y2: this.currentY,
                strokeColor: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth
            },
        }))
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish'
            }
        }))
        this.sendToServer(toolState.id)
    }
    mouseDownHandler(e){
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e){
        if(this.mouseDown){
            this.currentX = e.pageX - e.target.offsetLeft
            this.currentY = e.pageY - e.target.offsetTop
            this.draw(this.startX, this.startY, this.currentX, this.currentY)
        }
    }
    draw(x1, y1, x2, y2){
        const img = new Image()
        img.src = this.saved
        img.onload = ()=>{
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke()
        }
    }
    static staticDraw(ctx, x1, y1, x2, y2, strokeColor, lineWidth){
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = strokeColor
        ctx.beginPath()
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke()
    }
}