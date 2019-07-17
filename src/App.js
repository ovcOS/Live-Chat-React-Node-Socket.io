import React from 'react';
import './App.css';
import ChatRoom from './ChatRoom.jsx';
import { ChatStore } from './ChatStore.jsx';

export default () => (
  <>
    <ChatStore>
      <ChatRoom />
    </ChatStore>
  </>
);

