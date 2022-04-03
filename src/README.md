# 🎯 1단계 요구사항

- [x] 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
- [x] 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
- [x] 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
- [x] 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
- [x] 전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.

## 기능 명세

### Form

- [x] 이름을 제대로 입력하지 않으면 alert창 (유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.)이 나온다.
- [x] 중복 가능 & 숫자 가능 & 공백가능(공백은 모두 비워준다.) & 특수문자 가능
- [x] 자동차 이름 유효성 검증을 통과하면 하위 시도 UI가 보인다.
- [x] 시도할 횟수를 입력하지 않으면 alert창 (입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.)이 나온다.
- [x] 마지막 부분은 콤마가 없어야 한다.
- [x] 유효성 검증에 모두 통과하고 submit하면 Content Component가 보인다.
- [x] 유효성 검증에 모두 통과하고 submit하면 자동차 이름 및 시도할 횟수 컴포넌트를 이용할 수 없다.
- [x] 시도 횟수에 제한이 없다.

### Content

- [x] 유효성을 검증에 모두 통과했다면 시도한 횟수만큼 지속적으로 화살표가 추가된다.
- [x] 경기 중 트랙 최하위에 스핀이 있다.
- [ ] 경기가 종료되면 스핀이 사라진다.

### Result

- [ ] 결과값이 모두 출력되면 시간이 흐르고 alert창 (🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇)이 나온다.
- [ ] 동율일 때 모두 화면에 출력해준다.

### Component(UI 구조)

```HTML
<section class="d-flex justify-center mt-5">
  <form>
    <fieldset>
      <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
      <p>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
      </p>
      <div class="d-flex">
        <input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
        <button type="button" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
    <fieldset>
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
        <button type="button" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
  </form>
</section>
```

```JSX
<Form>
  <h1></h1>
  <Fieldset>
    <InputText/>
    <SubForm/>
  </Fieldset>
  <Fieldset>
    <InputText/>
    <SubForm/>
  </Fieldset>
</Form>
```

```HTML
<section class="d-flex justify-center mt-5">
  <div class="mt-4 d-flex">
    <div class="mr-2">
      <div class="car-player">EAST</div>
      <div class="forward-icon mt-2">⬇️️</div>
      <div class="forward-icon mt-2">⬇️️</div>
    </div>
    <div class="mr-2">
      <div class="car-player">WEST</div>
      <div class="forward-icon mt-2">⬇️️</div>
    </div>
    <div class="mr-2">
      <div class="car-player">SOUTH</div>
      <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
    </div>
    <div class="mr-2">
      <div class="car-player">NORTH</div>
      <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
    </div>
  </div>
</section>
```

```JSX
<RacingGame>
  <Track>
    <Go/>
    <Go/>
  </Track>
  <Track>
    <Go/>
  </Track>
  <Track>
    <Wait/>
  </Track>
  <Track>
    <Wait/>
  </Track>
</RacingGame>
```

```HTML
<section class="d-flex justify-center mt-5">
  <div>
    <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
    <div class="d-flex justify-center">
      <button type="button" class="btn btn-cyan">다시 시작하기</button>
    </div>
  </div>
</section>
```

```JSX
<Result>
  <ResultText/>
  <RestartButton/>
</Result>
```

### Domain

- [x] 자동차 이름 유효성 검증
- [x] 시도할 횟수 유효성 검증
- [ ] 이름과 횟수를 이용하여 결과 값 전달
- [ ] 우승자 전달

#### 구조

index.js(초기 이벤트 바인딩) => Controller/InputEvent => Model/Racing => Validator => View/Render => Controller/InputEvent(반복)
