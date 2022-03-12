const express = require("express");
const path = require("path")

const app = express();
app.set('port', process.env.PORT || 8000);

app.use((req, res, next)=> {
  console.log('executing on all requests')
  next();
})

app.get('/', (req, res, next) => {
  console.log("executing on only GET / requests");
  next();
}, (res, req)=> {
  throw new Error("Error goes to error handling middleware")
});

app.use((err, req ,res, next) => {
  console.error(err);
  res.status(500).send(err.message);
})

app.listen(app.get('port'), () =>{
  console.log(`listening on http://localhost:${app.get('port')}`)
})