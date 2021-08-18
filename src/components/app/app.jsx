import React, { useState } from 'react';
import './app.scss';
import { findAllByKey } from '../../utils/const';

const App = () => {

  const initialState = {
    data: [],
    fileName: ``,
  };

  const [state, setState] = useState(initialState);

  const dropHandler = (evt) => {
    evt.preventDefault();
    const file = evt.dataTransfer.files[0];

    if (!file.type.match(`application/json`)) {
      alert(`This is not JSON`);
    }

    const reader = new FileReader();
    reader.onloadend = function () {
      const data = JSON.parse(this.result);
      let users = Array.from(new Set(findAllByKey(data, `user`))).sort();
      setState({
        fileName: file.name,
        data: users
      });
    };
    reader.readAsText(file);
  };

  const dragStartOverHandler = (evt) => {
    evt.preventDefault();
  };

  const dragLeaveHandler = (evt) => {
    evt.preventDefault();
  };

  const removeUserHandler = (evt) => {
    const username = evt.target.dataset.name;
    const newData = state.data.filter((user) => user !== username);
    setState({
      ...state,
      data: newData
    });
  };

  return (
    <div className="wrapper"
      onDrop={dropHandler}
      onDragStart={dragStartOverHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragStartOverHandler}>
      {!state.data.length && <div className="drop-block block">Drop here</div>}
      {state.data.length > 0 && <div className="list-block block">
        <p>{state.fileName}</p>
        <ul>
          {state.data.map((name) => {
            return <li key={name}>{name}<button onClick={removeUserHandler} data-name={name} type="button"></button></li>;
          })}
        </ul>
      </div>}
    </div>
  );
};

export default App;
