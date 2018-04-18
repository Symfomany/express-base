/**
 *  Model Categories
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const Categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories", // name of Model
    {
      // fields
      titre: { type: DataTypes.STRING },
      description: {
        type: DataTypes.TEXT
      }
    },
    {
      timestamps: false,
      tableName: "categories"
    }
  );

  return Categories;
};

module.exports = Categories;
