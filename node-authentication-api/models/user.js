module.exports = (sequelize, DataTypes, bcrypt) => {
  const User = sequelize.define(
    "User",
    {
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      user_email_verified: {
        type: DataTypes.BOOLEAN,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        set(value) {
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        },
      },
    },
    {
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",

      defaultScope: {
        attributes: {
          exclude: [
            "user_email_verified",
            "created_at",
            "updated_at",
          ],
        },
      },
      instanceMethods: {
        toJSON() {
          const values = { ...this.get() };
          delete values.user_email_verified;
          delete values.created_at;
          delete values.updated_at;
          return values;
        },
      },
    }
  );

  console.log(User === sequelize.models.User, "user helloween"); // true

  return User;
};
