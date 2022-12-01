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

## 🎯 step1 요구사항
1. 자동차 이름 입력 기능
- [x] 자동차 이름은 쉼표(,)를 기준으로 input에 입력한다.
  - [x] 이름은 1자 이상, 5자 이하만 가능하다.
    - [x] 이름의 길이가 0인 자동차를 입력하면 alert 창을 띄운다.
    - [x] 이름이 5자 초과면 alert 창을 띄운다.
    - [x] 중복된 이름이 존재하면 alert 창을 띄운다.
- 자동차 이름 입력을 완료하면 
  - [x] 자동차 이름을 수정할 수 없다.
  - [x] 확인 버튼이 작동하지 않는다.
  - [x] 레이싱 횟수 입력칸과 확인 버튼이 화면에 뜬다.

2. 레이싱 횟수 입력 기능
- [x] 사용자는 레이싱 횟수(몇 번의 이동을 할 것인지)를 입력한다.
  - [x] 레이싱 횟수가 0회 이하면 alert 창을 뜬다.
- 레이싱 횟수 입력을 완료하면 
  - [x] 횟수를 수정할 수 없다.
  - [x] 확인 버튼이 작동하지 않는다.

3. 레이싱 게임 기능
- [] 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
- [] 전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.

4. 자동차 게임 결과 표시 기능
- [] 레이싱 횟수 입력란 밑에 자동차 이름을 화면에 표시한다.
- [] 각 자동차는 전진하면 자동차 이름과 다시 시작하기 버튼 사이에 ⬇️을 화면에 표시한다.
- [] 다시 시작하기 버튼을 화면에 표시한다.
