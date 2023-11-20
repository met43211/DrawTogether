import axios from 'axios'

export default class Tool {
    constructor(canvas, socket, id){
        this.canvas = canvas
        this.socket = socket
        this.id = id
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }
    destroyEvents(){
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
    set strokeColor(strokeColor){
        this.ctx.strokeStyle = strokeColor
    }
    set fillColor(fillColor){
        this.ctx.fillStyle = fillColor
    }
    set lineWidth(lineWidth){
        this.ctx.lineWidth = lineWidth
    }
    sendToServer(id){
        axios.post(`http://localhost:5000/image?id=${id}`, {
            img: this.canvas.toDataURL()
        }).then(response => console.log(response.data))
    }
}