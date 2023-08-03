## REQUIREMENTS Commit Convention

- 기능 명세서 작성(N단계)
- 기능 명세서 수정(완료 목록 체크 | 구현 목록 추가)

## 🎯 기능 요구 사항

- [x] 도메인 로직은 domain/ 하위로, UI 관련 로직은 view/ 하위에서 관리한다.
- [ ] domain/ 하위의 모듈은 view/ 하위의 모듈을 의존하지 않아야 한다.
- [ ] 도메인 로직 내에서 테스트하기 어려운 부분을 분리하고, 테스트 가능한 부분에 대해서만 단위 테스트를 작성한다.
- [ ] 테스트 코드에서 jest.fn()을 사용하지 않는다.

---

### 모든 요구사항들이 바뀌더라도 유연하게 대처할 수 있도록 코드를 작성하기

## 피드백

- InputView와 OutputView는 게임에 영향을 주지 않아야 한다.

  - [ ] 현재 racingGame 내부에서 state만 관리하고, 파싱과정은 View로 위임하기.

- 자동차, 게임 객체가 담당해야 하는 역할은 무엇인가?

- View, Controller, Model이 정확하게 무엇인가?

- 유효성 검사를 진행했을 때 어떤 식으로 에러를 핸들링할 것인가?

  - [ ] 에러는 도메인이나 모델에서 던지고 Controller가 catch하기.

- 각 객체는 얼마나 SOLID 원칙을 따르고 있는가?

- 종속적이고 의존적인 환경은 어떻게 제어할 수 있는가?

---

## Validation

- [ ] Validation에 사용할 재사용 가능한 공통 모듈들을 만든다.
- [ ] 각 객체가 필요한 Validaiton 파일과 객체를 만든 뒤, 필요한 Validation들을 import하여 조합한 뒤, export한다.

### View

- [x] View는 input에 최소한의 Validation을 진행한다.
  - [x] 공백이 입력될 경우, 예외처리 한다.
- [x] View는 Class와 객체 중 무엇으로 관리할지 고민해본다.
      => 객체로 관리하는 것도 좋아보이지만 `closeReadLine`와 같은 메서드들의 캡슐화가 불가능해서 Class로 구현해두는 것으로 결정.
      다만, 확장성을 고려한다면... 흠...

```js
export const View = {
  readInput(message, inputHandler) {
    InputView.readUserInput(message, (userInput) => {
      Validation.validateInput(userInput);

      inputHandler(userInput);
    });
  },

  readCarName(inputHandler) {
    this.readInput(MESSAGE.READ.CAR_NAME, inputHandler);
  },

  readTotalRound(inputHandler) {
    this.readInput(MESSAGE.READ.TOTAL_ROUND, inputHandler);
  },

  printGameResult(gameResult) {
    OutputView.print(gameResult);
    this.closeReadLine();
  },

  printError(error) {
    OutputView.print(error);
  },

  closeReadLine() {
    InputView.close();
  },
};
```

### Domain

도메인은 런타임이 바뀌더라도 항상 사용할 수 있어야 한다. 즉, 각 도메인은 "도구"를 제외한 것들은 완전무결성을 유지해야한다.

- [ ] 사용하는 "도구"만 DI받고 도구를 제외한 것들은 예쁘게 추상화 해보기.
