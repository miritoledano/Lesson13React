import mongoose from "mongoose";
import Joi from "joi";

const flowerSchema = mongoose.Schema({
    Name: String,
    color: String
})

const treesSchema = mongoose.Schema({
    name: String,
    hight: Number,
    kind: [String],
    startDate: { type: Date, default: Date.now() },
    flower: flowerSchema
})

export const treesModel = mongoose.model("trees", treesSchema);

export const treesValidator=(_tree)=>{
    const treeValidationSchema=Joi.object().keys({
        name:Joi.string().min(3).max(5).required()
    })
    return treeValidationSchema.validate(_tree)
}