# CARAMEL LOUNGE — 상업공간 인테리어 회사 사이트

레퍼런스: mannaldesignstudio 랜딩 구조 + 제공해주신 타이포/CORE VALUE 이미지.

**회사 정보 출처**: 실제 운영 중인 https://caramellounge.imweb.me/about 에서 가져옴 (2026-09-28).
로고(`assets/logo.png`), CORE VALUE·PROCESS 전문, 파트너사 로고(`assets/partners/`), 주소·연락처·
사업자 정보는 모두 이 페이지에서 그대로 가져온 실제 데이터입니다. 랜딩 스테이트먼트는 그 내용을
바탕으로 새로 쓴 영문 번역입니다.

`space.html` 의 `PROJECTS` 배열: 이름(name/kr)은 다수 실제(`https://caramellounge.imweb.me/PROJECT`
갤러리에서 가져온 36건 — Commercial 10건: KANU JAYANG STATION, CREAM ATELIER POPUP, SOBOKJAE SHABU,
GRAFEN POPUP, SEVEN ELEVEN DONGDAEMUN, SEVENBRÄU POPUP, TTUKTTAK SEOLLEONGTANG, KANU SIGNATURE,
NESPRESSO LOTTE DEPARTMENT STORE, JANGMEERASA / Office 5건: I-SQUARE OFFICE PANGYO 외 / Fitness
21건: BUTFIT GROUND·HEALTHBOY GYM·SOUL TRAINING 등 각 지점)이지만, 그 36건을 포함해
**location/area/year/scope/desc 필드는 전부 가상(placeholder)** 입니다. 실제 상세정보와 사진으로
교체 필요. 나머지 11건(HOJEONG COFFEE 등 + HANNAM RESIDENCE)은 이름부터 전부 가상 예시입니다.
(실제 사이트의 Residential 계열 실명 — DEARS·TWINCITY RESIDENCE·J PENTHOUSE 등 — 은 아직 미반영.)

프로젝트 상세 모달(클릭 시 뜨는 화면)의 상단 정보도 단순화됨: 제목/설명 문단/4열 스펙 테이블 대신
`location / principal use / build area / completed` 4줄만 가운데 정렬로 표시 (`.m-info`).

## 파일

```
interior/
├─ index.html      랜딩 (로고 + 영문·국문 스테이트먼트 + About/Project/Contact)
├─ about.html      회사 소개 (히어로 · ABOUT · CORE VALUE · PROCESS · PARTNERS)
├─ space.html      프로젝트 (카테고리·연도 드롭다운 필터 + 그리드 + 상세 모달, nav 라벨은 "Project")
├─ contact.html    문의 폼 + 스튜디오 정보
└─ assets/
   ├─ site.css     전체 스타일
   ├─ site.js      헤더/스크롤 리빌/이미지 플레이스홀더
   ├─ logo.png     실제 로고 (caramellounge.imweb.me 에서 가져옴)
   ├─ partners/    파트너사 로고 9개 (about.html PARTNERS 마퀴에 사용, 실제 데이터)
   └─ projects/    프로젝트 사진 (비어 있음 → 지금은 빗금 플레이스홀더 표시)
```

`index.html` 을 더블클릭하면 바로 열립니다. (서버 불필요)

## 바꿔야 할 것

| 항목 | 위치 | 상태 |
| --- | --- | --- |
| 회사명 `CARAMEL LOUNGE` | 모든 html의 `.mark` / `.logo-type`, `<title>` | 실제 |
| 로고 이미지 | `assets/logo.png` | 실제 |
| 주소 · 전화 · 팩스 · 이메일 | 각 html 하단 `footer`, `contact.html` 우측 정보 | 실제 |
| 이메일 수신 주소 | `contact.html` 하단 스크립트 `MAIL_TO` | 실제 (caramellounge@naver.com) |
| 사업자등록번호 · 대표 · 실내건축공사업 등록 | `about.html`/`contact.html` 하단 | 실제 |
| 프로젝트 목록 (47건, Commercial·Residential·Office·Fitness 4개 카테고리) | `space.html` 상단 `PROJECTS`/`CATS` 배열 | 이름 다수 실제, 나머지 필드는 **가상** — 교체 필요 |

## 프로젝트 사진 넣기

`assets/projects/` 에 아래 이름으로 넣으면 자동 반영됩니다.

```
hojeong-coffee-01.jpg   ← 썸네일 (그리드에 보이는 사진)
hojeong-coffee-02.jpg   ← 상세 모달
hojeong-coffee-03.jpg
```

앞부분 이름은 `PROJECTS` 배열의 `slug` 값과 같아야 합니다.
권장: 가로 1600px 내외 JPG, 썸네일은 4:3, 상세는 16:10.

## 사이트 접근 제한 (최소한의 가림막)

서버가 없는 정적 사이트라 진짜 보안은 아니지만, 아무나 들어오지 못하게 **클라이언트 사이드 비밀번호
화면**을 4페이지 전부에 넣어뒀습니다. 첫 진입 시 비밀번호를 입력해야 콘텐츠가 보이고, 한 번 맞으면
그 브라우저에서는 (`localStorage`) 다시 안 물어봅니다.

- **현재 비밀번호**: `caramellounge`
- **바꾸는 법**: 4개 html 파일(`index.html`/`about.html`/`space.html`/`contact.html`)에서
  각각 `var PW = "caramellounge";` 부분을 찾아 전부 동일하게 수정
- 개발자 도구(F12)로 소스를 보면 비밀번호가 그대로 노출되니 **민감한 내용은 이 방식으로 못 막습니다** —
  링크를 아무나 못 찾게 하는 정도의 가벼운 가림막입니다.

## 문의 폼

필드는 성함·브랜드/상호·연락처·이메일·공간 유형(Commercial/Residential/Office/Fitness/Other)·
현장 위치·면적·예산·희망 오픈일 9개만 남겨뒀습니다 (필요 범위·문의 내용·개인정보 동의 체크박스는
삭제됨). 필수(*)는 성함·연락처·이메일·공간 유형 4개.

서버가 없어도 동작하도록 **메일 앱 연동(mailto)** 방식입니다.
웹에서 바로 접수받으려면 둘 중 하나로 교체하세요.

- Formspree: `<form id="inquiry">` 에 `action="https://formspree.io/f/XXXX" method="POST"` 추가 후
  하단 스크립트의 `e.preventDefault()` 제거
- 구글 폼 / 채널톡 / 카카오 채널 링크 버튼으로 대체
