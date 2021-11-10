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
## 📝회고

### MVC 패턴에 대한 고민

- 처음에는 매 `notifyAll` 메서드가 호출될 때마다, `view` 를 새로 그리는 방식으로 접근했으나, `focus` 정보 등의 데이터를 유실하게 되므로 이를 최대한 유연하게 관리하기 위해 최대한 `innerHTML` 프로퍼티를 안쓰는 방향으로 리팩토링 하였다.
- 기존에는 비즈니스 로직을 `controller` 안에다가 구현했었다. 모델은 `view`에 바인딩된 데이터(상태) 조작만 가능해야 한다고 생각했기 때문에다. 하지만 다시생각해보면, view에 바인딩된 **상태** 를 변경하기 위해 진행하는 과정이 결국 **비즈니스 로직** 이라는 생각이 들어 `game`진행과정을 계산하는 로직, `valid체크` 등의 비즈니스 로직을 모두 `model`로 이관하고 `controller`는 오직 `view`에서 이벤트리스닝을 하기 위한 이벤트콜백함수를 구현하는 로직만 남겼다.
- 기존에는 `view` 객체에 `controller`를 주입하여 이벤트리스너를 바인딩 했었다. 그 이유는` view->controller->model->view`라는 단방향흐름을 명시적으로 지키고 싶었기 때문에다. 그러나 이럴경우` controller`에서 `input.value`를 `submit btn`을 클릭했을때 알 수 있는 방법이 없다,(클로저와 콜백함수를 이용하면 억지로 전달하는 방법을 이용했었지만 가독성이 떨어진다고 생각하기때문에 좋지않은 방법이다.) 이를 해결하고자 `view`를 `controller`에 주입하는 방식으로 바꿔 `controller에`서 자유롭게` view`객체가 가지고 있는 `dom`객체를 사용할 수 있게 되었다.
- 하지만 위와같은 방법으로 구현하기 위해서는 `view`에서 이벤트리스너를 바인딩하기위해 `controller`를 인자로 넘겨야 하는 상황이 발생하였다. 개인적으로 어쨋든 서로의 의존성을 묶는 형태가 되어버린것 같다.
- `mvc+observer`는 `model`과 `view` 사이에 강한 의존성을 갖는다고 한다. 구현해 보니 정말 그렇다고 느꼈는데, `model` 의 `state` 가 변할때마다 view가 의존적으로 변하기 때문이다. 이러한 의존성을 줄이고 느슨한 관계를 유지하는 방법이 `pubsub` 패턴을 이용한 `mvc`라고 알고있다. 다음 미션은 `pubsub` 방식으로 구현해볼 예정이다. 

### cypress run as command line

-   브라우저 상에서 테스트하는것은 결국 통합테스트 혹은 e2e 테스트만 가능하다. 반면 특정 모듈의 유닛테스트를 cypress로 테스트 하고 싶을 경우가 있다. 이를 지원하는 것이 `yarn cypress run` command이다.
-   해당 명령어를 입력하면, `cli` 로 테스트가 진행될 뿐 아니라, 브라우저에서 테스트 할 수 없는 모듈 테스트도 가능해진다.

#### 폴더구조 변경하기 truble shooting

-   의미상 `cypress/integration/racingcar/pubsub.spec.js` 보다는 `cypress/racingcar/unit-test/pubsub.spec.js`로 관리하는게 더 명확하다고 생각하여 폴더를 이동했더니 다음과 같은 에러메시지를 반환했다.

    ```
    Can't run because no spec files were found.

    We searched for any files matching this glob pattern:

    cypress\racingcar\unit-test\pubsub.spec.js

    Relative to the project root folder:

    ```

-   이는 `cypress`의 `integrationFolder` 설정의 `default`값이 `cypress/integration`이기 때문에 루트 폴더보다 바깥에 있는 `racingcar` 폴더를 찾지 못한다는 의미이다.
    프로젝트 폴더에 `cypress.json`파일에 다음과같이 설정하고 나면 의도하는 폴더경로를 잘 불러올 수 있다.

    ```json
    {"integrationFolder": "cypress"}
    ```

-   추가사항-> 이유는 모르겠지만 `integrationFolder`를 변경한 후로 `testing-library`가 제공하는 자동완성 기능이 동작하지 않았다. 다시 테스트 하고자 하는 코드를 `integration`폴더 안에 삽입하고 난 뒤에야 해당 현상이 사라졌다. 아마 `testing-library`가 thrid party 라이브러리인 특성상 `defualt paths`에 대한 `config`에 의존하고 있는 어떤 설정이 있는것으로 판단한다. 현재는 임시로 `integration`폴더 안에서 `e2e-test`, `unit-test` 전부 작성중이다. 의미상 틀린 구조이므로 분리하고 싶지만 해당 버그(?)를 정확히 파악한 후 다뤄볼까 한다.

### 테스트 코드 작성하면서 학습한 내용

