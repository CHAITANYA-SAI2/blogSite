const express=require('express');
const app=express();
const cors=require('cors')
const dotenv =require("dotenv");
const mongoose=require('mongoose');
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const postRoute=require("./routes/posts")
const categoryRoute=require('./routes/categories');
const path=require('path')
const multer=require("multer");
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/images",express.static(path.join(__dirname+"/images")))
mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(console.log("Connected to mongoDB")).catch((error)=>{console.log(error)});
const destinationPath = path.join(__dirname, 'images');


const storage=multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // Handle destination error
      cb(null, destinationPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    try {
      // Handle filename error
      cb(null, req.body.name);
    } catch (error) {
      cb(error);
    }
  },
  
})

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  console.log(req.file)
  res.status(200).json("File has been uploaded...");
})

app.use("/api/auth",authRoute);

app.use("/api/users",userRoute);

app.use("/api/posts",postRoute);

app.use("/api/categories",categoryRoute);
app.listen(5000,()=>{
    console.log("App is running..");
})