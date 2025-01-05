module.exports = (sequelize, DataTypes, bcrypt) => {
  const User = sequelize.define(
    "User",
    {
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "First name must be only contain letters.",
          },
        },
      },

      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "Last name must be only contain letters.",
          },
        },
      },

      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.first_name} ${this.last_name}`;
        },
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
            "password",
            "created_at",
            "updated_at",
          ],
        },
      },
    }
  );

  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.user_email_verified;
    delete values.password;
    delete values.created_at;
    delete values.updated_at;

    return {
      id: values.id,
      fullName: values.fullName,
      email: values.email,
    };
  };

  console.log(User === sequelize.models.User, "user helloween");

  return User;
};
