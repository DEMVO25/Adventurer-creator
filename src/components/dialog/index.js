import "./dialog.css";

function Dialog({ open, title, children, closeForm }) {
  return (
    <dialog className={open ? "dialog" : "dialog-closed"}>
      <div className="dialog-content">
        <button onClick={() => closeForm()}>X</button>
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    </dialog>
  );
}

export default Dialog;
