import React from 'react';
import './App.css';
import ChatRoom from './ChatRoom.jsx';
import { Store } from './Store.jsx';

export default () => (
  <>
    <Store>
      <ChatRoom />
    </Store>
  </>
);

