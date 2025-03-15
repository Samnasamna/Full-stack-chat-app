import mongoose from "mongoose"

export const connectDb = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);
        console.log("Database connected successfully..! ", connect.connection.host, connect.connection.name)

    }catch(error){
        console.log("Database connection failed!")
    }
}