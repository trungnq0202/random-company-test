import './Modal.css';


export const Modal = (props) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {props.children}
                <button className="close-btn btn-primary" onClick={props.onSubmitHandler}>Done</button>
            </div>
        </div>
    ) : "";
}