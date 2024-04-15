import React from "react";
import ReactDOM from "react-dom/client";
import "./GlobalStyle/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./StoreProvider/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <App />
      </Provider>
    </DndProvider>
  </React.StrictMode>
);

reportWebVitals();
