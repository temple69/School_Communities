
const mongoose= require('mongoose')
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const CommunitySchema= new Schema({
    university_id:{type:String},
    Communities:[{
        community_name: String,
        community_description: String,
        community_category: String,
        university: String
      }]
    

})

module.exports=mongoose.models.Communities || mongoose.model('Communities', CommunitySchema)