import { useState } from "react";

import Layout from './components/Layout/Layout'
import Seedance from "./components/Seedance/Seedance";

import './App.css'

const models = ["Seedance", "Kling", "Van"];

function App() {
  const [model, setModel] = useState<string>(models[0]);

  const handleChange = (event: any) => {
    setModel(event.target.value);
  };
  return (
    <div className="app">
    
    <Layout>
       <select
          value={model}
          onChange={handleChange}
        >
          {models.map((model, i) => {
            return <option key={i} value={model}>{model}</option>
          })}
        </select>
        {model === "Seedance" && <Seedance/>}
    </Layout>
    </div>
  )
}

export default App
