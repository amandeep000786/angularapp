
const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();
const database = require('./db');

const DIR = '../uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()  + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST','GET','DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.post('/api/delete', (req,res,next) => {
  //console.log("req" , req.body);
  console.log(req.body.id);

database.any('delete from "data" where id=($1)',
[req.body.id])
.then(data => {
console.log(data)
  res.json({
    message: 'succesfull deletion',
    success: true,
    data: data,  
  });

})
    .catch(error => {
      // error;
      console.log(error);
    });
  })

app.post('/api/edit', (req,res,next) => {
  //console.log("req" , req.body);
  console.log(req.body.id);

database.any('select * from "data" where id=($1)',
[req.body.id])
.then(data => {
console.log(data)
  res.json({
    message: 'succesfull ',
    success: true,
    data: data,  
  });

})
    .catch(error => {
      // error;
      console.log(error);
    });
  })



app.use('/download',function(req,res,next){
  console.log(__dirname);
  console.log(req.url);
  var address = "F:/Newfolder/crud-app/uploads";
 console.log("path = ", __dirname+'/uploads')
  filepath = path.join(address)+req.url;
  console.log(filepath);
  res.sendFile(filepath);
});


app.post('/api/update', (req,res,next) => {
  //console.log("req" , req.body);
  console.log(req.body);

database.any('update "data" set name=($1), roll_no=($2),picname=($3),gender=($4),langknown=($5),dob=($6) where id=($7)',
[req.body.name,req.body.roll_no,req.body.filename,req.body.gender,req.body.langknown,req.body.date,req.body.id])
.then(data => {
//console.log(data)
  res.json({
    message: 'succesfull data updation',
    success: true,
    data: data,  
  });

})
    .catch(error => {
      // error;
      console.log(error);
    });
  })


app.post('/api/upload',upload.single('image'), function (req, res) {
  console.log(req.file);
  
  if (!req.file) {
      console.log("No file received");
      return res.json({
        success: false
      });

    } else {
      console.log('file received');
      return res.json({
        success: true,
        filename:req.file.filename
      })
    }
})
  
app.post('/api/page', (req,res,next) => {
    //console.log("req" , req.body);
    console.log(req.body);

database.any('insert into "data"(name, roll_no,gender,langknown,dob,picname) values($1,$2,$3,$4,$5,$6)',
[req.body.name,req.body.rollno,req.body.gender,req.body.langknown,req.body.date,req.body.filename])
.then(data => {
  console.log(data)
    res.json({
      message: 'succesfull data submission',
      success: true,
      data: data,  
    });
  
})
      .catch(error => {
        // error;
        console.log(error);
      });
    })








    app.get('/api/page/get', (req,res,next) => {
  
     
  database.any('select * from "data" ')
  .then(data => {
    console.log(data)
      res.json({
        message: 'succesfull get',
        success: true,
        result: data,  
      });
    
  })
        .catch(error => {
          // error;
res.json({
  message: 'cannot fetch data',
  success: false

})          
        });
      })
    

//});

module.exports=app;


// -------------------------------------------------------------------------------

// const path = require('path');
// const fs = require('fs');
// const express = require('express');
// const multer = require('multer');
// const bodyParser = require('body-parser')
// const app = express();
// const router = express.Router();

// const DIR = './uploads';

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now()  + path.extname(file.originalname));
//     }
// });
// let upload = multer({storage: storage});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// app.get('/api', function (req, res) {
//   res.end('file catcher example');
// });

// app.post('/api/upload',upload.single('image'), function (req, res) {
//     console.log(req.file.filename);

//     if (!req.file) {
//         console.log("No file received");
//         return res.send({
//           success: false
//         });

//       } else {
//         console.log('file received');
//         return res.send({
//           success: true,
//           file:req.file.filename
//         })
//       }
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, function () {
//   console.log('Node.js server is running on port ' + PORT);
// });


