# 설정 변경

- eslint 설정

  - Expected linebreaks to be 'LF' but found 'CRLF'.eslintlinebreak-style

- eslint-plugin-jest

  - jest와 eslint를 묶어주는 패키지

  - eslint-plugin-jest

- eslint-config-airbnb

  - React가 필요 없어, eslint-config-airbnb-base를 사용

  - peerDependencies를 만족하지 못해, eslint 9버전에서 8버전으로 내림

  - https://www.npmjs.com/package/eslint-config-airbnb-base

- eslint-plugin-import

  - 라이브러리 패키지 구문을 빼고, 직접 작성한 파일은 확장자를 붙이도록 한다

  - https://pozafly.github.io/environment/putting-rules-into-import-syntax-with-eslint/

# 학습 목표

- Github 기반으로 온라인 코드 리뷰
- 코딩 컨벤션을 준수하며 개발
- 단위 테스트를 작성하며 개발
- 함수(또는 메서드)를 분리하는 리팩터링

# 2단계 - 단위 테스트 연습

## 요구 사항

- 설계한 자동차를 클래스 기반 - Jest 단위 테스트를 작성

1. 자동차는 이름을 상태로 가질 수 있음
2. 자동차는 위치 값을 가지며, 초기 상태는 0
3. 자동차는 전진할 수 있으며, 한 번에 1만큼 전진

---

## 설계

1. 이름은 문자열이어야 한다.

2. 위치 값은 3차원을 기준으로 하며, { x: 0, y: 0, z: 0 } 의 형태이어야 한다

---

# 3단계 - 콘솔 기반 핵심 기능 구현

## 기능 요구 사항

콘솔에서 동작하는 자동차 경주 게임을 구현한다.

1. 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.

2. 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.

3. 자동차 경주는 5회로 고정하여 진행한다.

4. 자동차는 1회당 1칸씩 전진한다

5. 회차를 거듭할 때마다 자동차가 지나간 궤적을 출력한다(실행 예시 참고).

6. 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.
