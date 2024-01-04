var express = require('express');
var router = express.Router();
var db = require('../models/index');
//관리자 계정정보의 목록

router.get('/list',async(req,res)=>{

    var admin = await db.Admin.findAll()
res.render('admin/list',{admin})
})

//
router.get('/create',async(req,res)=>{
    res.render('admin/create');
    
}),
//목록페이지 이동처리
router.post('/create',async(req,res)=>{
    var admin_member_id= req.body.admin_member_id
    var admin_id = req.body.admin_id
    var admin_password= req.body.admin_password
    var company_code= req.body.company_code
    var admin_name = req.body.admin_name
    var email= req.body.email
    var telephone= req.body.telephone
    var dept_name = req.body.dept_name
    
    var admin={
        admin_member_id,
        admin_id,
        admin_password,
        company_code,
        admin_name,
        email,
        telephone,
        dept_name,
        used_yn_code:1,
        reg_user_id:1,
        reg_date:Date.now()
    }
    await db.Admin.create(admin)
    res.redirect('/admin/list')
    
})

router.get('/delete',async(req,res)=>{
    var adminId = req.query.aid
    await db.Admin.destroy({where:{admin_member_id:adminId}
    })
    res.redirect('/admin/list')
})


router.get('/modify/:mid',async(req,res)=>{
    var adminIdx= req.params.mid
    let admin= await db.Admin.findOne({
        where:{admin_member_id:adminIdx}
    });
    res.render('admin/modify',{admin})
    
})
router.post('/modify/:mid',async(req,res)=>{
    var adminIdx= req.params.mid
    
    var admin_id = req.body.admin_id
    var admin_password= req.body.admin_password
    var company_code= req.body.company_code
    var admin_name = req.body.admin_name
    var email= req.body.email
    var telephone= req.body.telephone
    var dept_name = req.body.dept_name
    
    var updatedadmin ={
        admin_id,
        admin_password,
        company_code,
        admin_name,
        email,
        telephone,
        dept_name,
        used_yn_code:1,
        reg_user_id:1,
        reg_date:Date.now()
    }
    await db.Admin.update(updatedadmin,{
        where:{admin_member_id:adminIdx}
    })
    res.redirect('/admin/list')
})









module.exports = router;