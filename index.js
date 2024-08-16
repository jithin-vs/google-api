import express from "express";
import dotenv from "dotenv";
import {modelRun ,upload} from "./file_server.js"

dotenv.config();
const app = express();
const PORT = 3000;

app.post('/upload',upload.single('file'),async (req, res) => {
 
  const text = req.body.text;
  const file = req.file;
  try{
    const result = await modelRun(text ,file.path,file.mimetype);
    console.log(result);
    res.json({message:"processed image succesfully!!",result:result});
  }catch(err){
    console.log("error:",err);
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});