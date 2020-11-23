import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const useBeforeLeave = (onBefore) => {
  const handleLeave = (event) => {
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handleLeave);
    return () => document.removeEventListener("mouseleave", handleLeave);
  }, []);
  if (typeof onBefore !== "function") {
    return;
  }
};

const Eighth = () => {
  const beforeLeave = () => console.log("Plz don't leave :(");
  useBeforeLeave(beforeLeave);
  return (
    <>
      <Link to="/">Back Home</Link>
      <div>
        <h1>If you move mouse on the tab, Check your console!</h1>
      </div>
    </>
  );
};

export default Eighth;
