const z=require("zod")
const SignUpSchema=z.object({
    email:z.string().email({error:"Please Provide a valid email address"}),
    password:z.string().min(8,{error:"Password must be between 8 and 24 characters"}).max(24,{error:"Password must be between 8 and 24 characters"})
})
module.exports=SignUpSchema