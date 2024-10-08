//import dataservice file
const dataservice=require("./service/dataservice")

//import cors
const cors=require("cors")


// import jason web token
const jwt=require('jsonwebtoken')


// import express

 const express=require("express")       //("express")is getting from package.json


//app creation using express 
  const app=express()

  //connection string for front-end integration
  app.use(cors({orgin:'http://localhost:4200'}))



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
  app.post('/login',(req,res)=>{
    dataservice.login(req.body.acno, req.body.psw).then(result=>{
      res.status(result.statuscode).json(result) 
    })
    //convert object into json and send as response and always change  status of response code
    //res.status(result.statuscode).json(result)   
   })



  //deposit
  app.post('/deposit', jwtMiddleware, (req,res)=>{
    dataservice.deposit(req.body.acnum, req.body.password, req.body.amount).then(result=>{
      res.status(result.statuscode).json(result)
    })
    //convert object into json and send as response and always change  status of response code
    //res.status(result.statuscode).json(result)
  })

   
  //withdrawl
  app.post('/withdraw', jwtMiddleware ,(req,res)=>{
    dataservice.withdrawl(req.body.acnum, req.body.password, req.body.amount).then(result=>{
      res.status(result.statuscode).json(result)
    })
    //convert object into json and send as response and always change  status of response code
  })

  //getTransfer
  app.post('/transaction',jwtMiddleware,(req,res)=>{
    dataservice.getTransaction(req.body.acno).then(result=>{
      res.status(result.statuscode).json(result)   
    }) 
    //convert object into json and send as response and always change  status of response code 
  })
    

  //delete
  app.delete('/delete/:acno',jwtMiddleware,(req,res)=>{
            dataservice.deleteAcc(req.params.acno).then(result=>{
              res.status(result.statuscode).json(result)
            })
  })
  

  



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