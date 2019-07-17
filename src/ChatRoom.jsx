import React, { useState, useContext } from 'react';
import { Context } from './ChatStore'

export default () => {
  // context
  const { allChats, processMessage, user } = useContext(Context);
  const topics = Object.keys(allChats);

  // state
  const [textValue, setTextValue] = useState('');
  const [activeTopic, setActiveTopic] = useState(topics[0]);

  const submit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="wrapper">
      <h1>Ledgy Chat</h1>
      <h3>Channel: {activeTopic}</h3>
      <div className="chat-window"> 
        {
          allChats[activeTopic].map((chat, i) => (
            <div className="flex" key={i}>
              <div>{chat.from}:</div>
              {' '}
              <div>{chat.msg}</div>
            </div>
          ))
        }      
      </div>
      <form
        className="form flex justify-content-center align-items-center"
        onSubmit={e => submit(e)}
      >
        <input
          className="chat-window"
          placeholder="type something..."
          value={textValue}
          onChange={e => setTextValue(e.target.value)}        
        >
        </input>
        <button 
          className="send-button"
          style={{marginLeft: '15px'}}
          onClick={() => {
            processMessage({topic: activeTopic, from: user, msg: textValue});
            setTextValue('');
          }}
        >
          SEND
        </button>
      </form>
      <div>
        <ul className="topic-list">
          {topics.map((topic, i) => (
            <li key={i} onClick={e => setActiveTopic(e.target.innerText)}>
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}