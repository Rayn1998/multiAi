import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router";

import { authStore } from "@/pages/Auth/auth.store";

const Auth = () => {
  const [value, setValue] = useState<string>("");

  const setAuthKey = authStore((state) => state.setApiKey);

  const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (value.length > 5) {
      setAuthKey(value);
      setValue("");
      navigate("/");
      return;
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <p>Enter your API-KEY, please: </p>
      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        minLength={5}
        required
      />
      <button type="submit">ENTER</button>
    </form>
  );
};

export default Auth;
