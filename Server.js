let express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const bcrypt = require('bcrypt');
const knex=require('knex');
let app=express();
app.use(bodyParser.json());//used for converting json to string 
app.use(cors());

const Register=require('./Controllers/Register');
const SignIn=require('./Controllers/SignIn');
const Profile=require('./Controllers/Profile');
const Image=require('./Controllers/Image');

//Now adding Backend with Databases
const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',  //Defining LocalHost where database should be stored
      user : 'postgres',
      password : 'Rajeev@123',
      database : 'facedetectiondb'
    }
  });

    
  







app.get('/',(req,res)=>{res.json('Welcome to Database')})


app.post('/signin',(req,res)=>{SignIn.handleEmail(req,res,db,bcrypt)});

app.post('/register',(req,res)=>Register.handleRegister(req,res,db,bcrypt));

app.post('/profile/:id',(req,res)=>Profile.handleProfileGet(req,res,db));


app.put('/image',(req,res)=>Image.handleImage(req,res,db));
app.post('/imageUrl',(req,res)=>Image.handleImageUrl(req,res));

const PORT=process.env.PORT;
app.listen(PORT|| 3000,()=>{
    console.log(`app is running on port ${PORT}`);
})
