import Tool from "./Tool";
import toolState from "../store/toolState";

export default class Circle extends Tool{
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
                type: 'circle',
                x: this.startX, 
                y: this.startY,
                radius: this.radius,
                fillColor: this.ctx.fillStyle,
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
        this.startX= e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e){
        if(this.mouseDown){
            let currentX = e.pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop
            this.radius = Math.sqrt(Math.pow(currentX - this.startX, 2) + Math.pow(currentY - this.startY, 2))
            this.draw(this.startX, this.startY, this.radius)
        }
    }
    draw(x, y, radius){
        const img = new Image()
        img.src = this.saved
        img.onload = ()=>{
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, radius, 0, Math.PI*2)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }
    static staticDraw(ctx, x, y, radius, color, strokeColor, lineWidth){
        ctx.lineWidth = lineWidth
        ctx.fillStyle = color
        ctx.strokeStyle = strokeColor
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI*2)
        ctx.fill()
        ctx.stroke()
    }
}