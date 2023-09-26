const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: 'frontend/drawable/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg';
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('frontend'));

app.post('/sendData', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), (req, res) => {
  const image1Path = req.files['image1'][0].filename;
  const image2Path = req.files['image2'][0].filename;

  console.log(image1Path)
  const backendURL = 'http://127.0.0.1:3001'; 

  
  fetch(`${backendURL}/processData`, {
    method: 'POST',
    body: JSON.stringify({ image1Path, image2Path }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => res.send(data))
    .catch((error) => {
      console.error(error);
      res.status(500).send('Помилка на сервері');
    });
});

app.listen(port, () => {
  console.log(`Фронтенд запущено на порту ${port}`);
});