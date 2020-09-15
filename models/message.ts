import {
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
  } from "sequelize";
const sequelize = new Sequelize("mysql://test:test@localhost:3306/nodejsdatabase");

const Message = sequelize.define('Message', {
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING
    },
    message:{
        type: DataTypes.STRING
    }
}, {});

module.exports = Message;

