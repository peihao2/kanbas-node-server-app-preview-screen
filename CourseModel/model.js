import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("CouseModel", schema);
export default model;