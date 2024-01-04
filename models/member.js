module.exports = function(sequelize, DataTypes){

    return sequelize.define('member',
    {
        member_id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowNull:false,
            comment:'사용자 고유번호'
        },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            comment:'이메일주소'
        },
        member_password:{
            type:DataTypes.STRING(500),
            allowNull:false,
            comment:'비밀번호'
        },
        name:{
            type:DataTypes.STRING(100),
            allowNull:false,
            comment:'이름'
        },
        profile_img_path:{
            type:DataTypes.STRING(300),
            allowNull:false,
            comment:'프로필이미지경로'
        },
        telephone:{
            type:DataTypes.STRING(20),
            allowNull:false,
            comment:'전화번호'
        },
        entry_type_code:{
            type:DataTypes.TINYINT,
            allowNull:false,
            comment:'가입유형코드 0: 1:'
        },
        use_state_code:{
            type:DataTypes.TINYINT,
            allowNull:false,
            comment:'가입상태코드 0:사용안함 1:사용함'
        },
        birth_date:{
            type:DataTypes.STRING(6),
            allowNull:false,
            comment:'생년월일'
        },
        reg_member_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            comment:'등록자 고유번호'
        },
        edit_member_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            comment:'수정자 고유번호'
        },
        reg_date:{
            type:DataTypes.DATE,
            allowNull:false,
            comment:'등록일시'
        },
        edit_date:{
            type:DataTypes.DATE,
            allowNull:false,
            comment:'수정일시'
        },
    },
    {
        sequelize,
        tableName: 'member', // 기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨
        timestamps: false,
        comment: '사용자정보',
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'member_id' }], // 여러개의 컬럼이 프라이머리키인경우(복합키){}추가하여 설정가능
            },
        ],

    });

}
