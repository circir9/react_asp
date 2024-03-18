import React, { Component } from 'react';
import "./VisitorMessageBoard.css"

class VisitorMessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      editText: '',
      isEditing: false
    };
  }

  handleDoubleClick = () => {
    this.setState({
      editText: this.state.message,
      isEditing: true
    });
  };

  handleEditChange = (event) => {
    this.setState({
      editText: event.target.value,
    });
  };

  handleEditSubmit = () => {
    const { editText } = this.state;
    const { CallbackFn } = this.props;
    const { LimitStateFn } = this.props;

    if(LimitStateFn){
      LimitStateFn(this);
    }
    else{
      CallbackFn(editText);
      this.setState({
        message: editText,
        isEditing: false
      });
    }
  };

  render() {
    const { message, editText, isEditing } = this.state;

    return (
      <div style={{position: "relative"}}>
        {isEditing ? (
          <div className='board-and-btn'>
            <div className='input-board-container' style={{width:1000}}>
              <textarea
                className='input-board-editing'
                value={editText}
                onChange={this.handleEditChange}
              />
            </div>
            <button onClick={this.handleEditSubmit}>編輯</button>
          </div>
        ) : (
          <div className='board-and-btn'>
            <div className='input-board-container' style={{width:1000}}>
              <div className="input-board" onDoubleClick={this.handleDoubleClick}>
                {message? (<pre style={{width:1000}}>{message}</pre>) : (<pre style={{width:1000}}>    </pre>)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default VisitorMessageBoard;