# Table 생성
CREATE TABLE `table_name`
(
	col_name1 char(8) NOT NULLL,
  	col_name2 char(5),
  	col_name3 int,
	PRIMARY KEY(col_name)
);


# 데이터 검색
SELECT cols FROM table_name WHERE condition;

## 예시
SELECT cols FROM table_name WHERE col_name1="..."


# 데이터 추가
INSERT INTO table_name VALUES(...);


# 데이터 변경
UPDATE table_name SET targetcol_name=.. WHERE keycol_name=..


# 데이터 삭세
DELETE FROM target_table WHERE targetcol_name=.. 


# 테이블 삭제
DROP TABLE `table_name`;


