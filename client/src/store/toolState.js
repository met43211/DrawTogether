import { makeAutoObservable } from "mobx"

class ToolState{
    tool = null
    id
    constructor(){
        makeAutoObservable(this)
    }

    setTool(tool){
        this.tool = tool
    }
    setStrokeColor(strokeColor){
        this.tool.strokeColor = strokeColor
    }
    setFillColor(fillColor){
        this.tool.fillColor = fillColor
    }
    setLineWidth(width){
        this.tool.lineWidth = width
    }
    setId(id){
        this.id = id
    }
}

export default new ToolState()