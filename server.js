import express from "express";
import cors from 'cors';
import mysql from 'mysql2'
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"7070dhanush123@gmail.com",
        pass:"pwupismrxoiyzvuo"
    }
})







const app = express()
app.use(cors())

app.use(express.json());


// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '9943060731',  
//     database: 'emp'

// })
const db = mysql.createConnection(`mysql://avnadmin:AVNS_sdwvMqm_eFn5ewoJXi3@mysql-2b1fb47c-dhanushlib.a.aivencloud.com:21992/employee`);


// console.log(name,email,dob,dept,gender,phone)

app.get('/page1/:name/:email/:dob/:dept/:gender/:phone',(req,res)=>{
    let  name= req.params.name;
    let email = req.params.email;
    let dob = req.params.dob;
    let dept = req.params.dept;
    let gender = req.params.gender;
    let phone = req.params.phone;

  
    let mailOptions = {
        from:"0707dhanush123@gmail.com",
        to:email,
        subject:"APPLICATION SUBMITTED",
        text: `Respected ${name} your application has been submited

        Thank You`
    };
    transporter.sendMail(mailOptions,function(error,info){
        if(!error){
          console.log('邮件发送成功')  
          res.send("sucl")
          }else{
            console.error(error)}
      })
 
    let sql = 'INSERT INTO Nemp(ename,dob,dept,gender,phone,email,stats) VALUES(?,?,?,?,?,?,1)';
    db.query(sql,[name,dob,dept,gender,phone,email],(err,result)=>{
        if(!err){
            
        
            res.send("Data inserted successfully");
        }else{
            console.log(err);
        }
    })
   
  
    
})
app.get('/sendpg2/:address/:bg/:exp',(req,res)=>{
    let address = req.params.address;
    let blood = req.params.bg;
    let exp = req.params.bg

    let sql = 'UPDATE Nemp set address = ? , bloodgrp =? , exp=? WHERE stats = 1';
    db.query(sql,[address,blood,exp],(err,result)=>{
        if(!err){
            console.log("succeds")
        }
        else{
            console.error(err)
        }
    })
    let q = 'UPDATE nemp SET stats = 0';
    db.query(q,(error,results)=>{
        console.log("added 0")
    })

   



})

app.get('/view',(req,res)=>{
    let sql = "SELECT * FROM  Nemp";
    db.query(sql,(err,result)=>{
        if(!err){
            res.send(result);
            return(result);
        }
        else{
            console.error(err)
        }
    })
})
app.get('/sendmail/:value/:mail/:name',(req,res)=>{
    let value = req.params.value;
    let mail = req.params.mail;
    let name = req.params.name

    
    let mailOptions = {
        from:"0707dhanush123@gmail.com",
        to:mail,
        subject:"congtrats",
        text: `  HELLO ${name} congratulations, we have assigned  you the following task for ${value}
                                           Happy Coding`
    };

    transporter.sendMail(mailOptions,function(error,info){
        if(!error){
          console.log('邮件发送成功')  
          res.send("sucl")
          }else{
            console.error(error)}
      })
 
})












db.connect(()=>{
    console.log("database connectd")
})

app.listen('3000',()=>{
    console.log("server started at port 3000");
})