import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"0707dhanush123@gmail.com",
        pass:"smwipanrvizlkuub"
    }
})

let mailOptions = {
    from:"0707dhanush123@gmail.com",
    to:"adhanush.eee2021@citchennai.net",
    subject:"nodemailer",
    Text: "hello"
};



 export const Sendmail=  transporter.sendMail(mailOptions,function(error,info){
    if(!error){
      console.log('邮件发送成功')  
      res.send("sucl")
      }else{
        console.error(error)}
  })


  

     