const mongoose=require('mongoose');
const moment = require('moment-timezone');

const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
        }
},
    {timestamps:true}
)
CategorySchema.virtual('localCreatedAt').get(function () {
    return moment(this.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
  });
module.exports=mongoose.model("Category",CategorySchema);