---

# 사업자 등록번호 조회 서비스

이 프로젝트는 사용자가 사업자 등록번호를 입력하여 사업자 등록 정보를 조회할 수 있는 웹 애플리케이션입니다. 시스템은 **Spring Boot**를 백엔드로 사용하고 **React**를 프론트엔드로 사용하여, 외부 API로부터 사업자 정보를 가져와 데이터를 파싱한 후 사용자에게 표시합니다.

## 사용 기술
- **Spring Boot**: 백엔드 프레임워크
- **React**: 프론트엔드 라이브러리
- **OkHttp**: 외부 API 요청을 위한 HTTP 클라이언트
- **Gson**: JSON 데이터 처리 라이브러리
- **Axios**: React에서 비동기 HTTP 요청을 위한 라이브러리
- **Java 17**: Java 버전

## 주요 기능 및 구조

### 1. 백엔드 (Spring Boot)
백엔드는 컨트롤러와 서비스 레이어로 구성되어 있습니다.

#### **BusinessController**
- `/api/business/status` 경로로 POST 요청을 받아, 입력된 사업자 등록번호를 외부 API에 전달합니다.
- 응답받은 사업자 등록 정보를 다시 클라이언트에 전달합니다.

#### **BusinessService**
- **OkHttp** 클라이언트를 이용해 외부 API 호출을 담당합니다.
- 입력된 사업자 등록번호를 JSON 형식으로 변환하여 API로 전달하고, 반환된 결과를 String 형태로 파싱해 컨트롤러로 반환합니다.

### 2. 프론트엔드 (React)
React에서는 사용자가 사업자 등록번호를 입력할 수 있는 폼을 제공하며, **Axios**를 통해 백엔드로 데이터를 전송합니다.

- **입력 폼**: 사용자가 사업자 등록번호를 입력하고 조회 버튼을 클릭하면 백엔드에 조회 요청을 보냅니다.
- **결과 출력**: 백엔드로부터 받은 사업자 등록 정보를 테이블 형식으로 화면에 출력합니다. 만약 오류가 발생할 경우, 에러 메시지를 출력합니다.

## 의존성
필요한 의존성은 `build.gradle`에 정의되어 있으며, 다음과 같은 주요 라이브러리를 포함하고 있습니다:

- `org.springframework.boot:spring-boot-starter-web`: Spring Boot 웹 애플리케이션을 위한 기본 의존성.
- `com.squareup.okhttp3:okhttp`: 외부 API 호출을 위한 HTTP 클라이언트.
- `com.google.code.gson:gson`: JSON 파싱을 위한 라이브러리.
- `axios`: React에서 API 요청을 처리하기 위한 라이브러리.

## 데이터 흐름
1. 사용자가 프론트엔드에서 사업자 등록번호를 입력 후 조회 요청을 보냅니다.
2. React가 **Axios**를 통해 입력된 번호를 백엔드로 전송합니다.
3. Spring Boot 백엔드에서 **OkHttp** 클라이언트를 사용하여 외부 API로부터 데이터를 받아옵니다.
4. 받아온 데이터를 프론트엔드로 다시 전달하고, React에서 테이블 형식으로 출력합니다.

## 추가 설명

### **OkHttp**: 
- 외부 API와의 HTTP 통신을 쉽게 처리할 수 있도록 도입되었습니다. 프로젝트 초기에는 다른 HTTP 클라이언트 옵션도 고려되었으나, **OkHttp**는 비동기 요청 처리와 빠른 응답 속도, 그리고 쉬운 API 제공으로 선택되었습니다. 이는 사업자 등록번호를 외부 API에 전달하고, 실시간으로 데이터를 받아오는 데 적합했습니다.

### **Gson**: 
- 백엔드에서 외부 API에 전달할 데이터를 JSON 형식으로 직렬화하기 위해 사용되었습니다. 원래는 단순 문자열 처리만을 고려했으나, API에서 요구하는 JSON 구조를 구현하기 위해 **Gson** 라이브러리를 도입하여 코드의 가독성과 유지보수성을 높였습니다.

---
