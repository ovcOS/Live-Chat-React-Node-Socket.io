import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';
import { generateId } from './helpers';


export const Context = createContext();

const initialState = {
    general: [
    {from: 'Marius', msg: "It's 10.31. Sprint meeting!!"},
    {from: 'Jules', msg: 'Coffee?'},
    {from: 'Ben', msg: 'Yes please 😴'}
    ],
    random: [
      {from: 'Jahlela', msg: 'Found a sick tune 🎸'},
      {from: 'Timo', msg: 'Space jungle? 🌳'},
      {from: 'Spela', msg: 'Space what?'},
      {from: 'Yoko', msg: 'No music till 6pm folks 👮‍♀️'}
    ]
}

const reducer = (state, action) => {
  const { topic, from, msg } = action.payload;
  console.log(from);
  console.log({state});
  switch(action.type) {
    case 'RECEIVE_MESSAGE':
        return {
          ...state,
          [topic]: [
            ...state[topic],
            { from, msg }
          ]
        }
    default:
      return state
  }
}

let socket;

const processMessage = value => {
  socket.emit('chat message', value)
}

export const ChatStore = (props) => {
  const [ allChats, dispatch ] = useReducer(reducer, initialState);
  const user = `user${generateId()}`;
  if (!socket) {
    socket = io(':8000');
    socket.on('chat message', msg => {
      dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
    })
  }
  return (
    <Context.Provider value={{ allChats, processMessage, user }}>
      {props.children}
    </Context.Provider>)
}