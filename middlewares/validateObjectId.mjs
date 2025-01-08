import mongoose from "mongoose";
function validateObjectId(req, res,next){
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({message: 'Invalid ObjectId'})
  }
  next()
}

export default validateObjectId