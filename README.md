Movie Service Project (영화 정보 서비스)
본 프로젝트는 영화 정보를 조회하고, 사용자별 선호 영화를 관리(찜하기)할 수 있는 프론트엔드 서비스입니다. localStorage를 활용한 상태 유지와 컴포넌트 간의 효율적인 데이터 전달에 초점을 맞추어 개발되었습니다.

1. 프로젝트 개요
개발 목적: 사용자 기반의 영화 조회 및 관심 콘텐츠 저장 기능 구현

주요 기능:

영화 목록 조회 및 상세 정보 출력

사용자 로그인 및 세션 유지 (localStorage 기반)

영화 찜하기(즐겨찾기) 기능 및 중복 체크 로직

2. 주요 기술 스택
Frontend: JavaScript (ES6+), React (또는 해당 프레임워크)

Data Management:

localStorage: 로그인 사용자 정보 및 클라이언트 사이드 데이터 캐싱

JSON.parse / JSON.stringify: 객체 데이터의 직렬화 및 역직렬화 처리

Communication: Fetch API (또는 Axios)를 활용한 REST API 통신

3. 핵심 구현 사항
3.1. 사용자 인증 및 데이터 유지
로그인 시 사용자 객체를 JSON 문자열로 변환하여 localStorage에 저장합니다.

페이지 로드 시 저장된 데이터를 파싱하여 로그인 상태를 복구하고, 사용자 식별자(ID)를 전역적으로 참조합니다.

3.2. 컴포넌트 간 데이터 전달 (Props)
부모 컴포넌트로부터 자식 컴포넌트(영화 카드, 버튼 등)로 영화 데이터 및 제어 함수를 전송하여 코드의 재사용성을 높였습니다.

단방향 데이터 흐름을 준수하여 데이터 추적의 용이성을 확보하였습니다.

3.3. 조건부 데이터 조회 (Query String)
특정 사용자의 특정 영화 찜 여부를 확인하기 위해 쿼리 스트링(Query String)을 사용합니다.

형식: /favorites?userId=${userId}&movieId=${movieId}

해당 파라미터를 통해 서버 측에 최소 단위의 데이터를 요청함으로써 효율적인 데이터 필터링을 수행합니다.

4. 실행 방법
Bash
# 의존성 설치
npm install

# 프로젝트 실행
npm start
5. 데이터 구조 (Reference)
User Object: { "id": String, "name": String, ... }

Favorite Object: { "userId": String, "movieId": String, ... }
