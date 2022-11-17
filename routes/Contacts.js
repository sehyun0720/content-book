const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

//Contacts - Index
router.get('/', function(req, res){
    Contact.find({}, function(err, contacts){                   // [모델].find({검색조건}, callback 함수)    *조건 ex) {lastName:"Kim"}
        if(err) return res.json(err);
        res.render('contacts/index', {contacts:contacts});
    });
});

//Contacts - New
router.get('/new', function(req, res){
    res.render('contacts/new');
});

//Contacts - Create
router.post('/', function(req, res){
    Contact.create(req.body, function(err, contact){        //function(err, contact) > 첫번째로 error, 두번째로 파라미터 데이터
        if(err) return res.json(err);
        res.redirect('/contacts');                          // 에러가 없으면 /contacts로 리다이렉트
    })
})

//Contacts - show
router.get('/:id', function(req, res){
    Contact.findOne({_id:req.params.id}, function(err, contact){
        if(err) return res.json(err);
        res.render('contacts/show', {contact:contact});
    });
});

//Contacts - edit
router.get('/:id/edit', function(req, res){
    Contact.findOne({_id:req.params.id}, function(err, contact){
        if(err) return res.json(err);
        res.render('contacts/edit', {contact:contact});
    });
});

//Contacts - update
router.put('/:id', function(req, res){
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
        if(err) return res.json(err);
        res.redirect('/contacts/' + req.params.id);
    });
});

//Contacts - destroy
router.delete('/:id', function(req, res){
    Contact.deleteOne({_id:req.params.id}, function(err){
        if(err) return res.json(err);
        res.redirect('/contacts');
    });
});

module.exports = router;