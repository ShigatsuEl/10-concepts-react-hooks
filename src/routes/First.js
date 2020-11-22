import React, { useState } from "react";
import { Link } from "react-router-dom";

// 리액트 훅을 사용해 함수 컴포넌트로 state 설정
function First() {
  const [state, setState] = useState(1);
  const incrementItem = () => setState(state + 1);
  const decrementItem = () => setState(state - 1);
  return (
    <>
      <Link to="/">Back Home</Link>
      <h1>Changing State By Function Component with Hook ⬇</h1>
      <div className="First">
        <h1>Hellow VSCode! {state}</h1>
        <h2>Start Learning React Hook Concept One</h2>
        <button onClick={incrementItem}>IncrementItem</button>
        <button onClick={decrementItem}>DecrementItem</button>
      </div>
      <FirstUgly />
    </>
  );
}

// 클래스 컴포넌트로 state 설정
class FirstUgly extends React.Component {
  state = {
    item: 1,
  };
  render() {
    const { item } = this.state;
    return (
      <>
        <h1>Changing State By Class Compoent ⬇</h1>
        <div className="First">
          <h1>Hellow VSCode! {item}</h1>
          <h2>Start Learning React Hook Concept One</h2>
          <button onClick={this.incrementItem}>IncrementItem</button>
          <button onClick={this.decrementItem}>DecrementItem</button>
        </div>
      </>
    );
  }
  incrementItem = () => {
    this.setState((state) => {
      return { item: state.item + 1 };
    });
  };

  decrementItem = () => {
    this.setState((state) => {
      return { item: state.item - 1 };
    });
  };
}

export default First;
