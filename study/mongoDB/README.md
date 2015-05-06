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
- 4 paremeters : 조건, 변경값, 조건에 해당하는 값이 없을 때 지정값 적용 (true/false), 이 값이 false면 무시, 해당 테이블 전체에 적용 (true/false)
- db.users.update({user_id:"AAA"}, {$set:{age:10}}) : user_id가 AAA일 때, age를 10으로 변경
- db.users.update({user_id:"BBB"}, {$set:{age:5}}, true) : 조건을 찾지 못했을 때 {user_id:"BBB", age:5} 삽입

## DELETE
- db.users.remove({user_id:"abc123"});
- db.users.remove({age:{$gt:20});
- db.users.remove() : 데이터 전체 삭제
- db.users.drop() : 테이블 삭제


# NODE.JS 적용
## import
- var MongoClient = require('mongodb').MongoClient;
- var assert = require('assert')
- var ObjectId = require('mongodb').ObjectID;
- var url = 'mongodb://localhost:27017/test'; 

## operation basic 
- var operation = function(db, callback) {
-     ...blah...
-     callback();
- };
- MongoClient.connect(url, function(err, db) {
-     assert.equal(null, err);
-     operation(db, function() {
-         db.close();
-     });
- });

# INSERT
var insertDocument = function(db, callback) {
   db.collection('restaurants').insertOne( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ],
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback(result);
  });
};

# FIND
var findRestaurants = function(db, callback) {
    var cursor = db.collection('restaurants').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};


# FIND (condition)
var findRestaurants = function(db, callback) {
    var cursor = db.collection('restaurants').find( { "borough": "Manhattan" } );
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                console.dir(doc);
            } else {
                callback();
            }
        });
    };

# FIND (embedded)
var findRestaurants = function(db, callback) {
    var cursor = db.collection('restaurants').find( { "address.zipcode": "10075" } );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

# FIND (array)
var findRestaurants = function(db, callback) {
    var cursor = db.collection('restaurants').find( { "grades.grade": "B" } );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

# FIND (operational)
var findRestaurants = function(db, callback) {
    var cursor =db.collection('restaurants').find( { "grades.score": { $gt: 30 } } );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};


// less than ($lt)
// or ($or), and ($and)
// Combine


