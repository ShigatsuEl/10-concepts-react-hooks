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

  - [✅useConfirm & usePreventLeave](#useConfirm-&-usePreventLeave)

  - [✅useBeforeLeave](#useBeforeLeave)

  - [✅useFadeIn & useNetwork](#useFadeIn-&-useNetwork)

  - [✅useScroll & useFullscreen](#useScroll-&-useFullscreen)

  - [✅useNotification](#useNotification)

  - [✅useAxios](#useAxios)

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

**[Back to the top🔼](#Concept-List)**

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

**[Back to the top🔼](#Concept-List)**

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

**[Back to the top🔼](#Concept-List)**

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

**[Back to the top🔼](#Concept-List)**

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

**[Back to the top🔼](#Concept-List)**

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

**[Back to the top🔼](#Concept-List)**

### useConfirm & usePreventLeave

일곱번째는 `useConfirm`과 `usePreventLeave`입니다. 앞의 2개는 훅이 아닙니다. useState와 useEffect를 사용하지 않기 때문입니다.<br>
훅이 아닌데도 다뤄보는 이유는 생각보다 유용하고 보다 함수형 프로그래밍답게 만들기 위해서입니다.(사실 함수나 다름없음)<br>

1. useConfirm

```
const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };
  return confirmAction;
};

const Seventh = () => {
  const deleteWord = () => console.log("Delete the World hahahaha~~");
  const abortWord = () => console.log("Are you scared?");
  const confirmDelete = useConfirm("Sure?", deleteWord, abortWord);
  return (
    <>
      <h1>Click button and Check your console!</h1>
      <button onClick={confirmDelete}>Delete the World</button>
    </>
  );
};
```

useConfirm은 사용자가 무언가를 하기전에 확인하는 것인데 예를들어 사용자가 버튼을 클릭하는 작업을 하면 이벤트를 실행하기 전에 메시지를 보여주고 싶은 것을 말한다.<br>
useConfrim은 `message(String)` `onConrim(콜백함수)` `onCancel(콜백함수)` 3가지 인자를 받는다. 그리고 confirmAction함수를 return합니다.<br>
버튼을 클릭 시, confrimAction함수는 클로저에 의해 윈도우창으로 onConfirm 또는 onCancel 콜백을 실행하여 세카이를 파괴합니다.<br>

2. usePreventLeave

```
const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);
  return { enablePrevent, disablePrevent };
};

const Seventh = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <>
      <h1>Protect Or Unprotect</h1>
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </>
  );
};
```

usePreventLeave는 window창을 닫을 때 아직 저장되지 않은 것이 남아있다면 발생하는 함수이다.<br>
usePreventLeave함수는 enablePrevent, disablePrevent 를 객체로 반환하고 클릭 시 실행되는 이벤트함수이다.<br>
중요한 것은 이벤트콜백함수 listener를 보면 event.returnValue = "";를 없애면 이것은 동작하지 않을 것이다. + 크롬만 작동<br>

**[Back to the top🔼](#Concept-List)**

### useBeforeLeave

useBeforeLeave는 기본적으로 탭을 이동할 때 실행되는 훅입니다.<br>

```
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
    <div>
      <h1>If you move mouse on the tab, Check your console!</h1>
    </div>
  );
};
```

마우스가 탭으로 이동하는 순간 콘솔로그에서 확인하실 수 있습니다.<br>

**[Back to the top🔼](#Concept-List)**

### useFadeIn & useNetwork

아홉번째 훅은 `useFadeIn`과 `useNetwork`입니다.<br>

1. useFadeIn

```
const useFadeIn = (duration = 1, delay = 0) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  if (typeof duration !== "number" || typeof delay !== "number") {
    return;
  }
  return { ref: element, style: { opacity: 0 } };
};

const Nineth = () => {
  const fadeInH1 = useFadeIn(3, 1);
  const fadeInP = useFadeIn(3, 2);
  return (
    <div>
      <h1 {...fadeInH1}>Hello!</h1>
      <p {...fadeInP}>lolem ipsum blabla~~</p>
    </div>
  );
};
```

`useFadeIn`은 useRef()훅을 사용해 h1 / p태그에 CSS opacity FadeIn효과를 주는 Hook이다.<br>
useFadeIn은 return값으로 객체를 반환하는데 스프레드 연산자를 사용해 h1 / p태그에 props를 주었다.<br>
따라서 h1태그와 p태그는 element.current값이 존재하므로 FadeIn효과가 적용될 수 있는 것이다.<br>

2. useNetwork

```
const useNetwork = (onChange) => {
  const [state, setState] = useState(navigator.onLine);
  const handleConnet = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setState(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleConnet);
    window.addEventListener("offline", handleConnet);
    return () => {
      window.removeEventListener("online", handleConnet);
      window.removeEventListener("offline", handleConnet);
    };
  }, []);
  return state;
};

const Nineth = () => {
  const handleNetworkChange = (online) =>
    console.log(online ? "We just went online" : "We are offline");
  const onLine = useNetwork(handleNetworkChange);
  return (
    <div>
      <h1>Try turn on network or off network</h1>
      <h1>{onLine ? "Online" : "Offline"}</h1>
    </div>
  );
};
```

`useNetwork`는 useState()훅을 사용하여 state초기값을 navigator.onLine을 주었다.(현재 네트워크가 연결되어있는지에 관한 boolean값)<br>
useNetwork는 실행되면 윈도우이벤트 콜백함수에 의해 setState()함수가 실행되어 network 연결이 변경될때마다 h1태그에서 Online 또는 Offline을 확인할 수 있다.<br>
또한 useNetwork는 하나의 콜백함수를 가지는데 굳이 이렇게 콜백함수를 만들어준 이유는 누군가 내가만든 훅을 사용해줄 때 콜백함수를 통해 해결하게 하기 위해서이다.<br>
여기서는 콘솔을 통해 We just went online, We are offline 둘 중 하나를 확인해볼 수 있습니다.<br>

**[Back to the top🔼](#Concept-List)**

### useScroll & useFullscreen

10번째 훅은 `useScroll`과 `useFullscreen`입니다.<br>

1. useScroll

```
const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });
  const onScroll = (e) => {
    setState({ x: window.scrollX, y: window.scrollY });
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return state;
};

const Tenth = () => {
  const { y } = useScroll();

  return (
    <>
      <div style={{ height: "1000vh" }}>
        <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>
          Hi! Try to scroll down
        </h1>
    </>
  );
};
```

scroll이벤트를 알고 있다면 어렵지 않게 사용할 수 있습니다.<br>
useState({x,y})를 가지며 스크롤Y가 100을 초과할 시 CSS color가 변경되게 useEffect를 사용했습니다.<br>

2. useFullscreen

```
const useFullScreen = (callback) => {
  const element = useRef();
  const runCb = (isFull) => { // useFullScreen함수의 콜백함수 인자를 전달해주는 함수
    if (callback && typeof callback === "function") {
      callback(isFull);
    }
  };
  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullscreen(); // element에 requestFullscreen()을 걸어준다.
      runCb(true);
    }
  };
  const exitFull = () => {
    document.exitFullscreen(); // 반대로 나올때는 document에 exitFullscreen()을 걸어준다.
    runCb(false);
  };
  return { element, triggerFull, exitFull };
};

const Tenth = () => {
  const isFullScr = (isFull) => {
    console.log(isFull ? "We are FullScr" : "We are smallScr");
  };
  const { element, triggerFull, exitFull } = useFullScreen(isFullScr);
  return (
    <>
      <div style={{ height: "1000vh" }}>
        <div ref={element}>
          <img
            src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2020/0403/IE002625830_STD.jpg"
            alt=""
          />
          <button onClick={exitFull}>Make exitFullScreen</button>
        </div>
        <button onClick={triggerFull}>Make FullScreen</button>
      </div>
    </>
  );
};
```

FullScreen버튼과 exitFullScreen버튼이 존재하고 각각 클릭 시 triggerFull & exitFull함수가 실행된다.<br>
useFullScreen함수는 콜백함수를 인자로 가지는데 이 콜백함수는 풀스크린인지 아닌지를 확인해주는 역할을 한다.<br>

**[Back to the top🔼](#Concept-List)**

### useNotification

열한번째는 `useNotification`입니다. useNotification은 훅을 사용하지 않은 함수입니다.<br>

```
const useNotification = (title, options) => {
  if (!("Notification" in window)) { // Notification은 윈도우에서만 작동하므로 그게 아니라면 함수를 종료
    return;
  }

  const fireNotif = () => {
    if (Notification.permission !== "granted") { // permission은 denied / granted / default 중 하나이다.
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };

  return fireNotif;
};
```

useNotifiation은 보는 것과 같이 useState도 useEffect도 사용하지 않았다.<br>
버튼을 클릭 시 fireNotif함수가 실행되어 새 Notification을 생성한다.<br>

**[Back to the top🔼](#Concept-List)**

### useAxios

열두번째 마지막 훅 `useAxios`입니다.<br>
기본적으로 axios는 HTTPrequest를 만드는 것을 알고있어야 합니다.<br>

```
const useAxios = (options, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({ //state를 설정하는 useState훅
    loading: true,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0); // trigger를 설정하는 useState훅

  const refetch = () => {
    setState({
      ...state, // 이렇게 하면 초기에 loading error data 모두 props로 설정 후 loading: true부분만 바뀌게 된다.
      loading: true,
    });
    setTrigger(Date.now());
  };

  useEffect(() => {
    axiosInstance(options)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]); // trigger가 변경될 때마다 axios를 발생시킴
  if (!options.url) return;

  return { ...state, refetch };
};

const Twelveth = () => {
  const { loading, error, data, refetch } = useAxios({
    url:
      "https://cors-anywhere.herokuapp.com/https://yts.am/api/v2/list_movies.json", // cors-policy 차단 회피방법
  });
  return (
    <>
      <div>
        <h1>{data && data.status}</h1>
        <h2>{loading && "Loading"}</h2>
        <button onClick={refetch}>Refetch</button> // 버튼을 누를때마다 refetch함수가 실행되어 HTTPrequest를 요청
      </div>
    </>
  );
};
```

useAxios는 2개의 useState훅을 사용합니다. 하나는 axios정보에 관한 state, 다른 하나는 refetch시키기 위한 trigger state입니다.<br>
또한 useAxios는 2개의 인자를 가지는데 하나는 url을 받기위한 인자이며 하나는 axios를 사용하기 위한 인자입니다.<br>
trigger가 변경될 때마다 refetch시키기 위해 Date.now()메서드를 사용해 trigger를 계속해서 변경할 수 있습니다.<br>

**[Back to the top🔼](#Concept-List)**

---

## Finish

실제로는 15가지의 훅을 만들어보면서 useState, useEffect 등, 많은 Hook이 어떻게 만들어졌는지 알 수 있었다.<br>
또한 함수형 프로그래밍을 사용하면서 어려운 것도 많았지만 많은 것들을 배울 수 있었다.<br>

그리고 앞서 다룬 Hooks는 몇가지 되지 않는다. 더 많은 Hook을 다뤄보며 자신의 것으로 만드는 단계가 필요할 것이다.<br>
리액트 공식 레퍼런스에 가면 아직 다루지 못한 Hook들을 알려주고 있기에 조만간 읽어보면서 직접 사용해 보려고한다.<br>

마지막으로 나는 자바스크립트를 익숙해질때까지 사용을 했기 때문에 리액트가 어렵게 다가오지 않았다.<br>
그렇기 때문에 든 생각은 바닐라 자바스크립트(기초)가 쌓이지 않으면 앞으로 어떤 라이브러리가 생겨도 사용하기 어렵겠다는 생각이 들었다.<br>
라이브러리는 그저 도구일 뿐이지 내 실력을 높이기 위해서는 바닐라 자바스크립트와 ES6를 통해 많은 것들을 만들어봐야 할 것이다.<br>
이번 Hook강의가 끝나고 리액트 멤버십으로 넘어가겠지만 그것이 끝나고 난 뒤엔 새로운 것들을 찾아서 도전하는 시도가 필요하다고 느껴지는 바이다..<br>

**[Back to the top🔼](#10-Concepts-React-Hooks)**
