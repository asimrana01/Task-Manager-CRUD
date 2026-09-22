function AsyncCatch(fn){
    return (req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}
module.exports=AsyncCatch
//ASYNC WRAPPER FOR THIS FILE