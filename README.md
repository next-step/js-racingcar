# 미션 진행하며 공부하고 정리한 글
미션 진행하면서 너무 새로운 내용이 많았어서 글로 조금 정리했습니다. 혹시 몰라 공유드립니다!
- [Proxy로 구현한 상태관리 모듈(feat. Reflect) + 한계점 ㅜㅜ](https://www.notion.so/g1moon/Proxy-feat-Reflect-45abb2dfd14142d09142e76deeb1c352)
- [바닐라 JS로 JSX처럼 구현해보기](https://g1moon.notion.site/JS-JSX-221123baed324497acfb9fddddfa9823)
- [Proxy Reflect 정리](https://www.notion.so/g1moon/Proxy-Reflect-89a5237b81a34906b09024e420b3065a)
- [Proxy 정리](https://www.notion.so/g1moon/Proxy-b7d60aff33c34bfea132f5684119cda0)
- [Publish/Subscribe Pattern 정리](https://www.notion.so/g1moon/Publish-Subscribe-Pattern-37e16963c106422eb09e9537db693fff)

# 주안점
- 순수 JS를 이용해 상태관리 모듈을 흉내 내보았습니다.
- state를 set하는 부분에서 Proxy 트랩을 사용했습니다.
  - Proxy의 set 트랩을 이용해 state가 mutation이 아닌 방법으로 변경되는 것을 방지했습니다.
- redux-logger와 같은 역할을 하는 기능을 만들기 위해 state Proxy 내부에 `console.groupCollapsed();`, `console.groupEnd();`
  을 이용했습니다.
- Pub/Sub 패턴을 적용한 `PubSub` 클래스에서 이벤트를 `subscribe` 하고, `publish` 합니다.
- 흐름은 `dispatch(action) → commit → mutation(데이터 변경)` 이런 식 입니다.
- Component `render()` 에서 template literals 을 사용해 JSX 처럼 동작하게끔 구현했습니다.
- Reflect를 사용해보았습니다.

# 데모페이지
[바로가기](https://guymoon.github.io/js-racingcar/)

# 웹 vscode 환경
[바로가기](https://github.dev/guymoon/js-racingcar)

# 🔥 요구사항
NEXTSTEP 미션 요구사항에 따라 main branch의 요구 사항을 변경했습니다.

## 🎯 step1
- [x] 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
- [x] 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- [x] 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
- [x] 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
- [x] 전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.

## 🎯🎯 step2
- [x] 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
- [x] 우승자가 여러명일 경우 ,를 이용하여 구분한다.

## 🎯🎯🎯 step3
- [x] 자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.
  - [x] 애니메이션 구현을 위해 setInterval, setTimeout, requestAnimationFrame 을 활용한다.
- [x] 정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.