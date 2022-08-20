# 해야 할것 정리

- [x] MVC의 의도에 맞게 다시 정리하기
  - [x] View Function -> View Class로 변경 ( 커밋을 따로 )
  - [x] MVC로 변경하면서 추상 클래서 / 추상 메서드도 함께 챙기기 ( 커밋을 따로 )
- [ ] setInterval / requestAnimationFrame 들로 각각 구현 진행해보기
  - [x] Wait Util function
  - [x] for await (...of...) 사용해보기
  - [x] setInterval
  - [x] requestAnimationFrame
- [x] #endRacing 가독성 높이기
- [x] cypress clock api를 활용해서 테스트 해보기

# 자동차 경주 리뷰

## 커밋을 잘 나누기

이번 미션에서는 커밋의 단위가 너무 컸다 따라서 각각의 주요기능 별로 커밋을 남기는 방향으로 가는것을 목표로한다.

## Controller를 무엇이라고 생각하는가

MVC 패턴에 대해 다시한번 보고 그것을 바탕으로 나의 의경을 남겨 보도록한다.

- MVC 패턴을 사용한 이유?
- 각각의 영역의 역할은?

코드의 라인 수나 크기도 중요하지만 역할이 더 중요한 부분으로 생각될 수 있다. 그런 관점의 생각을 가져보자

> 리뷰해주신 내용과 비슷하게 react component를 생각하면 구현했던 것 같습니다. view controller는 어떻게보면 presentation container pattern과 비슷한 느낌으로 분리를 하려고 했지만, 그마져도 presentation에 관련된것이 controller에 있어 어떻게 보면 전체적으로 의도 대로 하지 못한 것같습니다!

### App

App Class에서 model을 위의 관점을 통해서 나누어 보는것이 어떠할까?

## Controller

UI를 제어하는 로직이 많아보인다. 혹은 상태를 제어하기도한다.

사실상 React 컴포넌트를 생각한 것이 아닌가? = 맞다.

MVC에서의 controller를 의도한게 맞는지 궁금하다.

## 추상 클래스와 추상 메서드에 알아보기

`abstract class`는 수정되는 항목에 누락되거나 불완전한 구현이 있음을 나타냅니다. `abstract class`는 클래스가 자체에서 인스턴스화되지 않고 다른 클래스의 기본 클래스로만 사용됩니다.
즉, `abstract method`를 하나라도 포함하면 `abstract class`이라고 볼 수 있으며, `일밤 method`도 포함할 수 있다.

`abstract`할 멤버는 추상 클래스에서 파생된 비 추상 클래스에 의해 구현되어야 합니다.

`abstract method`는 `abstract class` 하위에 선언되며, 선언부만 존재하고 구현은 파생된 비 추상 클래스에서 구현한다.

```js
/**
 * @link https://stackoverflow.com/questions/29480569/does-ecmascript-6-have-a-convention-for-abstract-classes
 *
 * 방법 1. Abstract constructor에서 해당 method를 구현했는 가를 평가하는 방법
 */
class Abstract1 {
  constructor() {
    if (this.method === undefined) {
      // or maybe test typeof this.method === "function"
      throw new TypeError('Must override method');
    }
  }
}

/**
 * @link https://happysisyphe.tistory.com/m/26
 *
 * 방법 2. 선언부안에 throw new Error를 만들어 사용할때 error를 내게하는 상용하기 전까지 모르는 방법
 */
class Abstract2 {
  ...
  method2() {
    throw new Error("추상 메소드는 꼭 오버라이딩 되어야 합니다.");
  }
}
```

## Wait Util function으로 빼기

## for(let i =0; i < M; ++i>) {await} -> for awiat( let ... of ...) 형태로 변경하기

- 0809 리뷰 세션 내용

## SetTimeout 말고 다른 것으로 생각해보기

setInterval도 괘춘하긴한데 clear해주기 귀찬 instance갖고 있다가 하면되긴함

requestAnimationFrame으로는 안해봤는데 도전해볼것 - 요것도 clear와 비슷한 로직이 필요하지 않은가?

- setTimeout한이유는 가장 간단하게 구현할 수 있을것으로 예상되어서입니다.

## #endRacing 가독성 높이기

비슷한 로직이 클래스내에서 반복되는 것으로 확인된다.

어떤 동작인지 로직하나하나를 자세히 보아야한다… 그래서 가독성이 떨어진다.

함수로 분리 도는 다른 방법으로든 가독성을 놓일 수 있는 방법이 있을것으로 예상된다.

## View Function 네이밍 변경

controller에서는 class를 사용하고 해당하는 네이밍으로 사용되고 있다. 따라서 표기 방식을 바꾸거나 class형태로 같이 맞추어사용하는것이 좋을것 같다!

> 동의합니다. 구현물을 확인하지않는다면 class인지 function인지 알 수 없을 것같습니다. 초기의도는 굳이 인스턴스가 필요없을 것으로 예상되어서 이런 경우,function으로 구현했지만 표기방식을 변경하여 구문하도록해야겠어요….

하지만 지금 MVC를 다시 알아보면서 변경 예정입니다.

## Cypress Clock API

시간 관련된 테스트를 진행해 볼 수 있게된다.

# Javascript MVC

### 모델-뷰-컨트롤러

사용자 인터페이스로부터 비즈니스 로직을 분리하여, 애플리케이션의 시각적 요소 / 뒤에서 실행되는 비즈니스 로직을 서로 영향 없이 고칠 수 있는 애플리케이션 구현 가능하다.

### 모델

애플리케이션의 정보를 나타낸다.

모델의 상태가 변화가 있을 경우, 컨트롤러와 뷰에 이를 통보한다.

이를 통해 view는 항상 최신의 결과를 보여줄 수 있도록 한다.

컨트롤러는 모델의 변화를 통해 적용 가능한 명령을 추가 제거 수정할 수 잇다.

⇒ 데이터 계층을 조작하기 위한 기초적인 기능을 제공한다.

### 뷰

사용자 인터페이스 요소

사용자가 볼 결과물을 생성하기 위해 모델로부터 정보를 얻어 온다.(컨트롤러를 걷힌다?)

⇒ HTML 데이터를 렌더링하고 DOM에 주입시킨다.

### 컨트롤러

데이터와 비즈니스 로직 사이의 상호작용

모델에 명령을 보냄으로 모델의 상태를 변경할 수 있다.

컨트롤러는 뷰에 명령을 보내서 모델의 표시방법을 변경할 수 있다.

⇒ 컨트롤러는 적절한 이밴트가 발생할 경우, 호출되는 함수의 목록이다. 이밴트를 지정하여 컨트롤러는 이들을 Action으로 인지하여 이들을 올바르게 후킹하게 해준다.

**즉, 사용자는 브라우저를 통해 view를 볼 수 있으며, controller를 통해 model과 뷰를 조작을 가한다.**

즉, model에는 set, get을 가지고 있어야한다.

controller는 model의 set, get을 이용해 사용작와의 상호작용을 통한 변조를 가한다.

이러한 변조가 있을 경우, view는 반듯이 업데이트를 진행해야된다. 이에 대한 view를 위한 로직으로 view에 있겠다. open close disable등등이 되겠다.
