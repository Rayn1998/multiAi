import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import Layout from "@/components/Layout/Layout";
import Seedance_2_5 from "@/pages/Seedance/Seedance/Seedance_2_5";
import Auth from "@/pages/Auth/Auth";

import { authStore } from "@/pages/Auth/auth.store";

const models = ["Seedance", "Kling", "Van"];
// const models = ["Seedance"];

function App() {
  const [model, setModel] = useState<string>(models[0]);

  const auth = authStore((state) => state.apiKey);

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setModel(event.target.value);
  };

  useEffect(() => {
    if (auth === null) navigate("/auth");
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route path="auth" element={<Auth />} />
        <Route
          index
          element={
            <>
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
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
