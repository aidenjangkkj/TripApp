
---

# TripApp

**TripApp**은 React와 Tailwind CSS를 기반으로 제작된 여행 계획 애플리케이션입니다. 사용자가 손쉽게 여행 일정을 계획하고 관리할 수 있도록 설계되었으며, ChatGPT API를 활용해 개인 맞춤형 여행 추천 기능을 제공합니다.

## 프로젝트 소개

TripApp는 다음과 같은 특징을 갖고 있습니다.

- **여행 일정 관리**: 사용자가 여행 일정, 방문할 장소, 숙박 정보 등을 입력하고 관리할 수 있습니다.
- **ChatGPT API 기반 여행 추천**: OpenAI의 ChatGPT API를 사용해 사용자 취향에 맞는 여행지 및 일정 추천을 제공합니다.
- **Tailwind CSS**: Tailwind CSS를 통해 빠른 스타일링과 커스터마이징이 가능합니다.

## 기술 스택

- **React** – 사용자 인터페이스 구축
- **Tailwind CSS** – 유틸리티 퍼스트 CSS 프레임워크
- **ChatGPT API** – 여행 추천 기능 구현을 위한 자연어 처리 서비스
- **JavaScript (ES6+)** – 애플리케이션 로직 구현

## 설치 및 실행 방법

아래 단계에 따라 로컬 환경에서 TripApp을 실행할 수 있습니다.

1. **레포지토리 클론**

   ```bash
   git clone https://github.com/aidenjangkkj/TripApp.git
   cd TripApp
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **환경 변수 설정 (ChatGPT API 사용을 위한 설정)**

   TripApp은 OpenAI의 ChatGPT API를 활용합니다. [OpenAI](https://openai.com/api/)에서 API 키를 발급받은 후, 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 아래와 같이 API 키를 추가해주세요.

   ```env
   REACT_APP_OPENAI_API_KEY=your_api_key_here
   ```

4. **개발 서버 실행**

   ```bash
   npm start
   ```

   브라우저에서 [http://localhost:3000](http://localhost:3000)로 접속하면 애플리케이션이 실행됩니다.

## 사용 가능한 스크립트

프로젝트 디렉토리 내에서 다음 명령어들을 사용할 수 있습니다:

- **`npm start`**  
  개발 모드에서 애플리케이션을 실행합니다. 코드 변경 시 자동으로 페이지가 리로드됩니다.

- **`npm test`**  
  테스트 러너를 실행하여 작성된 테스트를 진행합니다.

- **`npm run build`**  
  프로덕션용 빌드를 생성하여 `build` 폴더에 최적화된 결과물을 저장합니다.

- **`npm run eject`**  
  빌드 도구와 설정을 프로젝트로 복사합니다. *(주의: 이 작업은 되돌릴 수 없습니다.)*

## ChatGPT API 기반 여행 추천 기능

TripApp은 OpenAI의 ChatGPT API를 활용하여 사용자의 여행 취향에 맞는 추천 정보를 제공합니다.

- **추천 방식**: 사용자가 입력한 선호도와 여행 정보에 기반하여 ChatGPT API가 적절한 여행지, 일정, 활동 등을 추천합니다.
- **설정**: 앞서 설명한 대로 `.env` 파일에 API 키를 추가하면, 앱 내에서 해당 기능이 활성화됩니다.
- **확장성**: 필요에 따라 추천 로직이나 추가 기능을 쉽게 확장할 수 있도록 구성되어 있습니다.

## 배포

`npm run build` 명령어를 통해 생성된 빌드 결과물은 정적 파일로, 다양한 호스팅 서비스(Netlify, Vercel 등)에 배포할 수 있습니다.

## 기여 방법

TripApp에 기여하고 싶으시다면 아래 절차를 참고해주세요:

1. 이슈를 생성하여 개선 사항이나 버그를 제안합니다.
2. 풀 리퀘스트(PR)를 통해 코드를 제출합니다.
3. 코드 리뷰 후 머지됩니다.

자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md) 파일(있을 경우)을 참고해주세요.

## 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.

## 작성자

- [aidenjangkkj](https://github.com/aidenjangkkj)

---
