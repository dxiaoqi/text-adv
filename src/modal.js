const Modal = props => {

  function closeModal(e) {
    e.stopPropagation()
    props.closeModal()
  }
  
  const divStyle = {
    display: props.displayModal ? 'block' : 'none',
  };

    return (
      <div 
        className="modal"
        onClick={ closeModal }
        style={divStyle}>

        <div className="modal-content"
          onClick={ e => e.stopPropagation() }>
          
          <span 
            className="close"
            onClick={ closeModal }>&times;
          </span>

          <div className="modal-flex">
            {props.displayInfo()}
          </div>

        </div>

      </div>
    );
}

export default Modal
