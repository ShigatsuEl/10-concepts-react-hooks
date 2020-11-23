import React, { useState } from "react";
import { Link } from "react-router-dom";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const Second = () => {
  const maxLen = (value) => value.length <= 10;
  const name = useInput("Mr.", maxLen);
  return (
    <>
      <Link to="/">Back Home</Link>
      <div>
        <h1>Hello!</h1>
        <input placeholder="Name" {...name} />
      </div>
    </>
  );
};

export default Second;
