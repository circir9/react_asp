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

    CallbackFn(editText);
    this.setState({
      message: editText,
      isEditing: false
    });
  };

  render() {
    const { message, editText, isEditing } = this.state;

    return (
      <div style={{margin: 2, width:800}}>
        {isEditing ? (
          <div className='board-and-btn'>
            <div className='input-board-container' style={{width:650}}>
              <textarea
                style={{width:700}}
                className='input-board-editing'
                value={editText}
                onChange={this.handleEditChange}
              />
            </div>
            <button onClick={this.handleEditSubmit}>編輯</button>
          </div>
        ) : (
          <div className='board-and-btn'>
            <div className='input-board-container' style={{width:650}}>
              <div className="input-board" onDoubleClick={this.handleDoubleClick}>
                <pre style={{width:700}}>{message}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default VisitorMessageBoard;