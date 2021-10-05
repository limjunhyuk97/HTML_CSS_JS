-- 데이터베이스 생성 (CREATE)

-- 동일 이름의 DB 존재한다면, 제거 하고 생성
DROP DATABASE IF EXISTS 데이터베이스
CREATE DATABASE 데이터베이스




-- 데이터베이스 지정 (USE)

-- 현재 들여다 볼 DB 지정
USE 데이터베이스




-- Table 생성 (CREATE)

-- 새로운 테이블 생성 및, 속성 정의
CREATE TABLE `table_name`
(
	col_name1 char(8) NOT NULLL,
  	col_name2 char(5),
  	col_name3 int,
	PRIMARY KEY(col_name)
);

-- 기존의 테이블의 일부에 대해서 복사하여, 새로운 테이블 생성
CREATE TABLE table_name (SELECT col1, col2 .. FROM other_table WHERE condition..);

-- CHAR, VARCHAR : 영문자 기준 1byte 할당 (영문) 
-- NCHAR, NVARCHAR : 유니코드 기준 2byte 할당 (한글)
-- MYSQL 은 UTF-8을 이용 : CHAR, VARCHAR 사용해도 한글, 영어 모두 입력 제약 없음. (n) 이면 n개의 글자 입력 받음.




-- 데이터 검색 (SELECT)
SELECT select_expr
	[FROM table_references]
	[WHERE where_conditions]
	[GROUP BY {col_name | expr | position}]
	[HAVING where_conditions]
	[ORDER BY {col_name | wxpr | position}] 

-- 예시
-- 모든 열 고르기
SELECT * FROM DB_name.table_name;

-- 열의 별칭 부여하기
SELECT col1 AS alias1, col2 alias2 FROM DB_name.table_name;

-- WHERE 조건
SELECT cols FROM table_name WHERE col_name1="...";

-- 조건/관계 연산자
SELECT cols FROM table_name WEHRE col_name1="..." AND ...;
(AND, OR, NOT, >, <, >=, <=, =, =!)

-- 연속적 값(BETWEEN AND)
SELECT * FROM table_name WHERE col_name NOT BETWEEN n AND m;

-- 이산적 값(IN())
SELECT * FROM table_name WHERE col_name IN(value1, value2);

-- 문자열 내용(LIKE()) : %(내용) , _(한단어). %, _를 가장 앞에 붙이면 탐색 비효율성 발생.
SELECT * FROM table_name WHERE col_name LIKE("김%");
SELECT * FROM table_name WHERE col_name LIKE("김_"); 

-- 서브 쿼리 + ANY, ALL, SOME

-- 서브쿼리(+ANY) : 서브쿼리 결과 중 하나만 만족해도 출력
SELECT * FROM table_name WHERE col_name > ANY (SELECT col FROM .. WHERE ..);

-- 서브쿼리(+ALL) : 서브쿼리의 결과 모두 만족해야 출력
SELECT * FROM table_name WHERE col_name < ALL (SELECT col FROM .. WHERE ..);

-- 서브쿼리(+SOME) : 서브쿼리 결과 중 하나만 만족해도 출력
SELECT * FROM table_name WHERE col_name = SOME (SELECT col FROM .. WHERE ..);

-- 서브쿼리(+ANY/+SOME) = WHERE 조건 + 이산적 값(IN()) : 이하의 세개는 모두 같은 결과를 보인다.
SELECT * FROM table_name WHERE col_name = SOME (SELECT col FROM .. WHERE ..);
SELECT * FROM table_name WHERE col_name = ANY (SELECT col FROM .. WHERE ..);
SELECT * FROM table_name WHERE col_name IN( SELECT col FROM .. WHERE ..);

-- 결과 정렬 (ORDER BY) : 반드시 SELECT, FROM, WHERE, GROUP BY, HAVING 절 뒤에 와야 한다. 또한 부하를 많이 일으킬 수 있음

-- 결과 정렬(ORDER BY), 기본은 오름차순
SELECT * FROM table_name ORDER BY col;

