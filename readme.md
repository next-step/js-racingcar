# 설정 변경 

- eslint 설정 

    - Expected linebreaks to be 'LF' but found 'CRLF'.eslintlinebreak-style

        

- eslint-config-airbnb

    - React가 필요 없어, eslint-config-airbnb-base를 사용 

    - peerDependencies를 만족하지 못해, eslint 9버전에서 8버전으로 내림 

# 2단계 - 단위 테스트 연습 



## 학습 목표 

- Github 기반으로 온라인 코드 리뷰
- 코딩 컨벤션을 준수하며 개발
- 단위 테스트를 작성하며 개발
- 함수(또는 메서드)를 분리하는 리팩터링

## 요구 사항 

- 설계한 자동차를 클래스 기반 - Jest 단위 테스트를 작성

1. 자동차는 이름을 상태로 가질 수 있음 
2. 자동차는 위치 값을 가지며, 초기 상태는 0
3. 자동차는 전진할 수 있으며, 한 번에 1만큼 전진 

---

## 설계 

1. 이름은 문자열이어야 한다.

2. 위치 값은 3차원을 기준으로 하며, { x: 0, y: 0, z: 0 } 의 형태이어야 한다다