import express from 'express';
import {join} from 'node:path'
import getImages from './dataBaseConnection.js'

const app = express();

app.use((_req, res, next)=>{
  res.set({'Access-Control-Allow-Origin' : '*'});
  next();
})

app.get('/get/:start/:end', async (req, res)=>{
  const {start, end} = req.params;
  const data = await getImages(+start, +end);
  res.json(data);
})

app.get("/img/:name",(req, res)=>{
  const {name} = req.params;
  res.sendFile(join(import.meta.dirname, `./imageStore/${name}`));
})


app.listen(3000, ()=>{
  console.log("Server is listening on port 3000.");
})
