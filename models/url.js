const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Creating a url schema 

const urlSchema = new mongoose.Schema({
original_url:{ type:String, required:true},
short_url:{type:Number }})

urlSchema.plugin(AutoIncrement, {inc_field: 'short_url'});

//Creating a class
const urlModel = mongoose.model("Url",urlSchema)

module.exports.urlModel=urlModel;


