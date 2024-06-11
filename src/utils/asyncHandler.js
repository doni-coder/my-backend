

const asyncHandler = (requestHandler)=>{
    return (req,res,next) =>{
        Promise.resolve(
            requestHandler(req,res,next)
        ).catch((err)=> next(err))
    }
}

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
export { asyncHandler };


// const handleAddition = (func)=>(a,b)=>{
//     return func(a,b)
// }

// const add=(x,y)=>{
//     return x+y
// }
// const result = handleAddition(add)

// console.log(result(5,5));