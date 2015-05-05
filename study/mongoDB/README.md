# 설치


# 시스템
- mongo : DB 접속
- show tables : 콜렉션조회
- db.users.count() : collection의 document 수 조회






# 쿼리
## INSERT
- db.users.insert({ id:'chairking', sensor:[1,2,3,4,5,6,7,8,9,10,11,12] });
- users라는 콜렉션이 없는 경우에도 자동으로 생성된다.
- db.users.count() : document 수를 확인할 수 있다.

## FIND
- db.users.find() : users 콜렉션의 모든 document 출력
- db.users.find({id:'chairking'}) : users 콜렉션에서 id가 'chairking'인 document만 출력
- db.users.find({age:{$gt:20}}, {user_id:1, age:1, _id:0}) : users 콜렉션에서 나이가 20이상인 document들의 내용을 user_id와 age만 나타내어 출력

## SORT
- db.users.find({age:{$gt:20}}, {user_id:1, age:1, _id:0 }).sort({age:-1}) : 위 결과를 나이에 대해 내림차순으로 정렬하여 출력

## UPDATE



 

