const mongoose = require('mongoose');

//DB Schema
var contactSchema = mongoose.Schema({                   //DB에 저장할 스키마 데이터/타입 지정
    name:{type:String, required:true, unique:true},     // required: 필수값 / unique: 중복안됨
    email:{type:String},
    phone:{type:String}
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;