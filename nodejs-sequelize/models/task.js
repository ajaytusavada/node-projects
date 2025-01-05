module.exports = (sequelize, DataTypes, Model, Sequelize) => {
  class Task extends Model {}
  Task.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE", //optional
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("complete", "pending", "queued"),
        defaultValue: "queued",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  console.log(Task === sequelize.models.Task, "task helloween");

  return Task;
};
