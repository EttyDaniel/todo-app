import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import { Client, BrowserSessionStorageType } from "@gadget-client/todoapp";
import { Provider} from "@gadgetinc/react";

export const api = new Client({
  authenticationMode: { 
    apiKey: "gsk-V4jyPzVC7jggVTFnAn43qMe3aQKxi7Jb",
    BrowserSession: {
      storageType:
        BrowserSessionStorageType.Durable,
    },
  }
});



const DATA = [
  {id: "todo-0", name: "Go to the Bank", completed: true},
  {id: "todo-1", name: "Buy supplies for the party", completed: false},
  {id: "todo-2", name: "Finish reading Lord of the Rings' book", completed: false}
];


    

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider value={api.connection.currentClient}>
    <App App tasks={DATA}/>
    {/* <App/> */}
  </Provider>
);
