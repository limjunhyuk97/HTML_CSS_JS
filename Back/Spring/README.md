# Spring framework


## 1. 개발 환경 설정

### 1.1 JDK 설치

- SDKMAN 사용하여 jdk 버전관리 가능
- SDKMAN 설치

```bash
 curl -s "https://get.sdkman.io" | bash
 source "$HOME/.sdkman/bin/sdkman-init.sh"  
```

- sdk 명령어로 jdk 버전관리 수행

```
 sdk version  <--- sdkman 버전출력  
 sdk list java  <-- 설치 가능 & 설치된 JDK목록  
 sdk install java 11.0.12.7.2-amzn <--- 지정된 JDK설치(원하는 종류와 버전 지정)  
 sdk default java 11.0.12.7.2-amzn <--- 사용할 java버전을 변경(모든 쉘에 적용)
 sdk use java 11.0.12.7.2-amzn <--- 사용할 java버전을 변경(현재 쉘에만 적용)  
 sdk current java <--- 현재 사용중인 java버전 출력  
 echo $JAVA_HOME  <--- JAVA_HOME으로 지정된 경로 출력
```

### 1.2 VScode 설치

### 1.3 Git 설치

### 1.4 Tomcat 설치

- tomcat download 검색하여 tomcat9 버전 설치
- gzip 압축 해제
- tomcat 실행과 종료 (/bin 폴더에 있는 shell 파일 실행)
  - 브라우저에서 localhost:8080으로 실행중인 tomcat을 확인할 수 있다.

```bash
startup.bash
shutdown.bash
```

### 1.5 STS 설치

- STS3 버전 설치
- jre 설정 (1) : STS3 > 패키지 내용보기 > Contents > Eclipse > STS.ini 파일 내용 변경
  - sdk current java : jdk 현재 버전 확인
  - sdk use (current java version)
  - echo $JAVA_HOME : jdk 가 위치한 경로 확인
  - STS.ini 파일 내 openfile 아래에 항목 추가

```vi
-vm
(사용할 jdk가 위치한 곳까지의 경로)
```

- jre 설정 (2) : 다른 경로에 위치한 jdk여도 상관 없다. (/Library/Java/JavaVirtualMachine/ ...)
  - preference > Java > Installed JREs
  - 다른 JRE를 apply. (모든 쉘에서 기본적으로 사용설정된 JRE version을 apply함.)

### 1.6 IntelliJ 설치

### 1.7 AWS 서비스

#### AWS 서비스 와 용어

- **AWS(Amazon Web Service)**
  - Amazon 이 제공하는 cloud computing service로, server를 제공받을 수 있다.
  - 관리가 쉽고, 유연한 확장성을 갖는다.
- **Amazon EC2**
  - 크기 조정이 가능한 컴퓨팅 용량을 클라우드에서 제공하는 웹 서비스
  - EC2에 DB를 직접 생성할 수 있다.
- **Amazon S3**
  - 확장성, 가용성, 내구성을 가진 데이터 저장공간을 제공
- **Amazon RDS**
  - RDB(관계형 데이터베이스) 관리 서비스. 관계형 DB(MYSQL, ORACLE) 모니터링, 주기적으로 백업 수행해줌
  - EC2에 생성하는 것과 마찬가지로 RDB를 생성할 수 있다.
- **VM instance**
  - cloud에 생성하는 가상의 컴퓨터
- **IDC**
  - internet data center(데이터 센터)
  - 서버 컴퓨터와 네트워크 회선 등을 제공하느 시설로, 서버를 한 데 모아 집중시킬 필요가 있을 때 설립한다.
  - IDC 서버를 임대하는 식으로 유저 수의 변동에 따른 비용을 줄일 수 있는 이점이 있다.

||클라우드가 해주는 일|서비스 제공자가 할 일|대표적인 예|
|:---:|:---:|:---:|:---:|
|On-premise| - |네트워크-스토리지-서버-운영체제-미들웨어-런타임-데이터-앱 직접 관리|IDC|
|Iass(Infrastructure as a service)인프라 가상화|네트워크-스토리지-서버(인프라 리소스) 관리|서비스가 돌아갈 개발/운영 환경 관리 + 서비스 개발 + 환경에 배포|AWS EC2, S3, VPC|
|Paas(Platform as a service)개발환경 가상화|인프라 리소스 관리 + 개발/운영 환경 관리|서비스 개발 + 환경에 배포(Flask, Django, Spring 같은 서버 어플리케이션만 배포하면 서비스 가능)|AWS RDS, Docker|
|Saas(Software as a service)소프트웨어 가상화|인프라 리소스 관리 + 서비스가 돌아갈 개발/운영 환경 관리 + 환경에 배포|서비스 개발|AWS API Gateway|
|Serverless|서버 올리고, 런타임 구성하고, 코드 배포해서 실행하는 과정|원하는 로직의 함수 등록|AWS Labda|

#### AWS EC2 instance 생성과 설치 

- EC2 instance에 Tomocat과 JDK 설치 필요. (즉, server 환경에도 EC2와 Tomcat 설치)
  - windows 로 EC2 운영체제를 섩치한 경우
    - RDP 앱을 통해서 원격으로 내가 생성한 EC2 instance 제어가능하다.
    - 해당 EC2 내에서 방화벽을 내려준다 : 
    - EC2대시보드 > 보안그룹 > 인바운드 규칙 > 인바운드 규칙 편집 > 모든 TCP로 유형설정 (모든 TCP packet을 받는걸로) > 규칙저장
    - 내 컴퓨터에서 (ip주소):8080 으로 서버 컴퓨터로 연결가능해진다.

#### AWS server 

## 2. STS 설정

### 2.1 프로젝트 생성

- File > New > Spring Starter Project : Spring Boot Project 생성
- File > New > Spring Legacy Project : Spring Project 생성 

### 2.2 Server 추가 및 실행

- Server 추가
  - 좌측 하단 Servers > New > Server
  - Server type select에 Tomcat 검색
  - 내 로컬에 존재하는 tomcat 버전 선택 후 Finish

- Project에서 Server 실행
  - Project 우클릭 > Run AS > Run on Server > Tomcat 선택 > Finish
  - (**보안상의 이유로 HTTP가 막혀서**)내부 브라우저에서 구동이 안되는 경우
    - Preference > General > Web Browser 
    - Use external web browser 선택
    - New를 통해서 Browser를 추가
      - Name : "Chrome" (아무거나 상관없음) 
      - Location : Application > Google Chrome 선택, 