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

## 🔥 Projects!

<p align="middle">
  <img width="400" src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/7c76e809d82a4a3aa0fd78a86be25427">
</p>

<p align="middle">
  <a href="https://next-step.github.io/js-racingcar/">🖥️ 데모 링크</a>
</p>

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

## 요구사항 분석

### step 1

- 자동차 이름을 입력할 수 있다.

  - [ ] 이름은 한글/영문 그리고 , 만 입력할 수 있다.
  - [ ] 5자 이하 이름을 입력할 수 있다.
  - [ ] 5자 이상 이름을 입력하면, 경고창이 뜬다.
  - [ ] ,로 자동차 이름을 구분할 수 있다.
  - [ ] 이름이 정상적으로 입력되면, 게임진행 횟수 입력창이 보인다.

- [ ] 게임진행 횟수를 입력할 수 있다.
      <!-- @TODO: 테스트 케이스가 사용자 입장에서 문구를 적어야한는데 이런 로직 부분은 어떤식으로 문장을 작성해야할지 어렵네요. -->

  - [ ] 입력한 횟수만큼 난수를 생성한다.
  - [ ] 난수는 0 - 9 사이 값이다.
  - 자동차 전진 또는 멈춤은 난수로 결정된다.
  - [ ] 난수가 4이상이면 자동차가 전진한다.
  - [ ] 난수가 3이하이면 자동차가 멈춘다.

### step 2

<!-- @TODO: step2 진행하면서 추가 케이스 등록해보기 -->

- 게임이 종료되면
  - [ ] 입력창과 확인 버튼이 모두 비활성화 된다.
  - [ ] 우승자를 확인할 수 있다.
  - [ ] 우승자는 , 로 구분할 수 있다.
  - [ ] 게임을 다시 시작할 수 있다.

## step 3

<!-- @TODO: step3 진행하면서 추가 케이스 등록해보기 -->

- [ ] 각 횟수의 게임은 1초가 소요된다.
- [ ] 각 횟수마다 결과가 보인다.
- [ ] 우승자가 확정되면, 2초후에 축하 알림창이 뜬다.