-- 결과 정렬(ORDER BY), 내림차순
SELECT * FROM table_name ORDER BY col DESC;

-- 결과 정렬(ORDER BY), 서브쿼리, 여러 요소를 바탕으로 한 정렬 : 이하는, 어떤 조건으로 찾은 col2 속성에 대한 결과값, 보다 큰 col2 속성값을 갖는, 레코드들을 col1 기준 내림차순, col1이 같다면 col2 기준 오름차순으로 정렬.
SELECT * FROM table_name WHERE col2 > (SELECT col2 FROM table_name WHERE ...) ORDER BY col1 DESC, col2 ASC;

-- 결과 중복 제거(DISTINCT)
SELECT DISTINCT * FROM table_name;

-- 결과 개수 제한(LIMIT) : 이하는 0번쨰부터 5개만큼 가져오는 방식
SELECT * FROM table_name ORDER BY col ASC LIMIT 0, 5;
SELECT * FROM table_name ORDER BY col ASC LIMIT 5;
SELECT * FROM table_name ORDER BY col ASC LIMIT 5 OFFSET 0;

-- 하나의 속성을 공유하는 중복된 값들에 대한 그룹 형성(GROUP BY + aggregate function : 집계함수)

-- GROUP BY : 그룹 형성 > 집계 함수 : 그룹 내에서의 연산결과를 출력
-- GROUP BY g1, g2 .. : g1으로 쪼갠 그룹을 내부적으로 g2로 또 쪼갠다.
SELECT col1, SUM(col2 * col3) FROM table_name GROUP BY col1;
SELECT userID, COUNT(userID) FROM buyTBL GROUP BY userID;
SELECT userID, SUM(amount * price) FROM buyTBL GROUP BY userID ORDER BY SUM(amount * price);
SELECT userID, SUM(amount * price) FROM buyTBL GROUP BY userID ORDER BY SUM(amount * price) ASC LIMIT 0, 3;

-- 집계 함수 
-- 합계, 평균, 최소, 최대, 행의 갯수, 중복제거 행의 갯수, 표준편차, 분산
SUM() AVG() MIN() MAX() COUNT() COUNT(DISTINCT) STDEV() VAR_SAMP()

-- 테이블에서 최대, 최소 뽑아내는 예시
-- (), IN() 의 결과로 하나의 column만 return 되어야 한다.
SELECT userName, height FROM userTBL
	WHERE height = (SELECT MAX(height) FROM userTBL) OR
		height = (SELECT MIN(height) FROM userTBL); 

SELECT COUNT(mobile1) FROM userTBL;

-- HAVING : WHERE 절에서 걸러낼 수 없는, 집계함수의 연산 결과에 대해서 조건을 제한한다.
SELECT userID, SUM(amount * price) FROM buyTBL GROUP BY userID HAVING SUM(amount * price) >= 100;

-- WITH ROLLUP : 분류별 합계, 또는 총 합계를 구한다.
-- GROUP By g1, g2 : g1 단위로 쪼개고, g1 안을 또 g2 단위로 쪼갰다. 이 때, ROLLUP 하면, 각 g1 내부에서 g2 덩어리들에 대한 중간 합계 한번, 외부에서 g1 덩어리들에 대한 최종합계 한번 일어날 것.
SELECT num, sum(amount * price) FROM buyTBL GROUP BY groupName, num WITH ROLLUP;

-- Duration : Query 실행하는데 걸린 시간
-- Fetch : 테이블에서 데이터를 가져오는데 걸린 시간




-- 데이터 추가 (INSERT)
INSERT INTO table_name VALUES(...);




-- 데이터 변경 (UPDATE)
UPDATE table_name SET targetcol_name=.. WHERE keycol_name=..




-- 데이터 삭제 (DELETE)
DELETE FROM target_table WHERE targetcol_name=.. 




-- 테이블 삭제 (DROP)
DROP TABLE `table_name`;

