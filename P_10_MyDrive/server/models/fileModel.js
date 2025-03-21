import { model, Schema } from 'mongoose'

const fileSchema = new Schema({
  extension : {
    type : String,
    required : true,
  },
  name : {
    type : String,
    required : true,
  },
  userId : {
    type : Schema.Types.ObjectId,
    required : true,
  },
  parentDirId : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : 'Directory', // mainly used for populate
  },
},{
  strict : 'throw',
  versionKey : false
})

const File = model('File', fileSchema);
export default File;
