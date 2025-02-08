<!-- https://github.com/DanWBR/dwsim/blob/windows/CODE_GUIDE.md -->
<!-- 위와 같이 코드 가이드라인 작성 -->

- 외부 라이브러리(jQuery, Lodash 등)를 사용하지 않고, 순수 Vanilla JS로만 구현

- 자바스크립트 코드 컨벤션을 지키면서 프로그래밍 한다

  - Google JavaScript Style Guide

    - 2025.02.07일 기준 홈페이지에서 더 이상 업데이트 되지 않는다고 선언함

  - Airbnb JavaScript Style Guide()

    - 이것을 기준으로 채택하자
    - 널리 사용되고, Google JS 보다 더 엄격해서 선정

  - JavaScript Standard Style
  - NHN FE개발랩

- indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현한다. 2까지만 허용한다.

  - 예를 들어 while문 안에 if문이 있으면 들여쓰기는 2이다.

- 힌트: indent(인덴트, 들여쓰기) depth를 줄이는 좋은 방법은 함수(또는 메소드)를 분리하면 된다.

- 함수(또는 메소드)가 한 가지 일만 하도록 최대한 작게 만들어라. 만약 15줄이 넘어간다면 의심해보기

- 변수 선언시 var 를 사용하지 않는다. const 와 let 을 사용한다.

  - 주로 const를 사용한다 (let보다 우선순위를 높여서 사용)

- import 문을 이용해 스크립트를 모듈화하고 불러올 수 있게 만든다.

  - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import

- 함수(또는 메소드)가 한 가지 일만 잘 하도록 구현한다.

---

## 1주차 보완점

- https://github.com/next-step/js-racingcar/pull/270#discussion_r1945834268

### 1. 사용처에서 필요한 만큼만 인터페이스를 열어준다

### 2. 의미없는 get Prefix를 사용하지 않는다

### 3. 메서드 이름이 get/go 두 가지 동작을 포함

- getGoToX와 같은 이름은 잘못된 예

---

## 2주차 보완점

### 1. BeforeEach 시점에 매번 새 인스턴스를 생성하지 말 것

- 각 테스트 블록 안에서 새로 인스턴스를 만들어 사용해도 될 거 같음

- 가변적인 전역 변수를 사용하는 것보다 좋음

### 2. Given-When-Then

- 준비-실행-검증

- 처음에 주어진 조건도 명시

  - 각 테스트 케이스가 너무 장황할 수 있어, describe를 적당히 사용해 컨텍스트를 나누어 줄 것

- 추가: 테스트 케이스에 `어떤 동작을 했을 때, 어떤 결과가 생기는지` 포함

  - 명시적으로 테스트 스펙을 정의할것!

### 3. regex는 테스트의 대상

- 테스트의 도구로 사용하지 말 것

### 4. 관련 없는 케이스는 작성을 하지 말 것

- 나중에 사용할 것이라고 예측해서 코드를 작성하는 습관 없애기

### 5. 테스트 스펙과 실제 구현이 달라지는 상황은 피하기

- 테스트 제거 or 적절한 제약을 코드 내로 넣기

---

## 비동기 JEST 처리

- https://dev.to/darkmavis1980/how-to-test-an-async-function-to-throw-an-exception-in-jest-3a90

- https://jestjs.io/docs/asynchronous#resolves-rejects

- https://github.com/jestjs/jest/issues/5538#issuecomment-461013424

  - 최대한 공식문서를 참조하여 해결한다
