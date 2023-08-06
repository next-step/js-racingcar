# 리팩터링 요구사항

## Components

### Car

- [X] Car는 이름을 가질 수 있다.
- [X] Car는 앞으로 전진할 수 있다.
- [ ] Car는 이름은 5자 이내의 문자열만 가질 수 있다.

### Race

- [X] Race는 현재 매치 수를 가지고 있다.
- [X] Race는 최대 매치 수를 가지고 있다.
- [X] Race는 전진 조건을 가지고 있다.
- [X] Race는 경주의 참여자 목록을 가지고 있다.
- [X] Race는 각 라운드마다 전진 조건에 해당하는 참여자를 이동시킬 수 있다.

## Model

- [X] Model은 carList를 가질 수 있다.
- [X] Model은 winnerList를 가질 수 있다.
- [X] Model은 runCondition을 가질 수 있다.
- [X] Model의 상태가 변경된 경우, 상태 변화를 감지할 수 있다.
- [X] Model의 carList를 변경할 수 있다.
- [X] Model의 winnerList를 변경할 수 있다.