-   비동기적인 `recursive` 함수 호출에 대한 카운트를 평가하고 싶을때는 `spy`에 `.as({name})`으로 할당한 뒤, `cy.get('@name').should('have.been.called', 4)` 이런식으로 평가할 수 있다.
-   고민할 점: e2e 테스트를 고려한다면, `시도횟수` `input`을 입력 후 오른쪽에 있는 확인 버튼을 눌러야 하는데,`html`의 세부 구현을 모른다는 가정하에 찾으려고하니 `placeholder`로는 `확인`이라는 버튼이 이미 존재하기 때문에 원하는 버튼을 선택하는 것에 어려움이 있었다. 그래서 생각한 방법이 `시도횟수 input`을 기준으로 `parent`를 전부 재귀적으로 탐색하여 가장 가까운 자식노드 중 확인 버튼이 있을 때 탐색을 멈추고 클릭 이벤트를 발생시키는 것이다. 이 방법은 제공하는 `api`를 제대로 파악하지 못하여 실패하였다.
-   결국 차선책인 `시도횟수 input.parent().findRole('button',{name:/확인/})방법`으로 검색하여 문제를 해결하였다. 이를 통해 배운 점은 1. 테스트 가능한 ui 설계 필요, 2. 현실적으로 구현의존적인 테스트 코드가 일정수준 허용해야 일정에 문제가 나지 않는다 것이다.

### 랜덤 요소가 포함된 서비스의 테스트 방법론 고민

-   가장 우선 비결정적 요소와 결정적요소를 분리하는 것으로 시작하였다.

-   `자동차 이름`과 `시도횟수`를 입력 받고 난 뒤, 자동차 이름의 `columns`과, `n`초 후의 `최종 우승자` 문구와, `다시 시도하기` 버튼은 매번 동일하게 나타났다. 이는 결정적 요소로 분류하여 `e2e` 테스트 코드를 작성하였다.

-   `우승자`와 `경주 과정`의 경우 똑같은 `자동차 이름`과 `시도 횟수`를 인자로 사용하더라도 결과가 달라질 수 있는 비결정적 성격을 가지고 있다. 이를 테스트 가능하게 설계하기 위해서 **무엇을 테스트하고 싶은가** 를 생각해 보았다.

-   테스트 하고 싶은 것

    > 1. 매 경기마다 0~9사이의 랜덤한 숫자가 잘 생성되는가.
    > 2. `자동차 이름`과 `시도횟수`에 따라 랜덤한 숫자들의 뭉치가 잘 생성 되는가.
    > 3. 원하는시점의 자동차들의 경로가 의도대로 나타나는가.
    > 4. 숫자뭉치가 주어진다면 조건(4이상 전진, 그 외 정지)에 맞게 우승자를 구할 수 있는가.

    비결정적 요소를 쪼개다 보니, 3,4번 테스트의 경우 결정적 성격의 테스트가 도출되었고, 이는 우리가 **알고싶어하는 것**이다. 각각의 테스트는 유닛테스트 요소로 분리하여 `game`이라는 비즈니스 로직을 구현하였다. 랜덤한 숫자뭉치를 생성하는`Matrix class`와 우승자를 구할 수 있는 `Game Class`를 분리하여 우승자를 판단하는 테스트 코드 및 비즈니스 로직을 구현할 수 있었다.

-   추가적인 생각

    랜덤한 값을 테스트 하기 위해, 엄밀한 요구사항인 **매 초당 랜덤한 값을 생성한다.** 를 일괄 작업 후 **매 초당 랜덤으로 생성되었던 값을 반환한다.** 로 변경하였다. 랜덤값을 다루기 위해 어쩔 수 없는 선택이라고 생각했으나, 소프트웨어적 허용(?)의 영역이라고 생각하여 이렇게 구현하였다. 이렇게 바라보니 랜덤으로 제공된다는 모든 서비스, 가챠, 상품들은 사실 이미 결정된 사항이고 노출시점만 제어하는게 아닌가 싶다는 생각이 들었다.

-   ps 유닛테스트를 cypress로 통합하여 관리하려다 보니 테스트 수행 속도에 있어서 jest에 비해 현저히 느린 속도로 검사한다는 것을 알게 되었다. 또한 cli상에서의 디버그 방법론은 공식문서에 제대로 안나와 있어(내가 못찾는 것 일 수도...) 오히려 작업속도가 더디게 되는 상황이 발생했다.
    앞으로는 유닛테스트를 jest로 돌려야겠다는 생각이 들었다.
    
    <br/>

## 🔥 Projects!

<p align="middle">
  <img width="400" src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/7c76e809d82a4a3aa0fd78a86be25427">
</p>

<p align="middle">
  <a href="https://next-step.github.io/js-racingcar/">🖥️ 데모 링크</a>
</p>

### 🎯 step1

-   [ ] 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
-   [ ] 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
-   [ ] 자동차 이름은 `쉼표(,)`를 기준으로 구분하며 이름은 5자 이하만 가능하다.
-   [ ] 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
-   [ ] 전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.
-   [ ] 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
-   [ ] 우승자가 여러명일 경우 `,`를 이용하여 구분한다.

### 🎯🎯 step2

-   [ ] 자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.
    -   [ ] 애니메이션 구현을 위해 `setInterval`, `setTimeout`, `requestAnimationFrame` 을 활용한다.
-   [ ] 정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.
-   [ ] 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

<br>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/next-step/js-racingcar/issues) 에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/next-step/js-racingcar/blob/main/LICENSE) licensed.
