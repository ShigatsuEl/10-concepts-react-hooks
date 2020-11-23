# 10 Concepts React Hooks

## Description

Let's learn 10 React Hook concepts in practice

---

## What is Hook?

React Hook은 React의 신박한 기능인데 결론적으로 말하면 function component가 state를 가질 수 있게 해준다.<br>
즉, hooks는 react의 state machine에 연결하는 기본적인 방법이다.<br>
또한 앱을 리액트 훅으로 만든다면 class component & didMount & render과 같은 작업을 하지 않아도 된다는 것이다.<br>
이는 function programming(함수형 프로그래밍)이 가능하게 해줍니다.<br>

## Concept List

- [✅useState](#useState)

- [✅useInput](#useInput)

### useState

첫번째 훅인 `useState`는 항상 2개의 value를 가진 배열을 return합니다.<br>
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

### useInput

두번째 훅은 `useInput`이다. useInput은 기본적으로 input을 업데이트 하는 훅이다.<br>

아래는 input을 업데이트하고 검증하는 훅이다.<br>

```
// useInput 함수
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
  return { value, onChange }; // useInput함수는 value와 onChange를 객체로 리턴한다.
};

// Second 컴포넌트
const Second = () => {
  const maxLen = (value) => value.length <= 10;
  const name = useInput("Mr.", maxLen);
  return (
    <>
      <Link to="/">Back Home</Link>
      <div>
        <h1>Hello!</h1>
        <input placeholder="Name" {...name} />
        // 중요한 점은 name객체에 있는 것을 하나하나 풀어주지만 onChange이벤트 콜백함수를 onChange로 지어주지 않으면 ...(스프레드)는 작동하지 않는다.
      </div>
    </>
  );
};
```

첫번째 훅과 다른점은 컴포넌트 안에서 전부 처리하지 않았다는 점이다.<br>
보시다시피 Second컴포넌트와 useInput함수 2개로 나누어서 했는데 useInput에서 onChange이벤트를 핸들링하는 것을 알 수 있다.<br>
원래 클래스 컴포넌트나 함수 컴포넌트는 이렇게 하는 것이 불가능하다. 같은 영역 내에서만 핸들링할 수 밖에 없었다.<br>
그러나 훅을 사용하면 완전히 다른 영역에서 이벤트를 핸들링하는 것이 가능하고 위에서 이것이 가능하게 하는 이유는 useState훅을 useInput함수 내에 만들어줬기 때문이다.<br>
useState내에는 state를 업데이트 할 수 있는 setState 함수를 가지고 있기 때문에 어디에서든지 state를 훅 끌어올리는 것이다.<br>

위의 코드를 간단히 설명하고 넘어가자면 useInput함수 내에 useState훅을 사용하고 useInput함수가 value와 onChange를 객체로 리턴했다.<br>
반환된 value와 onChange이벤트를 input에 적용하여 항상 업데이트 할 수 있게 하였다.<br>
여기서 우리는 useInput의 2번째 파라미터(validator)를 검사하는 것을 볼 수 있는데 validator는 함수인지 확인하고 return값이 true인지 false인지 판단하여 setValue를 할 수 있게 하였다.<br>
처음 보면 로직이 어떻게 짜여진지 알아보기 힘든데 천천히 따라가다보면 결국 함수와 함수사이의 연결이라는 것을 확인할 수 있을 것이다.<br>
