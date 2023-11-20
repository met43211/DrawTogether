import canvasState from "../store/canvasState"

const useDownload = ()=>{
    const dataUrl = canvasState.canvas.toDataURL()
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = canvasState.sessionId + ".jpg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
export default useDownload