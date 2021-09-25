# Table 생성

create table `table_name`
(
	col_name1 char(8) NOT NULLL,
  	col_name2 char(5),
  	col_name3 int,
 	 PRIMARY KEY(col_name)
);


# 데이터 검색

Select * from table_name where condition;
Select * from table_name where col_name1="..."

# 테이블 삭제

drop table `table_name`;
