var express = require('express');
var router = express.Router();
var moment = require('moment');
const Admin= require('../schemas/admin')

//관리자 계정정보의 목록

router.get('/list',async(req,res)=>{
    const admins = await Admin.find({})
    res.render('admin/list',{layout:"layout",admins,moment})
})


router.get('/create',async(req,res)=>{
    res.render('admin/create',{title:'create'});
    
}),
//목록페이지 이동처리
router.post('/create',async(req,res)=>{
    var admin_id = req.body.admin_id
    var admin_password= req.body.admin_password
    var company_code = req.body.company_code
    var admin_name = req.body.admin_name
    var email = req.body.email
    var telephone = req.body.telephone
    var dept_name = req.body.dept_name
    var used_yn_code = req.body.used_yn_code
    var reg_user_id = req.body.reg_user_id

    var admin={
        admin_id,
        admin_password,
        company_code,
        admin_name,
        email,
        telephone,
        dept_name,
        used_yn_code,
        reg_date:Date.now(),
        reg_user_id

        
    }
    const registedAdmin = await Admin.create(admin)
    res.redirect('/admin/list')
    
})
router.get('/delete',async(req,res)=>{
    var adminIdx = req.query.aid
    const result = await Admin.deleteOne({admin_member_id:adminIdx})
    res.redirect('/admin/list')
})

router.get('/modify/:mid',async(req,res)=>{
    var adminIdx =  req.params.mid
    var admin= await Admin.findOne({admin_member_id:adminIdx})
    // var admin = null
    // if (admins.length>0){
    //     admin= admins[0]
    // }
    res.render('admin/modify',{admin})
    
})


router.post('/modify/:mid',async(req,res)=>{
    var adminIdx =  req.params.mid
    
    var admin_id = req.body.admin_id
    var admin_password= req.body.admin_password
    var company_code = req.body.company_code
    var admin_name = req.body.admin_name
    var email = req.body.email
    var telephone = req.body.telephone
    var dept_name = req.body.dept_name
    var used_yn_code = req.body.used_yn_code
    var reg_user_id = req.body.reg_user_id
    var admin ={
        admin_id,
        admin_password,
        company_code,
        admin_name,
        email,
        telephone,
        dept_name,
        used_yn_code,
        edit_date:Date.now(),
        edit_user_id:1

        
    }
    const result = await Admin.updateOne({admin_member_id:adminIdx},admin)
    res.redirect('/admin/list')
})
module.exports = router;