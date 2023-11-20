import toolState from '../store/toolState';
import '../styles/toolbar.scss'

function SettingBar() {
    return (
    <div className="toolbar setting-bar">
        <input
            type="number" 
            defaultValue={1} 
            name="width" 
            id="line-width" 
            min={1} 
            max={50} 
            onChange={(e)=>toolState.setLineWidth(e.target.value)}/>
        <label htmlFor='line-width'>Толщина контура</label>
    </div>
    );
}

export default SettingBar;