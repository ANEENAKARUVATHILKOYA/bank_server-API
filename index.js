//import dataservice file
const dataservice=require("./service/dataservice")

// import jason web token
const jwt=require('jsonwebtoken')


// import express

 const express=require("express")       //("express")is getting from package.json


//app creation using express 
  const app=express()


//to parse json data from req body ( to convert the data inside the express)
app.use(express.json())


//middleware
    const jwtMiddleware=(req,res,next)=>{
      try{
    const token=req.headers['access_token']
    //verify token
     const tokendata=jwt.verify(token,"tokenkey")
     console.log(tokendata);
    
     next()
   }
   catch{
       res.status(422).json({
           statuscode:422,
           status    :false,
           message   :" Error! please login"
      })
   }
  }
  



  //register - post
  app.post('/register',(req,res)=>{
      dataservice.register(req.body.username, req.body.acno, req.body.psw).then(result=>{
        res.status(result.statuscode).json(result)
      })
    //convert object into json and send as response and always change  status of response code
    //console.log(req.body); 
    //res.send("success")
  })


  //login
  app.get('/login',(req,res)=>{
    const result=dataservice.login(req.body.acno, req.body.psw) 
    //convert object into json and send as response and always change  status of response code
    res.status(result.statuscode).json(result)   
  })


  //deposit

  app.post('/deposit', jwtMiddleware, (req,res)=>{
    const result=dataservice.deposit(req.body.acnum, req.body.password, req.body.amount)
    //convert object into json and send as response and always change  status of response code
    res.status(result.statuscode).json(result)
  })

   
  //withdrawl
  app.post('/withdrawl', jwtMiddleware ,(req,res)=>{
    const result=dataservice.withdrawl(req.body.acnum, req.body.password, req.body.amount)
    //convert object into json and send as response and always change  status of response code
    res.status(result.statuscode).json(result)
  })

  //getTransfer
  app.get('/getTransaction',jwtMiddleware,(req,res)=>{
    const result=dataservice.getTransaction(req.body.acno) 
    //convert object into json and send as response and always change  status of response code
    res.status(result.statuscode).json(result)   
  })
    

  //delete



//request
  //app.get('/',(req,res)=>{
    //res.send('Get Method...........123')
  // })

 //request
 //app.post('/',(req,res)=>{
  //res.send('Post Method..........')
 //})  

 //request
 //app.put('/',(req,res)=>{
  //res.send('Put Method..........')
 //})  

 //request
// app.patch('/',(req,res)=>{
  //res.send('Patch Method..........')
 //})  
 
 //request
 //app.delete('/',(req,res)=>{
  //res.send('Delete Method..........')
 //})  


//set port number for run the app
app.listen(3000,()=>{console.log("server started at port number 3000");})  