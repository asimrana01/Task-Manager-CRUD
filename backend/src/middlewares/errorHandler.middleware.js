function errorHandler(err,req,res,next){
    if(err.isOperational){
        return res.status(err.statusCode).json({
            message:err.message,
            status:err.status
        })
    }
    console.error(err)
    return res.status(500).json({
        message:"Internal Server Error",
        status:"error"
    })

}