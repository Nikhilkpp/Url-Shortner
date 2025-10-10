import { createClient } from "redis";
let client;

const connectRedis=async()=>{

   try {

      client = createClient({
         url:process.env.REDIS_URI,
        //  socket:{
        //      tls: true,
        //      rejectUnauthorized:false,
        //  }
     });
     
     
     client.on('connect',()=>console.log('connected with redis'));
     client.on('error', (err)=>console.log('Redis error',err));
     
     
     await client.connect();

   } catch (error) {
    console.log('Error occured at redis connection phase',error);
   }


}

export {
    connectRedis,
    client,
} 

