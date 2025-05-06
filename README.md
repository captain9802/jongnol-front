#  JongNol - Frontend

**JongNol**은 퀴즈를 생성하고 풀이하며, 사용자와 지식을 공유할 수 있는 플랫폼입니다.
이 저장소는 JongNol 서비스의 **React 기반 프론트**입니다.

---

## 🚀 주요 기능

* 📄 퀴즈 생성 및 업로드 (`creatquiz.js`)
* 🌟 퀴즈 풀이 및 정답 확인 (`solvequiz.js`, `resultquiz.js`)
* 👤 로그인 및 마이페이지 관리
* 🗺️ 메인 페이지 및 레이아웃 구성
* ⚠️ 에러 페이지 구성

---

## 📁 주요 포백 구조

```
src/
├─ apis/               # 백엔드 API 통신 함수
├─ components/         # 공통 케코 콘텐츠
├─ pages/
│   ├─ login/          # 로그인 화면
│   ├─ main/           # 메인 화면
│   ├─ mypage/         # 마이페이지
│   ├─ quiz/           # 퀴즈 생성/풀이/결과
│   └─ errorPage.js    # 에러 페이지
├─ store/              # 상태 관리 (Redux 또는 자체 store)
├─ slices/             # Redux 슬라이스 정의
├─ App.js              # 라우티드 및 앱 진입점
└─ index.js            # React 앱 엔트리포인트
```

---

## 🛠 기술 스택

| 범위        | 기술                           |
| --------- | ---------------------------- |
| Framework | React                        |
| Routing   | React Router                 |
| 상태관리      | Redux, 자체 store 구조           |
| 스타일링      | CSS 모듈 + 글로벌 스타일 (`styles/`) |
| API 통신    | Axios (`apis/` 내만 정의)        |
| 인증        | JWT 기반 로그인 구현                |
| 빌드 및 배포   | Vite 또는 CRA (추가 확인 필요)       |

---

## ⚙️ 실행 방법

```bash
git clone https://github.com/captain9802/jongnol-front.git
cd jongnol-front
npm install
npm run start
```

> ⚠️ `.env` 파일에서 API 서버 주소(`REACT_APP_API_URL`) 등을 반드시 설정해야 합니다.

---

## 🔗 연동 백엔드

* Backend: [jongnol-back](https://github.com/captain9802/jongnol-back)
* 인증/퀴즈 API 통신은 Axios를 통해 처리됩니다.

---

## 👨‍💼 개발자

* 손우성 ([@captain9802](https://github.com/captain9802))

---
