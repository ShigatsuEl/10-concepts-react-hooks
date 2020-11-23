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

  - [✅useTabs](#useTabs)

- [✅useEffect](#useEffect)

  - [✅useTitle](#useTitle)

  - [✅useClick](#useClick)

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

### useTabs

세번째 훅은 `useTabs`이다. 우리가 할 것은 단지 Tab을 눌렀을 때 state를 change하는 것이다.<br>

먼저 어떤 API 혹은 다른 무언가로부터 가져오고 싶은 것이 있다고 가정하자.<br>

```
const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1",
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2",
  },
];

단지 배열일 뿐이다. 쫄지마라.
```

```
// 리액트 훅 useState를 사용한 useTabs함수
const useTabs = (initialTab, allTabs) => {
  const [index, setIndex] = useState(initialTab);
  if (!allTabs || !Array.isArray(allTabs)) { // 받은 배열이 배열인지 확인하기 위함(false -> return으로 함수종료)
    return;
  }
  return {
    currentItem: allTabs[index],
    changeItem: setIndex,
  };
};

// Third 컴포넌트
const Third = () => {
  const { currentItem, changeItem } = useTabs(0, content);
  return (
    <div>
      {content.map((section, index) => (
        <button onClick={() => changeItem(index)}>{section.tab}</button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};
```

앞에서 다 설명해서 할 부분이 없을 것 같다.<br>
useTabs함수는 initialTab과 allTabs를 인자로 받는다. <-> useTabs 안의 useState()는 마찬가지로 index(state)와 setIndex(setState)를 가진다.<br>
useTabs함수는 currentItem(현재 클릭된 아이템)과 changeItem(setIndex)을 객체로 반환<br>
클릭을 하게될 시 state(index)가 바뀌게 되어 현재 클릭된 아이템 또한 바뀌게 되고 클릭된 아이템의 content가 새로 rendering 하게 된다.<br>

### useEffect

네번째 훅은 `useEffect`이다. useEffect는 아주 많은 use를 가지고 있다.<br>
이 말은 useEffect는 `componentWillUnmount` `componentDidMount` `componentWillUpdate`와 아주 비슷하다.<br>
React Hooks로 작업을 하게 된다면 앞에서 말한 3가지 함수들은 아주 중요한 역할을 할 것이다.<br>
예시를 봅시다.<br>

```
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
```

useEffect는 2개의 인자를 받는다.<br>

```
1️⃣Effect Function -> 상태가 변할때마다 실행될 함수이다.(componentDidMout역할)(필수)
2️⃣Deps List -> Deps List에 있는 조건을 만족할때마다 Effect Function을 실행시킬 것이다.(componentWillUpdate역할)(선택)
```

Fourth 컴포넌트에서 useEffect(sayHello)를 실행하면 component가 `componentWillUnmount` `componentDidMount` `componentWillUpdate`상태로 바뀔 때마다 실행됩니다.<br>
그런데 만약 Deps List에 조건을 주어 useEffect(sayHello, [number])처럼 하게되면 number가 바뀌는 조건하에 sayHello함수가 실행될 것입니다.<br>
마치 클래스 컴포넌트에서 componentWillUpdate가 발생하는 것과 똑같은 역할을 하게 되죠. 그렇기 때문에 Deps List를 빈 배열[]로 두게되면 조건에 맞는 것이 없어 sayHello를 업데이트 할 때마다 실행시키지 않을 것 입니다.<br>

useEffect는 이것만 기억하자 -> `useEffect는 componentDidMount도 하며 componentWillUpdate도 하고 componentWillUnmount도 한다는 것이다.`<br>

### useTitle

다섯번째 훅은 `useTitle`입니다. useState와 useEffect를 써서 html title값을 변경하는 훅입니다.<br>
useState와 useEffect를 이해하고 있다면 매우 쉽습니다.<br>

```
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.textContent = title;
  };
  useEffect(updateTitle);
  return setTitle;
};

const Fifth = () => {
  const titleUpdate = useTitle("Loading...");
  setTimeout(() => titleUpdate("useTitle Page"), 5000);
  return (
    <div>
      <h1>Hi! check your title~</h1>
    </div>
  );
};
```

useState 훅의 인자로 title과 setTitle을 설정하였습니다.<br>
그리고 useEffect의 Effect함수 updateTitle을 통해 title을 변경할 수 있습니다.<br>

useTitle함수는 title값을 변경할 수 있는 함수 setTilte을 return합니다.<br>
Fifth 컴포넌트에서 useTitle return값을 받아와 5초후에 titleUpdate함수를 실행시켜 "Loading..."에서 "useTitle Page"로 변경되는 것을 확인할 수 있습니다.<br>

### useClick

여섯번째 훅은 `useClick`입니다. useClick은 클릭을 할 시 발생하는 간단한 훅입니다.<br>
useClick을 설명하기 전에 reference를 먼저 알아야 한다.<br>
아래 예시를 봅시다.<br>

```
const Sixth = () => {
  const element = useRef();
  setTimeout(() => console.log(element));
  return (
    <div>
      <h1 ref={element}>Hi! Click this and Check your console~</h1>
    </div>
  );
};

result
{current: h1 .....};
```

reference는 기본적으로 우리의 component의 어떤 부분을 선택할 수 있는 방법이다.<br>
useRef()훅을 사용하며 이것을 element에 저장했습니다. h1태그에서 ref={element}를 함으로써 element는 이제 h1태그를 참조할 수 있게 된 것입니다.<br>
예시에서 setTimeout을 통해 콘솔로그해보면 element값이 객체로 출력되는데 current key값에 h1이 저장되어 있는 것을 확인할 수 있습니다.<br>
쉽게 말해 useRef()는 바닐라 자바스크립트에서 마치 document.getElementById()를 사용한 것과 동등한 역할을 하는 것을 알 수 있다.<br>

```
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
```

useRef()의 개념을 이해했다면 위의 useClick()훅을 살펴보자.<br>
useRef()가 useClick() => head => h1 순서대로 참조를 하며 h1태그를 사용할 수 있다.<br>
useClick()훅의 useEffect()에서 element.current가 존재(component가 mount된 시점)할 때 클릭이벤트를 생성하는 것을 알 수 있다.<br>
중요한 것은 Deps List를 빈 객체로 두었는데 Deps List를 빈 객체로 두지 않으면 componentWillUpdate 시점에도 이벤트를 계속 추가할 것이기 때문이다.<br>

이번 훅에서는 지난 훅에서 다뤄보지 않은 componentWillUnMount를 처리할 것 입니다.<br>
componentWillUnmout는 useEffet함수의 첫번째 인자 Effect에서 return으로 실행할 수 있다.<br>
다시 설명하면 return하게 되는 순간 componentWillUnMount 때 호출될 것이다. 여기서는 이벤트를 제거하는 것을 확인할 수 있습니다.<br>
