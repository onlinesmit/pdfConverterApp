const express = require('express');
const multer  = require('multer');
const docxToPDF = require('docx-pdf');
const path = require("path");

const app = express();
const port = 3000;

//setting file storage by using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
app.post('/profile', upload.single('file'), (req, res, next) => {
 try {
  if (!req.file) {
    return res.status(400).json({
      message: "file not uploaded"
    });
  }

  //definning output path
  let outputPath = path.join(__dirname, "files", `${req.file.originalname}.pdf`)
  docxToPDF(req.file.path, outputPath,(err,result) => {
    if(err){
      console.log(err);
    }
    console.log('result'+result);
  });
  

 } catch (error) {
    console.log(error)
 }
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})