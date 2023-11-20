import { makeAutoObservable } from "mobx"

class CanvasState{
    canvas = null
    undoList = []
    redoList = []
    socket = null
    sessionId = null
    username = ''
    constructor(){
        makeAutoObservable(this)
    }
    setCanvas(canvas){
        this.canvas = canvas
    }
    pushToUndo(data){
        this.undoList.push(data)
    }

    pushToRedo(data){
        this.redoList.push(data)
    }
    setSocket(socket){
        this.socket = socket
    }
    setSessionId(id){
        this.sessionId = id
    }
    setUserName(username){
        this.username = username
    }
    setStartPicture(startImg){
        let ctx = this.canvas.getContext('2d')
        const img = new Image
        img.src = startImg
        img.onload = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            ctx.stroke()
        }
    }
    undo(){
        let ctx = this.canvas.getContext('2d')
        if(this.undoList.length>0){
            let dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = ()=>{
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }else{
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }
    redo(){
        let ctx = this.canvas.getContext('2d')
        console.log(this.redoList.length)
        if(this.redoList.length>0){
            let dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = ()=>{
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new CanvasState()