<br/>
<p align="middle" >
  <img width="200px;" src="https://user-images.githubusercontent.com/50367798/106415730-2645a280-6493-11eb-876c-ef7172652261.png"/>
</p>
<h2 align="middle">자동차 경주 게임</h2>
<p align="middle">자바스크립트와 Cypress로 구현하는 자동차 경주 게임</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

## 🔥 Projects

<p align="middle">
  <img width="400" src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/7c76e809d82a4a3aa0fd78a86be25427">
</p>

<p align="middle">
  <a href="https://next-step.github.io/js-racingcar/">🖥️ 데모 링크</a>
</p>

<br>

## 요구사항 분석

### Step 1

- [x] **자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.**

>

- [x] **자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.**
  - [x] 앱을 처음 실행하면 자동차 이름을 입력할 창이 보여야 한다.
  - [x] 자동차 이름이 1자 미만, 5자 초과라면 경고창을 호출한다.

>

- [x] **사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.**
  - [x] 시도 횟수 입력창은 자동차 이름을 제출한 후에 표시된다.
  - [x] 시도 횟수가 0 이하일 경우 경고창을 호출한다.
  - [x] 시도 횟수가 10 보다 크면 경고창을 호출한다.

>

- [x] **주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.**
  - [x] 자동차 이름을 입력한 개수만큼 자동차가 생성되어야 한다.

>

- [ ] **전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.**
  - [ ] random 값이 4 ~ 9 사이의 숫자라면 전진한다.
  - [ ] random 값이 0 ~ 3 사이의 숫자라면 멈춘다.

<br>

### Step 2

- [ ] 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
  - [ ] 우승자(들) 이름이 화면에 표시되어야 한다.

>

- [ ] 우승자가 여러명일 경우 쉼표(,)를 이용하여 구분한다.
  - [ ] 우승자(들) 이름을 쉼표로 구분할 수 있다.

>

- [ ] [다시 시작하기] 버튼을 클릭하면 화면이 초기화 된다.
  - [ ] 자동차 이름 입력란이 보여야한다.
  - [ ] 경주 화면, 결과 화면은 보이지 않아야 한다.

<br>

### Step 3

- [ ] 자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.
  - [ ] 애니메이션 구현을 위해 setInterval, setTimeout, requestAnimationFrame 을 활용한다.
  - [ ] 시도 횟수가 5번이면 5초가 걸려야 한다.
    - Q. 근데 cypress에서 시간을 잴 수 있는 방법이 있나...?

>

- [ ] 정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.
  - [ ] 게임이 완료되면 2초 후에 축하 메시지를 보여준다.

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
