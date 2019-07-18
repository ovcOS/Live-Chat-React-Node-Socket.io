import React, { useState, useContext } from 'react';
import { Context } from './ChatStore'

export default () => {
  // context
  const { allChats, processMessage, user } = useContext(Context);
  const topics = Object.keys(allChats);

  // state
  const [textValue, setTextValue] = useState('');
  const [activeChannel, setActiveChannel] = useState(topics[0]);
  const submit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="app-wrapper flex">
      <div className="sidebar">
        <h3><i>CHANNELS</i></h3>
        <ul className="topic-list">
          {topics.map((topic, i) => (
            <li key={i} className={`margin-15`} onClick={e => {setActiveChannel(e.target.innerText)}}>
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-room">
        <div className="flex align-content-center align-items-center flex-column">
          <h1>Ledgy Chat</h1>
          <h3>Channel: {activeChannel}</h3>
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
              processMessage({topic: activeChannel, from: user, msg: textValue});
              setTextValue('');
            }}
          >
            SEND
          </button>
        </form>
        <div className="chat-window"> 
          {
            allChats[activeChannel].map((chat, i) => (
              <div className="flex align-content-center align-items-center margin-15" key={i}>
                <div className="from-user">{chat.from}</div>
                <div>{chat.msg}</div>
              </div>
            ))
          }      
        </div>        
      </div>
    </div>
  )
}