const app=require("../src/app")
const mongoose=require("mongoose")
const request=require("supertest")
const connectDB=require("../src/config/db")
const taskModel=require("../src/models/task.model")
const userModel = require("../src/models/user.model")

let token
let taskId
beforeAll(async () => {
    await connectDB()
    await request(app).post("/api/auth/signup").send({
        email:"task@login.com",
        password:"CorrectPassword"
    })
    const loginRes=await request(app).post("/api/auth/login").send({
        email:"task@login.com",
        password:"CorrectPassword"
    })
    token=loginRes.body.token

})
afterAll(async () => {
     const user = await userModel.findOne({ email: "task@login.com" })
    await taskModel.deleteOne({ owner: user._id })
    await userModel.deleteOne({ email: "task@login.com" })
    await mongoose.connection.close()
    
})
it("create a new task",async () => {
    
    const res=await request(app).post("/tasks").set("Authorization", `Bearer ${token}` ).send({
        title:"test title",
        description:"test description",
        status:true
    })
    taskId=res.body.task._id
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("message")
    
})
test("get All Posts", async () => {
    const res=await request(app).get("/tasks").set("Authorization",`Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("message")
    expect(res.body).toHaveProperty("task")
    
})
test("get Single Task",async () => {
    const res=await request(app).get(`/tasks/${taskId}`).set("Authorization",`Bearer ${token}`)
     expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("message")
    expect(res.body).toHaveProperty("task")
    
})
test("update Task",async () => {
    const res=await request(app).patch(`/tasks/${taskId}`).set("Authorization",`Bearer ${token}`).send({
        title:"updated title",
        description:"updated description",
        status:false
    })
        expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("message")
    
})
test("update task - not found", async () => {
    const res = await request(app)
        .patch("/tasks/64f000000000000000000000")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "updated title" })
    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty("message")
})

test("delete Single task",async () => {
    const res=await request(app).delete(`/tasks/${taskId}`).set("Authorization",`Bearer ${token}`)
     expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("message")
})

test("delete task-not found",async () => {
    const res=await request(app).delete(`/tasks/${taskId}`).set("Authorization",`Bearer ${token}`)
     expect(res.status).toBe(404)
    expect(res.body).toHaveProperty("message")
})