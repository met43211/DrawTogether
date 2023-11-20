import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"

const useConnect = (id)=>{
    const socket = new WebSocket('ws://localhost:5000/')
    canvasState.setSocket(socket)
    canvasState.setSessionId(id)
    toolState.setTool(new Brush(canvasState.canvas, socket, id))
    socket.onopen = () => {
        console.log('Подключение установлено')
        socket.send(JSON.stringify({
            id,
            username: canvasState.username,
            method: 'connection',
        }))
    }
    return socket
}
export default useConnect