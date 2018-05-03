const Todo = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo", // nom du model: db.Todo
    {
      nom: DataTypes.STRING,
      description: DataTypes.TEXT,
      enabled: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }, // 1 objet: mes colonnes
    {
      // 2 objet: options ou metadata
      tableName: "todo"
    }
  );

  return Todo;
};

module.exports = Todo;
