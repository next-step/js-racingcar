# 리팩터링 요구사항

## Components

### Car

- [X] Car는 이름을 가질 수 있다.
- [X] Car는 앞으로 전진할 수 있다.

### Race

- [X] Race는 전진 조건을 가지고 있다.
- [X] Race는 경주의 참여자 목록을 가지고 있다.
- [X] Race는 각 라운드마다 전진 조건에 해당하는 참여자를 이동시킬 수 있다.

## Model

- [X] Model은 carList를 가질 수 있다.
- [X] Model은 winnerList를 가질 수 있다.
- [X] Model은 runCondition을 가질 수 있다.
- [X] Model은 maxMatchLength를 가질 수 있다.
- [X] Model의 state를 변경할 수 있다.
- [X] Model의 상태가 변경된 경우, 상태 변화를 감지할 수 있다.

## ViewModel

- [X] handleAction() - 외부에서 입력받은 state값이 올바르지 않은 경우, error를 설정하는 뮤테이션을 실행시킨다.
- [X] handleAction() - 외부에서 입력받은 state값이 올바른 경우, 액션에 해당하는 뮤테이션을 실행시킨다.
- [X] handleMutation() - 전달받은 state로 ViewModel의 state와 Model의 state를 업데이트 한다.
- [X] start() - Race의 라운드를 진행시키고 라운드가 진행될 때마다 Model에 현재 carList를 전달한다.
- [X] start() - Race가 모두 종료되고 Model에 winnerList를 전달한다.
- [X] update() - update시, 구독하고 있는 요소에게 ViewModel의 state를 전달한다.
- [X] destroy() - ViewModel은 destroy 이후 update를 호출한 경우, 상태를 전달받을 수 없다.

### Validator

- [X] 경주의 최대 경기 횟수가 숫자가 아닌 경우, 에러를 발생시킨다.
- [X] 경주에 참여한 자동차가 한 대인 경우, 에러를 발생시킨다.
- [X] 자동차의 이름이 문자열이 아닌 경우, 에러를 발생시킨다.

### getters

- [X] generateCarList() - 문자열로 전달받은 carName을 기반으로 Car component를 생성한다.
- [X] generateWinnerList() - 전달받은 participants를 기반으로 우승자를 담은 배열을 반환한다.
- [X] generateWinnerList() - 모든 참가자가 출발선에 있는 경우, 빈 배열을 반환한다.
- [X] generateRace() - 전달받은 carList, runCondition을 기반으로 Race component를 생성한다.

## View

- [X] update() - update시 type이 updateCarList인 경우, ConsoleView의 carList에 Model의 state를 담아 호출한다.
- [X] update() - update시 type이 updateWinnerList인 경우, ConsoleView의 winnerList에 Model의 state를 담아 호출한다.
- [X] update() - update시 type이 error인 경우, ConsoleView의 error에 Model의 state를 담아 호출한다.

### ConsoleView

- [X] renderCarList() - 전달받은 carList를 기반으로 name과 position을 출력한다.
- [X] renderWinnerList() - 전달받은 winnerList를 기반으로 우승자를 출력한다.
- [X] renderWinnerList() - 전달받은 winnerList가 빈 배열인 경우, 우승자가 없다는 메시지를 출력한다.
