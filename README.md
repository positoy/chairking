# 소개
SWSSM 의자왕 프로젝트 git 저장소입니다

## 디렉토리
- chairapp : node.js로 작성한 서버프로그램이 저장되는 곳입니다.
- chairapp/public : 웹서버의 최상위 폴더입니다. 웹뷰로 보여질 페이지와 d3js가 저장되는 곳 입니다.
- android : 안드로이드 프로그램이 저장되는 곳입니다.

## git 저장소 복사
우분투에서 다음과 같이 실행하면 됩니다.
- sudo apt-get install git
- git clone https://github.com/positoy/chairking

## mongoDB 구조 (JSON 형식)
- collection { document format }
- values { user:'chairking', time:tt, alarmed:true or false, posture:모델중하나, sensor:[1,2,3,...,n] }
- users { user:'chairking', password:'swssm' }
- share { from:'ps', to:'psMom' }

## 이슈 (회의로 정해야 할 것)
- 데이터 JSON 형식
- 센서데이터 json 형식 : "{"id":"chairman","sensor":[1,2,3,4,5,6,7,8,9,10,11,12]}"
