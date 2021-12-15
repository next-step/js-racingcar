<br/>
<p align="middle" >
  <img width="200px;" src="https://user-images.githubusercontent.com/50367798/106415730-2645a280-6493-11eb-876c-ef7172652261.png"/>
</p>
<h2 align="middle">자동차 경주 게임</h2>
<p align="middle">자바스크립트와 Cypress로 구현 하는 자동차 경주 게임</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

## 주안점
- 순수 JS를 이용해 상태관리 모듈을 흉내 내보았습니다.
- state 변경을 다루는 부분에서 Proxy를 사용했습니다. 
  - Proxy의 set 트랩을 이용해 state가 mutation이 아닌 방법으로 변경되는 것을 방지했습니다. 
- redux-logger와 같은 역할을 하는 기능을 만들기 위해 state Proxy 내부에 `console.groupCollapsed();`, `console.groupEnd();`
  을 이용했습니다.
- Pub/Sub 패턴을 적용한 `PubSub` 클래스에서 이벤트를 `subscribe` 하고, `publish` 합니다.
- 흐름은 `dispatch(action) → commit → mutation(데이터 변경)` 이런 식 입니다. 
- Component `render()` 에서 template literals 을 사용해 JSX 처럼 동작하게끔 구현했습니다.

## 🔥 구현해야하는 Projects 예시
<p align="middle">
  <img width="400" src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/7c76e809d82a4a3aa0fd78a86be25427">
</p>

<p align="middle">
  <a href="https://next-step.github.io/js-racingcar/">🖥️ 데모 링크</a>
</p>

## 🔥 요구사항
NEXTSTEP 미션 요구사항에 따라 main branch의 요구 사항을 변경했습니다.

### 🎯 step1
- [x] 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
- [x] 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- [x] 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
- [x] 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
- [x] 전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.


### 🎯🎯 step2
- [ ] 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
- [ ] 우승자가 여러명일 경우 ,를 이용하여 구분한다.

### 🎯🎯🎯 step3
- [ ] 자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.
  - [ ] 애니메이션 구현을 위해 setInterval, setTimeout, requestAnimationFrame 을 활용한다.
- [ ] 정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.

# 배운내용

## 1. Proxy

- 특정 객체를 감싸는 프로퍼티 읽기, 쓰기와 같은 객체에 가해지는 작업을 중간에 가로채는 객체
- 가로채진 작업은 Proxy 자체에서 처리되기도 하고,
  원래 객체가 처리하도록 그대로 전달되기도 한다.
- 다양한 라이브러리와 몇몇 브라우저 프레임워크에서 사용

### 문법

```jsx
let proxy = new Proxy(target, handler)
```

- `target`: 감싸게 될 객체로, 함수를 포함한 모든 객체 가능
- `handler`:
  - **동작을 가로채는 메서드인 trap이 담긴 객체.**
  - 여기서 프락시 설정을 한다
  - ex) `get`  `trap`은 `target`의 프로퍼티를 읽을 때,
    `set` `trap`은 target의 프로퍼티를 쓸 때 활성화

#### handler의 유무에 따른 차이

- handler가 비어있다면(트랩이 없다면)
  - Proxy 인스턴스 값에 접근하면 → target 데이터에 접근
  - proxy 인스턴스 값에도 추가되고, target 데이터에도 추가되고
  - 즉 `proxy.test` 와 `target.test` 가 같은 느낌

    ```jsx
    let target = {}
    let handler = {}
    const proxy = new Proxy(target, handler);
    
    proxy.test = 5;
    alert(target.test) // 5 - target에 새로운 프로퍼티 생성
    alert(proxy.test) // 5 - 프락시를 사용해 값 읽을 수 있음
    ```

- handler에 작업과 상응하는 트랩이 있다면
  - 트랩이 실행되어 프락시가 이 작업을 처리 할 기회를 얻는다

### get 트랩으로 프로퍼티 기본 값 설정하기

- dictionary 에 없는 값이면 → 기본 값을 리턴하도록

`get(target, key, receiver)`

```jsx
let dictionary = {
  Hello: "안녕하세요",
  Bye: "안녕히 가세요"
};

dictionary = new Proxy(dictionary, {
  get(target, key) {
    // 프로퍼티를 읽기를 가로챕니다.
    console.log("target", target); //dictionary
    console.log("phrase", key); //'Hello' 또는 '없는 단어'
    if (key in target) {
      // 조건: 사전에 구절이 있는 경우
      return target[key]; // 번역문을 반환합니다
    } else {
      // 구절이 없는 경우엔 구절 그대로를 반환합니다.(기본 값 사용)
      return key;
    }
  }
});

console.log(dictionary["Hello"]); // 안녕하세요
console.log(dictionary["없는 단어"]); // 없는단어
```

## set 트랩으로 프로퍼티 값 검증하기

