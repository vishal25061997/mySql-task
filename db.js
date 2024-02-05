const {Sequelize, DataTypes} = require("sequelize")

const sequelize= new Sequelize("holitech","root", "Yadav@123",{
    host: "localhost",
    dialect: "mysql"
})

const User = sequelize.define("User",{
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
})

module.exports= {User,sequelize};