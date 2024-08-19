import model from "./model.js";

export const createModule = (module) => model.create(module);
export const findAllModules = () => model.find().populate('course');
export const findModuleById = (moduleId) => model.findById(moduleId).populate('course');
export const updateModule = (moduleId, module) => model.updateOne({ _id: moduleId }, { $set: module });
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });