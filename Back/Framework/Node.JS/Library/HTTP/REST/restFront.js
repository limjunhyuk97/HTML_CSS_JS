// 돌아가는 것은 restServer.js 이고
// restFront.js 는 페이지 속에 기능으로 내장되어 있는 것들에 대한 저의

const $ = document;

// loading 시에 사용자 정보를 가져옴
async function getUser() {
  try{
    // /users 에 get요청을 보내고, 그에 대한 response를 res에 넣음
    const res = await axios.get('/users');
    // users에는 사용자 정보가 들어있는 json 객체가 들어감
    const users = res.data;
    // list 하위에 사용자 정보가 들어가게 된다. 또한, list는 일단 비운다.
    const list = $.getElementById('list');
    list.innerHTML = ``;

    // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
    // user의 각 key-value(유저정보) 마다 list 하위에 추가
    Object.keys(users).map(function(key){
      const userDiv = document.createElement('div');
      const span = document.createElement('span');
      span.textContent = users[key];

      // button (edit), 수정 버튼
      const edit = $.createElement('button');
      edit.textContent = `수정`;
      edit.addEventListener('click', async() =>{
        const name = prompt("바꿀 이름을 입력하세요");
        if(!name){
          return alert('이름을 반드시 입력해야 합니다.')
        }
        try {
          // /user에 대해서 유저 이름 변경 요청 전송
          await axios.put('/user/' + key, {name});
          // 다시 페이지 랜더링
          getUser();
        } catch(err){
          console.error(err);
        }
      });

      // button (remove), 삭제버튼
      const remove = $.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async() =>{
        try {
          // /user에 대해서 유저 제거 요청 전송
          await axios.delete('/user/' + key);
          // 다시 페이지 랜더링
          getUser();
        } catch(err){
          console.error(err);
        }
      });

      // 생성된 요소들 추가
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
    });
  }
  catch(err) {
    console.error(err);
  }
}

// 화면 로딩 시에 getUser 호출
// js가 문서가 모두 준비된 상황 이후에 발동하도록 설정.
window.onload = getUser;

// 1. addEventListener의 callback은 발생한 해당 event를 유일한 인자로 받는다.
// 2. preventDefault() : 어떤 이벤트 명시적으로 처리하지 않은 경우 해당 이벤트에 대한 브라우저의 기본동작을 실행하지 않도록 지정
$.getElementById('form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const name = e.target.username.value;
  if(!name){
    return alert('이름을 입력하세여!');
  }
  try {
    // json 객체를 post 한다. {name}으로 적으면, { 속성명 = name : 값 = name 변수값 } 으로 객체 생성. 단축 가능
    // 페이지 이동 없이 서버에 요청을 보내기 위해서 axios 사용
    await axios.post('/user', {name});
    // getUser 호출
    getUser();
  } 
  catch(err) {
    console.error(err);
  }
  // id 인 username 속성의 value 초기화
  e.target.username.value= '';
});