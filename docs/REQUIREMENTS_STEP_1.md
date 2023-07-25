## REQUIREMENTS Commit Convention

- 기능 명세서 작성(N단계)
- 기능 명세서 수정(완료 목록 체크 | 구현 목록 추가)

# 목표 : 콘솔에서 동작하는 자동차 경주 게임을 구현한다.

- [x] 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- [x] 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
- [x] 자동차 경주는 5회로 고정하여 진행한다.
- [x] 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
- [x] 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
- [x] 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
- [x] 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.

---

## 1단계

### 구조

- [x] GameController를 추가한다.
- [x] Model을 추가한다.
  - [x] Model에 Car Model을 추가한다.
  - [x] Car Model은 User가 가지는 속성이기 때문에 User에게 DI한다.
- [x] View를 추가한다.
  - [x] View에 InputView를 추가한다.
  - [x] View에 OutPutView를 추가한다.
- [x] InputView는 User의 Input에 대한 유효성 검사 책임을 부여할 것이다. Validator를 어떻게 상속 또는 주입 받을 것인데, `Validation의 책임`까지 있는 경우, `객체로 구현`할 것인지, `Class로 구현`할 것인지 고민해보기.
- [x] Util 함수들을 작성한다.
- [x] Validation 객체를 작성하고, 필요에 따라 내부의 메서드들을 추가한다.

---

## 2단계

- [x] Controller에서 RacingGame Model 분리하기.
      Controller의 역할 다시 명확히 생각하기. 얘는 Model과 View등을 이어주고, 코드의 흐름을 제어하는 친구지, 경주 관련 데이터가 비즈니스 로직이 얘한테 있으면 안됨.
- [x] 상수 가독성 리팩터링.
      현재 상수들을 객체단위로 묶는다고 가독성이 낮은데, 파일별로 분리하고 개별 export하는 방식 채택하기.
- [x] Validation 가독성 높고 확장성 높게 로직 변경
- [x] Error에 대한 처리는 Controller에서 진행하고, 에러를 생성하는 로직은 validator로 위임.

### 게임 시작

- [x] index 폴더에서 App Class를 구현하고, GameController 내부에 DI되는 값이 유동적으로 변경될 수 있도록 구조를 변경한다.
- [x] Controller에서 게임을 시작한다.

---

### 자동차 이름 입력

- [x] 입출력을 위한 Console module을 추가한다.
- [x] User와 Car는 동일하다. 따라서 User Model을 삭제하고 Car Model만 남긴다.
- [x] 게임을 시작할 때, 자동차의 이름을 입력받는다.

---

### 자동차 생성

- [x] 자동차 이름은 쉼표(,)를 기준으로 구분하다.
- [x] 자동차 이름은 5자 이하만 가능하다.
- [x] 입력받은 값을 기반으로 자동차를 생성한다.

---

### 자동차 경주 셋팅

- [x] 자동차 경주는 5회로 고정하여 진행한다.
  - [x] GameController에서 상수화 된 값만큼 게임을 진행한다.

### 자동차 경주 시작

- [x] 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- [x] 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.

  - [x] 주어진 range 내의 정수를 return하는 util 함수를 구현한다.
  - [x] 입력된 값에 따라 전진을 결정하는 메서드를 작성한다. (전진 체크 관련이니 함수로 뺄지 메서드로 둘지 고민)

- [x] 자동차를 움직이는 로직은 racingGame의 책임이지, Car이 아님. 로직 이동하기

```shell
실행 결과
pobi : -
crong : -
honux : -

pobi : --
crong : -
honux : --

pobi : ---
crong : --
honux : ---
```

---

### 우승자 확인

- [x] 자동차 경주 게임을 완료한 가장 멀리 간, 우승자를 확인한다.
- [x] 우승를 출력한다. 우승자는 한 명 이상일 수 있다.

  - [x] 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.

- [x] 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.

---

### 대략적인 flow

게임 시작 => 자동차 이름 입력 => 자동차 이름 유효성 검사 => 자동차 이름 저장 => 경주 시작 => 정해진 횟수만큼 랜덤 전진 => 우승자 확인 => 우승자 출력
(에러 발생시 프로그램을 종료)

```text
경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).
pobi,crong,honux

실행 결과
pobi : -
crong : -
honux : -

pobi : --
crong : -
honux : --

pobi : ---
crong : --
honux : ---

pobi : ----
crong : ---
honux : ----

pobi : -----
crong : ----
honux : -----

pobi, honux가 최종 우승했습니다.
```

---

## Code Review

### src/Controllers/GameController.js

- [x] readCarName에 전달되는 callback 함수의 네이밍을 개선한다.
- [x] validateCar 메서드의 역할을 분리한다.

### src/Models/Model.js

- [ ] 불필요한 모델 레이어는 제거한다. 필요할 때 확장하도록 한다. 가독성이 낮아지기 때문이다.

### src/Models/RacingGame.js

- [ ] default value는 생성자 함수 내부에서 선언하는 것이 아니라 field 선언 당시 바로 할당해주도록 한다.
- [ ] for문도 좋지만 가독성 측면에선 map도 좋다.
- [ ] 매개변수가 하나면 메서드명만 쓰는 방법으로 적용이 가능하다.

```js
this.#cars.forEach((car) => this.#randomCarMovement(car));
this.#cars.forEach(this.#randomCarMovement);
```

- [ ] getRandomIntInRange를 사용한 getRandomCarMovementInt 만들어서 가독성 개선과 재사용성 두 마리 토끼 다 잡기!

- [ ] advance 분기처리 early return하기

### src/constants/racingGame.js

- [ ] gameProgress 변수를 리터런 내부에서 출력한다.

### src/utils/parser.js

- [ ] forEach가 아닌 reducer 사용할 수 있는 경우 리팩터링 진행하기.
      scope 외부의 값 사용을 최소화하고 sideEffect가 발생 가능성을 낮춘다!

### src/index.js

- [ ] 게임 Play가 확정된 상태에서, 동적으로 메서드 호출을 고려하지 않아도 되는 경우, play 메서드 없이 생성자 함수 내에서 호출하여 불필요한 코드를 줄인다. 가독성 개선에 도움이 되기 때문이다.
