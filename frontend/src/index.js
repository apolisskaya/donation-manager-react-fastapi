import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { createRoot } from 'react-dom/client';

import Main from './Components/Main'

import './index.css';

function App() {
  return (
    <div className="app-container">
      <div className="header">
        <h1>Open Seattle Shelter</h1>
      </div>
      <main>
        <div className="component-content">
          <Main />
        </div>
      </main>
    </div>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App tab="home" />);