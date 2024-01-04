// 게시글 정보관리 라우팅 기능 제공

var express = require('express');
var router = express.Router();

// 날짜 변환 패키지 참조 
var moment = require('moment');

// ORM DB객체 참조 
var db = require('../models/index');

//게시글 목폭 페이지 호출
//http://localhost:3001/article/list
router.get('/list',async(req,res,next)=>{

    // article 테이블의 모든 게시글 목록을 조회해옴 
    let articles = await db.Article.findAll();

    // 조회결과 모든 게시글 데이터를 뷰에 전달
    res.render('article/list',{ articles,moment });
});

//게시글 목폭 정보조회 페이지 호출
//http://localhost:3001/article/list
router.post('/list',async(req,res,next)=>{

    let articles = [];

    res.render('article/list',{ articles });
});


//신규 목록 페이지 호출
//http://localhost:3001/article/create
router.get('/create',async(req,res,next)=>{
    res.render('article/create');
});

//신규 목록 작성 완료 후 목폭 페이지 이동처리
//http://localhost:3001/article/create
router.post('/create',async(req,res,next)=>{

    // 작성 목록 추출 
    // view 파일에서 추출 데이터 확인 
    let title = req.body.title;
    let contents = req.body.contents;
    let articleTypeCode = req.body.articleTypeCode;
    let isDisplayCode = req.body.isDisplayCode;


    // DB 테이블에 저장할 json 단일데이터 구조 정의
    // 속성명은 데이터 모델(models/article.js)의 속성명과 동일 
    let article ={
        board_type_code:2,
        title,
        article_type_code:articleTypeCode,
        contents,
        view_count:0,
        ip_address:"111,111,111,111",
        is_display_code:isDisplayCode,
        reg_date:Date.now(),
        reg_member_id:0,
        edit_date:Date.now(),
        edit_member_id:0
    }

    // 신규 게시글 정보가 등록 
    // create()메소드는 등록된 db의 데이터를 반환
    var registedArticle = await db.Article.create(article);


    // 작성 환료 후 목록 페이지 이동
     res.redirect('/article/list');
});


// 목록 삭제 후 목록 페이지 이동 처리
router.get('/delete',async(req,res,next)=>{

    // 삭제 고유번호 추출
    let articleId = req.query.aid;

    // DB 삭제 처리
    let deletedCnt = await db.Article.destroy({
        where:{article_id:articleId}
    });

    // 삭제 완료 후 목록 페이지로 이동 
    res.redirect('/article/list');
});




//수정 목록 페이지 호출
//http://localhost:3001/article/modify/1
router.get('/modify/:aid',async(req,res,next)=>{

    // 게시글 고유번호 추출
    let articleId = req.params.aid;

    // 게시글 고유번호를 기준으로 단일 게시글 정보 조회
    let article = await db.Article.findOne({
        where:{article_id : articleId }
    });

    // db데이터 받아서 뷰에 전달 
    res.render('article/modify',{ article, moment });
});


// 수정 목록 작성 완료 후 목록 페이지 이동 처리
//http://localhost:3001/article/modify/1
router.post('/modify/:aid',async(req,res,next)=>{

    // 게시글 고유번호 추출
    let articleId = req.params.aid; 

    // 수정할 데이터 변수 할당 
    let title = req.body.title;
    let contents = req.body.contents;
    let articleTypeCode = req.body.articleTypeCode;
    let isDisplayCode = req.body.isDisplayCode;

    // 수정하고자 하는 단일 데이터 정의
    let updateArticle = {
        title,
        article_type_code:articleTypeCode,
        contents,
        ip_address:"222.222.222.222",
        is_display_code:isDisplayCode,
        edit_date:Date.now(),
        edit_member_id:0,
    }

    //단일 게시글 정보 수정처리 ORM
    let updatedCnt = await db.Article.update(updateArticle,{
        where: {article_id:articleId}
    });


    //수정 완료 후 목록 페이지 이동
    res.redirect('/article/list');
});




module.exports = router;