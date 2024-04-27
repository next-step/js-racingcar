<p align="middle" >
  <img width="200px;" src="https://user-images.githubusercontent.com/50367798/106415730-2645a280-6493-11eb-876c-ef7172652261.png"/>
</p>
<h2 align="middle">자동차 경주 게임</h2>
<p align="middle">자바스크립트로 구현 하는 자동차 경주 게임</p>

---

<h3>기능 요구 사항</h3>

- 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
- 자동차 경주는 5회로 고정하여 진행한다.
- 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
- 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
- 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
- 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.

---

<h3>역할 구분 짓기</h3>

<h4> 자동차 </h4>
- 자동차에 이름을 부여할 수 있다.
- 이름은 5자 이하만 가능하다.
- 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.

<h4> 경주 관련 내용 </h4>

- 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다.
- 우승자는 한 명 이상일 수 있다.
- 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
- 자동차 경주는 5회로 고정하여 진행한다.

<h4> 입출력 관련 내용 </h4>

- 자동차 이름은 쉼표(,)를 기준으로 구분하며
- 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.

---

<h4> 자동차 </h4>

- 자동차는 이름이 존재해야된다. (get, set)
- 이름은 5자 이하면 가능하다. (유효성을 체크)
- 경계값을 테스트 진행이 필요. (4 이상 move, 4 이하 pass)
- 전진은 값을 받고, 4이상일 경우 전진, 아닐 경우 움직이지 않는다.

<h4> 경주 관련 내용 </h4>

- 경주에 참여하는 차들은 여러대가 가능하다.
- 자동차 경주는 5회로 고정하여 진행하고 있다.
- 자동차 경주가 완료된 후에는 누가 우승했는지 알 수 있다.
- 우승자는 여러명일 수 있고, 여러명일 경우, 쉼표(,)를 이용하여 구분한다.

<h4> 입출력 관련 내용 </h4>

- 자동차 이름은 쉼표(,)를 기준으로 구분하며
- 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.

---

## Step 02

🎯 기능 요구 사항
아래와 같이 추가된 요구사항을 반영하여 자동차 경주 게임을 구현한다.

- 주어진 횟수 동안 n 대의 자동차는 전진 또는 멈출 수 있다.
- 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
- 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
- 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
- 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
- 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
- 사용자가 잘못된 입력 값을 작성한 경우 에러 메시지를 보여주고, 다시 입력할 수 있게 한다.

---

<h4> 자동차 </h4>

- [x] 자동차에 이름을 부여할 수 있다.
- [x] 이름은 5자 이하만 가능하다.
- [x] 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
- [x] 자동차는 전진 또는 멈춘다.

<h4> 경주 관련 내용 </h4>

- [x] 경주를 시작할 때, 특정 수를 입력받는다.
- [x] 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.

<h4> 입출력 관련 내용 </h4>

- [x] 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
- [x] 사용자가 숫자 이외 다른값을 입력할 경우 에러 메시지를 띄운다.
- [x] 잘못 입력한 경우, 다시입력이 가능하나 가능 횟수에 제한을 둔다.
- [x] 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
