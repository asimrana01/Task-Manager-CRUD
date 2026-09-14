const request=require("supertest")
const app=require('../src/app')
const mongoose=require("mongoose")
const connectDB=require("../src/config/db")
const userModel=require("../src/models/user.model")
beforeAll(async () => {
    await connectDB()
    
})
afterAll(async () => {
    await userModel.deleteOne({email:"asimrana01@gmail.com"})
    await mongoose.connection.close()
})
test("SignUp-create a new user",async () => {
    const res=await request(app).post("/api/auth/signup").send({
        email:"asimrana01@gmail.com",
        password:"abc12345"
    })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("message")
    
})
test("Signup-email already exists",async () => {
    const res= await request(app).post("/api/auth/signup").send({
        email:"asimrana01@gmail.com",
        password:"abc12345"
    })
    expect(res.status).toBe(409)
    expect(res.body).toHaveProperty("message")
})