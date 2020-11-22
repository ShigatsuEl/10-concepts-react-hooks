# 10 Concepts React Hooks

## Description

Let's learn 10 React Hook concepts in practice

---

## What is Hooks?

React Hook은 React의 신박한 기능인데 결론적으로 말하면 function component가 state를 가질 수 있게 해준다.<br>
즉, hooks는 react의 state machine에 연결하는 기본적인 방법이다.<br>
또한 앱을 리액트 훅으로 만든다면 class component & didMount & render과 같은 작업을 하지 않아도 된다는 것이다.<br>
이는 function programming(함수형 프로그래밍)이 가능하게 해줍니다.<br>

## Concept List

- [✅useState](#useState)

### useState

첫번째 훅인 useState()는 항상 2개의 value를 가진 배열을 return합니다.<br>
첫번째 인자는 state이고 두번째 인자는 setState역할을 하는 함수이다. 꼭 이름이 state & setState가 되어야 하는 것은 아니다.<br>

```
import

const [state, setState] = useState();

여기서 useState는 초기에 state를 initialState로 설정할 수 있는 옵션을 줍니다.
ex) const [state, setState] = useState(1);

그리고 useState의 2가지 value를 항상 지정하는 것은 아니며 원한다면
const [state] = useState(1)[0];
const [setState] = useState(1)[1];
와 같이 설정해줄수도 있다.
```

useState() 훅을 사용해 state를 설정하는 방법은 다음과 같다.<br>

```
function First() {
  const [state, setState] = useState(1);
  const incrementItem = () => setState(state + 1);
  const decrementItem = () => setState(state - 1);
  return (
    <>
      <Link to="/">Back Home</Link>
      <div className="First">
        <h1>Hellow VSCode! {state}</h1>
        <h2>Start Learning React Hook Concept One</h2>
        <button onClick={incrementItem}>IncrementItem</button>
        <button onClick={decrementItem}>DecrementItem</button>
      </div>
    </>
  );
}
```

위 코드는 리액트 훅이 나오고나서 가능한 코드이다.<br>
만약 리액트 훅을 사용할 수 없었던 예전이라면 class component를 사용하여 state를 변경할 수 있었다.<br>

```
이 클래스 컴포넌트는 위에 있는 함수형 컴포넌트에서 사용한 코드와 똑같은 역할을 한다.

class FirstUgly extends React.Component {
  state = {
    item: 1,
  };
  render() {
    const { item } = this.state;
    return (
      <div className="First">
        <h1>Hellow VSCode! {item}</h1>
        <h2>Start Learning React Hook Concept One</h2>
        <button onClick={this.incrementItem}>IncrementItem</button>
        <button onClick={this.decrementItem}>DecrementItem</button>
      </div>
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

코드 길이부터 차이가 나는 것을 볼 수 있다. 만약에 코드길이가 더 길어진다면 차이는 더 벌어질 것이다.
이렇게 훅 하나가 state 설정을 매우 간편하게 해주는 것을 도와주는 것을 알 수 있습니다.
```
