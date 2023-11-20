import { observer } from 'mobx-react-lite';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss'
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Eraser from '../tools/Eraser';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Broom from '../tools/Broom';
import useDownload from '../hooks/useDownload';

const Toolbar = observer(()=>{
    return ( 
        <div className="toolbar">
            <button
                className={toolState.tool && toolState.tool.constructor.name === 'Brush' ?
                "toolbar__btn brush toolbar__btn-active" :
                "toolbar__btn brush"
                }
                onClick={()=>toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))}></button>
            <button
                className={toolState.tool && toolState.tool.constructor.name === 'Rect' ?
                "toolbar__btn rect toolbar__btn-active" :
                "toolbar__btn rect"
                }
                onClick={()=>{toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))}}></button>
            <button 
                className={toolState.tool && toolState.tool.constructor.name === 'Circle' ?
                "toolbar__btn circle toolbar__btn-active" :
                "toolbar__btn circle"
                }
                onClick={()=>{toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))}}
            ></button>
            <button 
                className={toolState.tool && toolState.tool.constructor.name === 'Line' ?
                "toolbar__btn line toolbar__btn-active" :
                "toolbar__btn line"
                }
                onClick={()=>{toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId))}}
            ></button>
            <button
                className={toolState.tool && toolState.tool.constructor.name === 'Eraser' ?
                "toolbar__btn eraser toolbar__btn-active" :
                "toolbar__btn eraser"
                }
                onClick={()=>{toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))}}
            ></button>
            <input type="color" className='color-picker' id='stroke' onChange={(e)=>{toolState.setStrokeColor(e.target.value)}}/>
            <label htmlFor='stroke'>Контур</label>
            <input type="color" className='color-picker' id='fill' onChange={(e)=>{toolState.setFillColor(e.target.value)}}/>
            <label htmlFor='fill'>Заливка</label>
            <button className="toolbar__btn undo" onClick={()=>canvasState.undo()}></button>
            <button className="toolbar__btn redo" onClick={()=>canvasState.redo()}></button>
            <button className="toolbar__btn broom" onClick={()=>{toolState.setTool(new Broom(canvasState.canvas))}}></button>
            <button className="toolbar__btn save" onClick={()=>useDownload()}></button>
        </div>
     );
})

export default Toolbar;