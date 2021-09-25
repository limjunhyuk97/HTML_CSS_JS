# Table 생성

CREATE TABLE `table_name`
(
	col_name1 char(8) NOT NULLL,
  	col_name2 char(5),
  	col_name3 int,
	PRIMARY KEY(col_name)
);


# 데이터 검색

SELECT * FROM table_name WHERE condition;
SELECT * FROM table_name WHERE col_name1="..."

# 테이블 삭제

DROP TABLE `table_name`;