### set트랩 사용시 꼭 지켜야하는 규칙

- 값을 쓰는 게 성공했을 때 → true 리턴
- true를 반환하지 않았거나 falsy한 값을 반환하면 → `TypeError` 발생

`set(target, key, value, receiver)`:

```jsx
let numbers = [];

numbers = new Proxy(numbers, { // (*)

  **set(target, key, val)** { 

    if (typeof val == 'number') {
      target[key] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // 추가가 성공했습니다.
numbers.push(2); // 추가가 성공했습니다.
alert("Length is: " + numbers.length); // 2

numbers.push("test"); // Error: 'set' on proxy

alert("윗줄에서 에러가 발생했기 때문에 이 줄은 절대 실행되지 않습니다.");
```

- 여전히 배열 관련 기능 사용 가능 (`length` 등)

## 2. Publish/Subscribe Pattern
- 웹 애플리케이션은 선형적으로 동작하는 일이 거의 없음.
- 네트워크 이벤트, 사용자 조작, 타이밍이 설정된 동작 등 여러 종류의 비동기적인 동작에 적절하게 응답해야 함.
- 비동기 코드를 어느 부분에 둬야 하지? ㅜㅜ

  **→ 비동기 코드를 앱의 한 부분에서 실행해 처리하고 다른 부분으로 보내자!**


### 코드 분리의 성배(Holy grail)

![Screen Shot 2021-12-06 at 4.17.27 PM.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/673ef39b-ca41-4584-a247-417b5bd8d275/Screen_Shot_2021-12-06_at_4.17.27_PM.jpg)

- 단일 책임 원칙 위배하지 않음.
- 서비스 파일은 로컬 스토리지와 동기화를 하는 등의 메커니즘과 관심사를 다루는 책임을 갖게 된다.
- 컴포넌트들은 인터페이스 부분만 담당

  **→ SOLID한 구조**

- JS는 first-class citizens(일급객체)
  - 어떠한 함수도 변수에 할당 할 수 있고, 다른 함수의 인자로 넘길 수 있다.
  - 이 속성을 이용해 subscribe, publish 한다.
- 서비스 쪽에 함수를 기억할 수 있는 공간을 마련해두고 특정한 시점에 실행되도록 한다
- subscriber: 이벤트의 수신자
- publisher: 이벤트 발생자

- `element.addEvenListener(action, callback)` 의 형태와 매우 유사한 pub/sub 패턴.
- 특정 이벤트에 어떤 함수를 **구독하게** 만들고,  ****DOM 요소에 의해 액션이 **발행되면** 그 함수가 호출.

```jsx
//createHelloMessage 를 구독(Sub)
$submitButton.addEventListner('click', () => {
 createHelloMessage();
})

// $submitButton을 클릭하면 -> 발행(Pub) -> 함수 호출 
```

```jsx
/* dataService.js */
**function publish(data) {
  changeListeners.forEach(changeListener => changeListener(data));
}**

// ...

export function addPlace(latLng) {
  geocoder.geocode({location: latLng}, function(results) {
    try {
      const cityName = results
        .find(result => result.types.includes('locality'))
        .address_components[0]
        .long_name;
      
			myPlaces.push({position: latLng, name: cityName});
      
			**publish(myPlaces);**
      // ...
    }
  // ...
}
```

```jsx
/* sidebar.js (컴포넌트 역할)*/
import { getPlaces, subscribe } from './dataService';

function renderCities(placesArray) {
  const cityListElement = document.getElementById('citiesList');
  cityListElement.innerHTML = '';
  
	// getPlaces 함수 호출을 placesArray로 교체
  placesArray.forEach(place => {
    const cityElement = document.createElement('div');
    cityElement.innerText = place.name;
    cityListElement.appendChild(cityElement);
  });
}

// 초기 값으로 getPlaces() 전달
renderCities(getPlaces());
**subscribe(renderCities);**
```

```jsx
/* map.js (컴포넌트 역할)*/
import { addPlace, getPlaces, subscribe } from './dataService';

let googleMap;

// ...

init();
renderMarkers();
**subscribe(renderMarkers);**
```

- 위와 같은 방식으로 `map.js` 컴포넌트가 서비스에서 일어난 모든 액션에 반응 할 수 있도록 연결

### 왜 Pub/Sub 패턴이 중요할까?

- 많은 것들이 Pub/Sub 패턴의 다양한 변종을 사용하고 있음.
- promise는 우리가 미뤄둔 어떤 **액션이 완료되는 것을 구독** 할 수 있고,
  **데이터가 준비되면 발행**하는 것
- react는 컴포넌트들이 업데이트 되는 원리는 **데이터 변화를 구독**하는 것. 이를 통해 state와 props가 변경되는 것을 감지.
- 소켓의 `on()` 도 특정한 **액션을 구독**하는 것.
- 리덕스는 스토어의 **변화를 구독**.