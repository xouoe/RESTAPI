import express from "express";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

let users = [
]
router.get('/',(req,res)=>{
    res.send(users);
})
router.post('/',(req,res)=>{
    const user = req.body;
    if(!user){
     res.status(400).send('name is required')
     return
    }
    //const user ={firstname:req.body.firstname,lastname:req.body.lastname, age:req.body.age,id:uuidv4()}
    const userwithid = {...user,id:uuidv4()}

    users.push(userwithid)

    res.send(`user ${user.firstname} already added database`)
})
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const founduser = users.find((user)=>user.id === id)
    if(!founduser) res.status(404).send('is not find id')
    res.send(founduser);
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    users= users.filter((user)=>{return user.id !== id});
    res.send(`user id ${id} already deleted database`);
})
router.patch('/:id',(req,res)=>{
    //const {id} = req.params;
    const id = req.params.id;
    const {firstname,lastname,age} = req.body;
    //const firstname = req.body.firstname;
    //const lastname = req.body.lastname;
    //const age = req.body.age;
    const user= users.find((user)=>{return user.id === id});
    
    if(firstname) user.firstname = firstname;
    if(lastname) user.lastname = lastname;
    if(age) user.age = age;
    res.send(`user id ${id} already updated database`);
})
export default router;