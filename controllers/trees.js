import mongoose from "mongoose";
import { treesModel } from "../models/trees.js"

export const getAllTrees = async (req, res) => {
    try {

        let getAllTrees = await treesModel.find({});
        res.json(getAllTrees)

    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get trees" })
    }
}



export const getTreeById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let tree = await treesModel.findById(id);
        if (!tree)
            return res.status(404).json({ type: "no id", message: "no tree with such id" })
        return res.json(tree)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get trees" })
    }

}


export const deleteTree = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let tree = await treesModel.findByIdAndDelete(id);
        if (!tree)
            return res.status(404).json({ type: "no tree to delete", message: "no tree with such id to delete" })

        return res.json(tree)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get trees" })
    }

}



export const addTree = async (req, res) => {
    let { name, hight, startDate, flower, kind } = req.body;
  
    if (!name || !hight) {
      return res.status(400).json({
        type: "missing params",
        message: "חסרים פרטים בגוף הבקשה: שם או גובה",
      });
    }
  
    try {
      let sameTree = await treesModel.findOne({ name: name });
      if (sameTree) {
        return res.status(409).json({
          type: "same details",
          message: "כבר קיים עץ באותו שם",
        });
      }
  
      let newTree = new treesModel({
        name,
        hight,
        startDate,
        flower,
        kind,
      });
  
      await newTree.save();
  
      return res.json(newTree);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        type: "server error",
        message: "שגיאה בתהליך הוספת העץ",
      });
    }
  };
  export const updateById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let tree = await treesModel.findByIdAndUpdate(id,req.body,{new:true});
        if (!tree)
            return res.status(404).json({ type: "no id", message: "no tree with such id" })
        return res.json(tree)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get trees" })
    }

}
