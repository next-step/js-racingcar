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
- [X] Model은 maxMatchLength를 가질 수 있다.
- [ ] Model의 state를 변경할 수 있다.
- [X] Model의 상태가 변경된 경우, 상태 변화를 감지할 수 있다.

## ViewModel

- ViewModel은 View에서 전달받은 문자열의 carList를 CarComponent로 변환하여 Model에 전달한다.
- ViewModel은 View에서 전달받은 maxMatchLength를 Model에 전달한다.
- [X] update() - ViewModel은 update시, 변경된 상태를 전달한다.
- [X] destroy() - ViewModel은 destroy 이후 update를 호출한 경우, 상태를 전달받을 수 없다.
- [X] generateCarList() - ViewModel은 문자열로 받은 carName을 Car component로 변환한다.
- [X] generateWinnerList() - ViewModel은 전달받은 Race component에서 우승자를 반환한다.
- [X] start() - ViewModel은 Race의 라운드를 진행시키고 라운드가 진행될 때마다 결과를 알린다.
- [X] start() - ViewModel은 Race가 끝난 뒤, winnerList를 Model에 전달한다.

## View

- View가 생성되었을 때 Model의 상태값에 따라 view가 노출되어야 한다.