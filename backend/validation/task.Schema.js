const z= require("zod")
const postTaskSchema=z.object({
    title:z.string().min(3),
    description:z.string().optional()

})
const updateTaskSchema=postTaskSchema.partial()
module.exports={postTaskSchema,updateTaskSchema}