export const asyncHandler = (fn) => (req, res, next) => {
    Promise
    .resolve(fn(req, res, next))
    .catch(error=>{
        res.status(error.statusCode || 500).send({
            message:error.message || "There is an error"
        })
    })
}