
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/phones", (req,res)=>{
  fs.readFile("./phones.json","utf8",(err,data)=>{
    if(err) return res.status(500).json({message:"Gagal membaca data"});
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
