import axios from './node_modules/axios/index.js'

const user={
  name:"jun",
  age:"26",
  emails:[
    "limmyee@gmail.com",
    "blinkblinkeye@naver.com"
  ]
};

function fetchMovies() {
  axios.get("https://www.omdbapi.com/?apikey=7035c60c&s=frozen")
  .then((res)=>{
    console.log(res);
  })
}

fetchMovies();














