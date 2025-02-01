import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema, SignInSchema,CreateRoomSchema} from "@repo/common/types"
import { prismaClient } from "@repo/db/client";
const app = express();
app.use(express.json())


app.post("/signup",async(req,res)=>{
    const parsedData= CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        console.log(parsedData.error)
        res.json({
            message:"incorrect inputs"
        })
        return
    }
try {
    const user = await prismaClient.user.create ({
        
        data:{
            email:parsedData.data?.username,
            password:parsedData.data.password,
            name: parsedData.data.name
        }
   })
   res.json({
    userId: user.id
})
} catch (error) {
    res.status(411).json({
        message:"user already exists with this username"
    })
}
  

    //db call

   

})
app.post("/signin",async(req,res)=>{
    const parsedData= SignInSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"incorrect inputs"
        })
        return
    }


    const user = await prismaClient.user.findFirst({
        where:{
            email:parsedData.data.username,
            password:parsedData.data.password
            
        }
    })

    if(!user){
        res.status(403).json({
            message:"user not authorized"
        }) 
        return;
    }

    const token= jwt.sign({
        userId:user?.id
    },JWT_SECRET)

    res.json(token)
    
})
app.post("/room",middleware,async (req,res)=>{

    const parsedData= CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"incorrect inputs"
        })
        return
    }
    //db call
    

    //@ts-ignore
    const userId= req.userId


    console.log("Before DB Call");
await prismaClient.room.create({
    data: {
        slug: parsedData.data.name,
        adminId: userId,
    },
});
console.log("After DB Call");
    res.json({
        roomId:123
    })

    
    
    
})
app.listen(3001)