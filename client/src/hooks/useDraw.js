import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';
import Brush from '../tools/Brush';
import toolState from '../store/toolState';

const useDraw = (figure, ctx)=>{
    const strokeColor = toolState.tool.ctx.strokeStyle
    const fillColor = toolState.tool.ctx.fillColor
    const lineWidth = toolState.tool.ctx.lineWidth
    switch (figure.type){
        case "brush":
            Brush.draw(ctx, figure.x, figure.y, figure.strokeColor, figure.lineWidth)
            break
        case "rect":
            Rect.staticDraw(ctx, figure.x, figure.y, figure.w, figure.h, figure.fillColor, figure.strokeColor, figure.lineWidth)
            break
        case "circle":
            Circle.staticDraw(ctx, figure.x, figure.y, figure.radius, figure.fillColor, figure.strokeColor, figure.lineWidth)
            break
        case "line":
            Line.staticDraw(ctx, figure.x1, figure.y1, figure.x2, figure.y2, figure.strokeColor, figure.lineWidth)
            break
        case "eraser":
            Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth)
            break
        case "finish":
            ctx.beginPath()
            break
    }
    toolState.setStrokeColor(strokeColor)
    toolState.setFillColor(fillColor)
    toolState.setLineWidth(lineWidth)
}
export default useDraw