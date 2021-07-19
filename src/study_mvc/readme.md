### classic MVC

-   컨트롤러에서 model과 view의 로직들을 직업 조작하는 방식
-   규모가 작을때는 복잡성이 크지 않지만, 조금만 프로젝트규모가 커지면 스파게티 코드처럼 복잡해 질 가능성이 크다.
-   변경사항이 발생할 때 마다 view에 직접 변경해야 하므로 human error발생 확률이 높다.

### MVC with Observer Patteurn

#### 특징

model은 `Observable interface`를 구현하고, view는 `Observer interface`를 구현하여 상태 관리하는 패턴

```
interface Observable {
    notifyAll: ()=> viod;
    registerObserver: (observer)=>void;
}
interface Observer {
    update: (observable)=>void
}

```

#### 장점

-   view->controller->model--update 메서드-->view 와 같이 단방향의 데이터 흐름을 통해 상대적으로 단순한 구조의 mvc 패턴을 유지할 수 있다.
-   또한 사이드 이펙트가 발생할 경우 데이터 흐름이 단순하므로 top down 방식으로 검수할 수 있어 디버깅에 강점이 있다.
-   model:view의 관계를 1:n으로 관심사에 따라 view객체를 컴포넌트로 나눌 수 있어 유지보수 입장에 이점을 갖을 수 있다.

#### 단점

-   `model`과 `view` 사이에 강한 종속성이 존재하기 때문에 `model`과 `model`간의 연쇄작용을 일으키려면 추가적인 구조를 설계해야하기 복잡성이 증가한다.
-   model:view=1:n 관계를 가지고 있지만 model의 일부분이 변경되더라도 관련있는 모든 view가 새로 그려져야 하므로 성능상 불리한 조건을 가지고 있다.

### MVC with PubSub Pattern

#### 장점

-   observer 패턴의 단점인 model간의 강한 종속성을 해소하기 위해 이벤트 기반으로 mutation을 발행하는 패턴이다.
-   AModel과 BModel에 someEvent와 관련된 view.update 함수를 subscribe 한다면, 특정 조건에 someEvent를 publish 하면서 두 모델 모두 mutation이 발생한다.
-   이때 someEvent에 등록되어있지 않은 view는 이벤트를 감지하지 못하므로 리랜더링이 일어나지 않는다. 이는 observer pattern에 비하여 성능상의 이점을 가질 수 있다.

#### 단점

-   redux처럼 데이터를 인메모리 공간에 캐싱하고 있는 형태가 아니므로 매 이벤트마다 새로운 상태를 생성해야하기 때문에 리덕스에 비해 상대적 리소스 낭비가 발생할 수 있다.(아직 와닿지 않는 말.?)
-   redux는 순수함수로 이루어져 있기 때문에 버그를 생성하는데 자연적으로 확률이 줄어드는 효과가 있지만, pubsub의 경우 mutation이 발생할 때 data를 조작하는 과정에서 imutable한 속성을 보장할 수 없기 때문에 human bug가 발생할 확률이 있다.(순전히 내 생각.)
