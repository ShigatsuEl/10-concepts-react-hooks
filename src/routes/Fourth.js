import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Fourth = () => {
  const sayHello = () => console.log("hello!");
  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);
  useEffect(sayHello);
  // useEffect(sayHello, []); // deps를 빈 배열로 설정하면 어떤 버튼을 클릭해도 componentDidWillUpdate가 발생하지 않는다.
  // useEffect(sayHello, [number]); // number를 deps리스트에 지정할 시 number값이 바뀔때마다 sayHello(Effect)가 실행된다.
  return (
    <>
      <Link to="/">Back Home</Link>
      <div>
        <div>Hi! Check your console</div>
        <button onClick={() => setNumber(number + 1)}>{number}</button>
        <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
      </div>
    </>
  );
};

export default Fourth;
