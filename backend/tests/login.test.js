const request=require("supertest")
const userModel=require("../src/models/user.model")
const connectDB=require('../src/config/db')
const mongoose=require("mongoose")
const app=require("../src/app")

beforeAll(async () => {
    await connectDB()
     await request(app).post("/api/auth/signup").send({
        email: "login@test.com",
        password: "CorrectLoginPass"
    })
})
afterAll(async () => {
    await userModel.deleteOne({email:"login@test.com"})
    await mongoose.connection.close()
    
})
test("login-Incorrect Password",async () => {
    const res=await request(app).post("/api/auth/login").send({
        email:"login@test.com",
        password:"IncorrectLoginPass"
    })
    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty("message")
    
})
test("login-Successfull",async () => {
    const res=await request(app).post("/api/auth/login").send({
        email:"login@test.com",
        password:"CorrectLoginPass"
    })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("token")
    expect(res.body).toHaveProperty("message")
    
})
test("login-User does not exists", async () => {
    const res=await request(app).post("/api/auth/login").send({
        email:"noUser@test.com",
        password:"inCorrectPass"
    })
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty("message")
})