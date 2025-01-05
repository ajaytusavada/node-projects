"use strict";
module.exports = (sequelize, DataTypes , Model) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init(
    {
      user_id: DataTypes.INTEGER,
      hire_date: DataTypes.DATE,
      salary: DataTypes.INTEGER,
      position: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Employee",
      tableName: 'employees',
    }
  );
  return Employee;
};
