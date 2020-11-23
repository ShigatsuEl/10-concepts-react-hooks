import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  if (typeof onClick !== "function") {
    return;
  }
  return element;
};

const Sixth = () => {
  const onClick = () => console.log("Click!");
  const head = useClick(onClick);
  return (
    <>
      <Link to="/">Back Home</Link>
      <div>
        <h1 ref={head}>Hi! Click this and Check your console~</h1>
      </div>
    </>
  );
};

export default Sixth;
