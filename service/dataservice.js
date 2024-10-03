
const jwt=require('jsonwebtoken')
const db=require('./db')

//userDetails={
    //1000:{acno:1000,username:"anu",password:"123a",balance:0,transaction:[]},
    //1001:{acno:1001,username:"dev",password:"123d",balance:0,transaction:[]},
    //1002:{acno:1002,username:"hima",password:"123h",balance:0,transaction:[]},
    //1003:{acno:1003,username:"rudhru",password:"123r",balance:0,transaction:[]}
   //}
 

 //register
 register=(username,acno,psw)=>{
    //if(acno in userDetails){

 //check the person present in databse
    return  db.User.findOne({ acno }).then(user=>{
   if (user) {
     return {
       status: false,
       message: 'user already present',
       statuscode: 401
     }
   }
   else {
     //create a new user object in database
     const newuser= new db.User({acno, username, password: psw, balance: 0, transaction: [] })
     //save in db
     newuser.save()

     return {
       status: true,
       message: 'successfully registerd',
       statuscode: 200
     }
   }
  })
}
    
  

//login
login=(acno,psw)=>{
  //if(acno in  userDetails){
    return db.User.findOne({acno, password:psw}).then(user=>{
      if(user){
        currentUser=user.username

        currentAccno=acno
  
        //generate token for user varification
         const token=jwt.sign({currentAccno},"tokenkey")
  
         return {
          status    : true,
          message   : 'successfully login',
          statuscode:200,
          currentUser,
          currentAccno,
          token
        }
      }
      else{
        return {
          status    : false,
          message   : 'Error! incorrect accountnumber or password' ,
          statuscode:401
         }
      }
    })
  }  
         



//deposit
deposit=(acnum,password,amount)=>{
//convert string amount to number
var amnt=parseInt(amount)

//if(acnum in userDetails){
  return db.User.findOne({acno:acnum, password,}).then(user=>{
    if(user){
        user.balance+=amnt
        user.transaction.push({Type:"CREDIT",amount:amnt})

        user.save()
        return{
          status    : true,
          message   :`${amnt}is credited to your account and the available balance ${user.balance}`,
          statuscode:200
        }
      }
    else{
      return {
        status    : false,
        message   : "Error! incorrect accountnumber password",
        statuscode:401
      }
    }
  })
}
  


//withdrawl
withdrawl=(acnum, password, amount)=>{ 
//convert string amount to number
var amnt=parseInt(amount)

 return db.User.findOne({acno:acnum, password}).then(user=>{
        if(user){
          if(amnt <= user.balance){
             user.balance-=amnt
             user.transaction.push({Type:"DEBIT",amount:amnt})
             user.save()
             
             return{
              status    : true,
              message   :`${amnt}is debited to your account and the available balance ${user.balance}`,
              statuscode:200
             }  
          }
          else{
            return{
              status    : false,
              message   : "Error! insufficient balance",
              statuscode:401
            }
          }
        }  
      else{
        return{
          status    : false,
          message   : "Error! incorrect accountnumber password",
          statuscode:401 
        }
      }
    })
  }



//transaction
getTransaction=(acno)=>{
  return db.User.findOne({acno}).then(user=>{

  return{
     status    : true,
    statuscode :200,
    transaction:user.transaction
     }

   })
 }



 deleteAcc=(acno)=>{
     return db.User.deleteOne({acno}).then(user=>{
            if(user){
              return{
                status    :true,
                statuscode:200,
                message   :"account deleted"
              }
            }  
            
      })
 }
  


//if we want to import the functions to index.js file then we must export all functions from this file 
 module.exports={
    register,
    login,
    deposit,
    withdrawl,
    getTransaction,
    deleteAcc
  }