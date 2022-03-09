const $ = document;

// loading 시에 사용자 정보를 가져옴
async function getUser() {
  try{
    const res = await axios.get('/users');
    const users = res.data;
    const list = $.getElementById('list');
    list.innerHTML = ``;

    // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
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
          await axios.put('/user/' + key, {name});
          // 다시 getUser 호출
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
          await axios.delete('/user/' + key);
          // 다시 getUser 호출
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
      console.log(res.data);
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
    await axios.post('/user', {name});
    getUser();
  } catch(err) {
    console.error(err);
  }
  e.target.username.value= '';
});