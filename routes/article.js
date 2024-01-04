var express = require('express');
var router = express.Router();
var moment = require('moment');
const Article = require('../schemas/article')



router.get('/list',async(req,res)=>{
    const articles = await Article.find({})
    res.render('article/list',{layout:"layout",articles,moment})
})

router.get('/create',async(req,res)=>{
    res.render('article/create')
}),


router.post('/create',async(req,res)=>{
var board_type_code= req.body.board_type_code
var title = req.body.title
var article_type_code=req.body.article_type_code
var contents = req.body.contents
var view_count= req.body.view_count
var ip_adress = req.body.ip_address
var is_display_code= req.body.is_display_code

var article ={
    board_type_code,
    title,
    article_type_code,
    contents,
    view_count,
    ip_adress,
    reg_member_id:1,
    reg_date:Date.now()
}
    
const registedarticle = await Article.create(article)
    res.redirect('/article/create')
})

router.get('/delete',async(req,res)=>{
    var articleIdx = req.query.aid
    const result = await Article.deleteOne({article_id:articleIdx})
    res.redirect('/article/list')
})

router.get('/modify/:mid',async(req,res)=>{
    var articleIdx = req.params.mid
    var articles = await Article.findOne({article_id:articleIdx})
    res.render('article/modify',{articles})
})


router.post('/modify/:mid',async(req,res)=>{
    var articleIdx = req.params.mid
    
    var board_type_code= req.body.board_type_code
    var title = req.body.title
    var article_type_code=req.body.article_type_code
    var contents = req.body.contents
    var view_count= req.body.view_count
    var ip_adress = req.body.ip_address
    var is_display_code= req.body.is_display_code
    
    var article ={
        board_type_code,
        title,
        article_type_code,
        contents,
        view_count,
        ip_adress,
        is_display_code,
        edit_member_id:1,
        edit_date:Date.now()
    }
    const result = await Article.updateOne({article_id:articleIdx},article)
    res.redirect('/article/list')
})






module.exports = router;