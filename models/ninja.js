const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create geo location scema 
const Geoscema = new Schema({
    type :{
        type : String ,
        default:'Point'
    },
    coordinates: {
        type : [Number],
        index : '2dsphere'
    }
})


// CREATING sceema for ninja 
const NinjaScema = new Schema ({
    name :{
        type :String ,
        required : [true ,'name feild is required']
    },
    rank :  {
        type :String 
    },
    available :{
        type :Boolean,
        default :false 
    },
    // ADD IN geo location 
    geometry :  Geoscema
});

const Ninja = mongoose.model('ninja',NinjaScema);
module.exports = Ninja;