import '../styles/modal.scss'
import { useRef } from "react";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";

const Modal = observer(({setModal})=>{
    const usernameRef = useRef()
    const connectHandler = ()=>{
        if(usernameRef.current.value!=''){
            canvasState.setUserName(usernameRef.current.value)
            setModal(false)
        }
    }
    return ( 
        <div className="modal-wrapper">
            <div className="modal">
                <form onSubmit={()=>connectHandler()}>
                    <input
                        ref={usernameRef}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Введите имя..."
                    />
                    <div
                        className="modal__btn"
                        onClick={()=>connectHandler()}
                    >
                        Войти
                    </div>
                </form>
            </div>
        </div>
     );
})

export default Modal;