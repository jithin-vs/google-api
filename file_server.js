import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
}; 

async function modelRun(text,filePath,type) {

      try{
        const image = {
            inlineData: {
              data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
              mimeType: type,
            },
          };
        const result = await model.generateContent([text,image],generationConfig);
        // console.log(result.response.text());
        return result.response.text();
      }catch(error){
        console.log("error: ", error);
      }      
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export { modelRun, upload };