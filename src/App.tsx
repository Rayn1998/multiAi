import { useState } from "react";

import Layout from './components/Layout/Layout'
import Seedance from "./components/Seedance/Seedance";

import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

import './App.css'

const models = ["Seedance", "Kling", "Van"];

function App() {
  const [model, setModel] = useState<string>(models[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };
  return (
    <div className="app">
    
    <Layout>
       <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={model}
          label="Age"
          onChange={handleChange}
          style={{fontSize: "2rem", flex: 1}}
        >
          {models.map((model, i) => {
            return <MenuItem id={i} value={model}>{model}</MenuItem>
          })}
        </Select>
        {model === "Seedance" && <Seedance/>}
    </Layout>
    </div>
  )
}

export default App
