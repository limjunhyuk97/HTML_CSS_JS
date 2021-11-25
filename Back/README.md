# Database

- MYSQL을 이용한 RDBMS 다루기!





## DB

- 다중의 user, application들이 동시에 접근 가능한 데이터의 집합
- 데이터의 저장공간 자체
- (MYSQL기준) **내부 개체** : table, Index, view, storedprocedure, trigger



### DB가 지켜야 하는 원칙

- **무결성** : 어떤 경로를 통해 들어온 데이터든, 오류가 있어서는 안된다. 이를 위해 **제약조건(constraint)**를 지켜야 한다.
- **독립성** : DB의 크기가 변경되거나, 저장소를 변경하더라도 기존의 응용프로그램은 영향 받아서는 안된다. 즉, **DB와 App은 서로 독립적**이다.
- **보안** : user마다 DB에 접근가능한 깊이가 다르다. 즉, 접근이 허가된 사람만 접근할 수 있다.
- **데이터 중복 최소화** : 동일 데이터가 여러군데 중복 저장되는 것을 방지한다.
- **응용 프로그램 제작** 및 수정이 용이하다 : 통일된 방식으로 응용 프로그램을 작성할 수 있어, 유지, 보수가 편리하다.
- **데이터 안전성 향상** : 데이터 백업/복원 기능을 제공한다.



### DB 모델링, DB 구축

- **DB 모델링** : 현실 세계의 데이터를 DBMS의 DB개체로 옮겨담는 과정.
  - 소프트웨어 개발 방법론(소프트웨어 공학) 에 의거한 모델링에서 DB 모델링은 굉장히 중요하다.
  - 상황을 분석, 테이블 정의, PK 설정, key 제약조건(1:1, 1:N, N:1, M:N), participation 제약조건의 발생 고려.
  - **모델 다이어그램을 만든 뒤**에, **실제 데이터베이스에 적용 가능**하다.
    - (MYSQL) '모델 다이어그램 생성 > database에서 forward engineer' 수행하면 DB를 생성할 수 있다.
    - (MYSQL) '기존 데이터베이스 > database에서 reverse engineer' 수행하면 기존 DB로 다이어그램 생성 가능.
- **DB 구축** : DB 생성 > 테이블 생성 > 데이터 저장 > 데이터 조회 및 삽입, 삭제, 변경 (활용)



### Table

- **현실 세계의 데이터를 담기 위한 표 공간**
- **테이블 내 요소**
  - **데이터** : 체계화되지 않은 단편적인 정보
  - **열(필드, 속성)** : 테이블의 구성성분. 세로줄 단위.
  - **행(레코드)** : 실질적인 데이터. 각 필드에 해당하는 데이터로 구성된다.
  - **기본 키(PK, primary key)** : 각 행들을 구분하는 유일한 열이다. 중복 불가, NULL 불가.
  - **외래 키(FK, foreign key)** : 서로 다른 테이블 간에 관계를 맺게 해주는 key. **해당 key 정보를 바탕으로 부모 테이블로 찾아가면, 유일한 하나의 정보를 얻을 수 있게 된다**. **부모 table의 PK와 연결**짓는다.
- **제약조건**
  - 자식 테이블의 FK에 있는 데이터는 연결된 부모 테이블의 PK에 존재하는 데이터여야만 한다.(참조 무결성)
  - 부모 테이블의 데이터를 제거하기 위해서는, 해당 데이터와 연결되어 있는 자식 테이블의 정보를 먼저 제거해야만 한다.  



### Index

- **테이블의 열단위로 생성하여, 빠른 데이터 접근을 가능하게 해준다.**
- **기본키로 설정된 열에 자동으로 index 생성됨**



### View

- **테이블에 접근 가능한 범위를 지정한다.**
- 가상의 테이블로, select를 통해 구현된다. 즉, 실체가 없고, 존재하는 테이블에 연결된 개념이다.



### Stored Procedure

- **MYSQL에서 제공하는 프로그래밍 기능, SQL 문을 하나로 묶어 편리하게 사용할 수 있게 해주며, 자주 사용하는 기능을 미리 정의하는 것이다.**



### Trigger

- **테이블에 부착되어, INSERT, UPDATE, DELETE 작업이 발생될 때 실행되는 코드이다.**
- 즉, 삽입, 변경, 삭제의 작업에 부수적으로 수행되는 기능을 정의한 코드이다.





## RDBMS(MYSQL/SQL)

- DBMS : DB를 관리하는 역할을 하는 소프트웨어
- 데이터에 동시에 접속하여 데이터를 공유 및 관리.
- **DB 권한 부여**
  - (MYSQL) Administration > Users and Privileges >  Add Account : 접근 가능한 계정 생성
  - (MYSQL) Account Limits : 계정의 질의 수, DB 변경 횟수 등에 대한 제약조건 설정
  - (MYSQL) Administrative Roles : global 접근 권한에 대한 설정
  - (MYSQL) Schema Privileges : 'add Entry'를 통해서 DB 별 권한을 다르게 설정 가능
- **백업과 복원**
  - administration > Data export 를 통해서 특정 위치에 백업 대상의 데이터들을 백업해둔다.
  - administration > Data import 를 통해서 원하는 DB에 해당 데이터를 복원한다.
- **DML/DDL/DCL**
  - **DML(Database manipulation language))** : 데이터를 검색, 삭제, 삽입, 수정 하기 위해 사용하는 언어
    - 테이블의 행을 조작한다.
    - transaction(실제 변경 전에 임시로 적용하는 명령)을 일으키는 명령도 포함됨
    - SELECT INSERT UPDDATE DELETE
  - **DDL(Database definition language)** : DB, 테이블, 뷰, 인덱스 등의 DB 개체를 생성, 삭제, 변경하기 위해 사용하는 언어
    - transaction이 존재하지 않기 때문에, 한번 실행한 내용은 즉시 MYSQL에 적용된다.
    - CREATE DROP ALTER TRUNCATE
  - **DCL(Database control language)** : 사용자에게 어떤 권한을 부여하거나 빼앗을 때 사용하는 언어
    - GRANT REVOKE DENY