import React, { createContext, useReducer } from 'react';

export const Context = createContext();

const initialState = {
    general: [
    {from: 'uri', msg: 'yo!'},
    {from: 'pep', msg: 'wassup'},
    {from: 'jane', msg: 'suppp'}
    ],
    code: [
      {from: 'nena', msg: 'cici'},
      {from: 'joe', msg: 'heyaa'},
      {from: 'jane', msg: 'here again'}
    ]
}

const reducer = (state, action) => {
  const { topic, from, msg } = action.payload;
  switch(action.type) {
    case 'RECEIVE_MESSAGE':
        return {
          ...state,
          [topic]: [
            ...state[topic],
            {
              from,
              msg
            }
          ]
        }
    default:
      return state
  }
}

export const Store = (props) => {
  const reducerHook = useReducer(reducer, initialState);
  return (
    <Context.Provider value={reducerHook}>
      {props.children}
    </Context.Provider>)
}