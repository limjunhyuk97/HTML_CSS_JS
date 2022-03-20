# 알게된 것


## Cannot set headers after they are sent to the client 에러

- 서버가 클라이언트에게 둘 이상의 응답을 보내려할 때 발생하는 오류이다.
- 즉, 서버가 클라이언트의 요청에 대해 이전에 응답을 보냈었는데, 지금 딴거를 또 보내려한다는 것.

```js
// 문제의 코드
app.post("/login", async (req, res) => {
  console.log(userData);
  const {id, pw} = req.body;
  userData.forEach(el => {
    if(el.id === id){
      if(el.pw === pw) res.json({result : true, stuID : el.stuID});
      else res.json({result : false, detail : "wrong password!"});
    }
  })
  res.json({result : false, detail : "No such ID!"});
})

// return 을 통해서 응답이 클라이언트에 전송되면 코드를 종료시켜야 함
let noIDFlag = true;
  const {id, pw} = req.body;
  userData.forEach(el => {
    if(el.id === id){
      if(el.pw === pw) {
        noIDFlag = false;
        return res.status(200).json({result : true, stuID : el.stuID});
      }
      else{
        noIDFlag = false;
        return res.status(200).json({result : false, detail : "wrong password!"});
      }
    }
  });
  if(noIDFlag) return res.status(200).json({result : false, detail : "No such ID!"});
```

## 로그인 시 아이디 없는 것은 어떤 status로 처리?

- 409 Conflict : 리소스의 현재상태와 충돌하여 요청 처리가 불가능하니, 클라이언트가 요청을 수정해서 보내야 하는 경우

## Response 보낼떄..

- res.json() === res.send() === res.end()

### res.json()

- json이 아닌것도 json으로 바꿔서 보내준다
- Content-Type 헤더값을 application/JSON 형식으로 고정한다
- 결국 res.send()를 호출한다.

### res.send()

- 전해진 argument에 따라서 Content-Type이 자동으로 만들어진다.

### res.end()

- 보내줄 데이터가 아무것도 없는데 response를 끝내고 싶을 때 사용!