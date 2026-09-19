const z=require("zod")
const forgotPassword=z.object({
    email:z.string().email({error:"Please Provide a valid email address"})})
    module.exports=forgotPassword