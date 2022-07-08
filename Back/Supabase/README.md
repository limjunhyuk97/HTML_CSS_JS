# Supabase

## Supabase가 무엇인가

- **Serverless Backend**이다.
- **Database 접근 및 수정, Database backup, Authentication policy 설정, Security policy 설정 등의 작업을 수행**해준다.
  - server 관리에 대해서 고민하지 않아도 되게 해줌.

## Supabase가 무엇을 해주는가

- **[RLS (Row Level Security)](https://docs.microsoft.com/ko-kr/sql/relational-databases/security/row-level-security?view=sql-server-ver16)** : DB 행 수준 보안
  - 보안 조건자 (2가지 지원)를 지원함
    - 필터 조건자 : 읽기 작업(SELECT, UPDATE, DELETE)에 사용 가능한 행을 자동으로 필터링
    - 차단 조건자 : 쓰기 작업(AFTER INSERT, UPDATE, BEFORE UPDATE, BEFORE DELETE)을 차단
  - 보안 조건자에 의해서 행 수준 데이터 엑세스가 벌어질 때, 제한할 지 말 지 여부가 결정 된 후 함수가 호출됨
    - **필터 조건자 에 의한 필터링** : 행이 필터링된 경우 인식하지 못함
    - **파단 조건자 에 의한 필터링** : 조건자 위반한 모든 작업은 실패
- **DB 접근** 가능 (DB Backend)
- **User 인증 (User Authentication)** : 사용자 인증

## Subscription

- RLS 정책에 따라서 realtime functionality제공
- 즉, **DB 변경시 권한이 있는 특정 유저들에게 특정 작업을 broadcast**할 수 있음.

> [1] Subscription code 작성
>
> [2] Subscription을 설정 : Supabase -> DB -> Replication -> Subscription 가능하게 할 Table 선택
>
> [3] subscribe 코드 실행시키면, 설정한 상황에 대해서 Broadcast 받을 수 있음

```js
// Subscription code 작성

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

console.log("run");
console.log(process.env.SUPABASE_URL);

// .env 파일에 URL과 ANONKEY를 저장해 준 뒤 가져다 쓴다.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Subscription을 통해서 DB에서 특정 작업을 수행할 때, 다른 권한있는 사용자들에게 broadcast 발생시킴
let { data: posts, error } = supabase
  .from("posts")
  .on("INSERT", (payload) => {
    console.log("DATA INSERTED!", payload);
  })
  .subscribe();

console.log("Done");
```

## RLS

- Supabase_URL과 Supabase_ANON_KEY 정보만 있다면 누구나 데이터에 접근할 수 있을 것 = 문제 발생 가능
- RLS enable 시킨 후에 URL, KEY만 가지고 데이터 가져오려 시도하면 안가져와짐
  - **이때 policy를 지정 / 새로설정 하여 row에 대한 접근을 제한할 수 있다.**
- **policy 설정**
  - Template : 정해진 몇가지 접근 양식들 가져다 쓸 수 있음.
  - Scratch : 직접 정의

> [1] Supabase > Authentication > policies
>
> [2] RLS confirm 시킴 / RLS
>
> [3-1] New Policy -> Template / Scratch
> [3-2] Edit Policy

## Authentication

- 어떻게 유저를 생성하고 유저에게 Authentication을 어떻게 부여하는가?
- Signup (가입)
  - supabase.auth.signUp을 통해서 회원가입 진행하면 identities에 담긴 user_id가 날아옴
  - 해당 user_id로 식별진행

```js
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

console.log("run");
console.log(process.env.SUPABASE_URL);

// .env 파일에 URL과 ANONKEY를 저장해 준 뒤 가져다 쓴다.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

let { user, error } = await supabase.auth.signUp({
  email: "limjunhyuk97+test01@gmail.com",
  password: "12341234",
});

console.log(user);
console.log(error);
```

- Signin (로그인)
  -supabase.auth.signIn을 통해서 로그인 진행

```js
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

console.log("run");
console.log(process.env.SUPABASE_URL);

// .env 파일에 URL과 ANONKEY를 저장해 준 뒤 가져다 쓴다.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

let { user, error } = await supabase.auth.signIn({
  email: "limjunhyuk97+test01@gmail.com",
  password: "12",
});

console.log(user);
console.log(error);
```
