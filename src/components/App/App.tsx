import { useState } from "react";

import Layout from "@/components/Layout/Layout";
import Seedance_2_5 from "@/pages/Seedance/Seedance_2_5/Seedance_2_5";

const models = ["Seedance", "Kling", "Van"];
// const models = ["Seedance"];

function App() {
  const [model, setModel] = useState<string>(models[0]);

  const handleChange = (event: any) => {
    setModel(event.target.value);
  };
  return (
    <div className="app">
      <select
        value={model}
        onChange={handleChange}
        style={{ fontSize: "1.5rem" }}
      >
        {models.map((model, i) => {
          return (
            <option key={i} value={model}>
              {model}
            </option>
          );
        })}
      </select>
      <Layout>{model === "Seedance" && <Seedance_2_5 />}</Layout>
    </div>
  );
}

export default App;
