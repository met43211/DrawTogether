import { observer } from 'mobx-react-lite';
import '../styles/canvas.scss'
import { useEffect, useState } from 'react';
import canvasState from '../store/canvasState';
import { useRef } from 'react';
import Modal from './Modal';
import {useParams} from 'react-router-dom'
import useDraw from '../hooks/useDraw';
import useConnect from '../hooks/useConnect';
import toolState from '../store/toolState';
import axios from 'axios';

const Canvas = observer(()=>{
    const canvasRef = useRef()
    const [modal, setModal] = useState(true)
    const {id} = useParams()
    useEffect(()=>{
        canvasState.setCanvas(canvasRef.current)
        toolState.setId(id)
        axios.get(`http://localhost:5000/image?id=${id}`)
        .then(response=>canvasState.setStartPicture(response.data))
    },[])
    useEffect(()=>{
        if(canvasState.username){
            const socket = useConnect(id)
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch(msg.method){
                case 'connection':
                    console.log(`Пользователь ${msg.username} присоединился`)
                    break
                case 'draw':
                    drawHandler(msg)
                    break
               }
            }
        }
    }, [canvasState.username])
    function drawHandler(msg){
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        useDraw(figure, ctx)
    }
    function onMouseDownHendler(){
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
    return ( 
        <div className="canvas">
            {modal&&<Modal setModal={setModal}/>}
            <canvas ref={canvasRef} onMouseDown={()=>onMouseDownHendler()} width={600} height={400}></canvas>
        </div>
     );
})

export default Canvas;