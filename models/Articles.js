/**
 *  Model Articles
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const Articles = (sequelize, DataTypes) => {
  const Articles = sequelize.define(
    "Articles", // name of Model
    {
      // fields
      title: { type: DataTypes.STRING, unique: "theTitle", notEmpty: true },
      photo: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT, is: ["^[a-z]{10,}$", "i"] },
      active: { type: DataTypes.INTEGER },
      datePublication: { type: DataTypes.DATE, isDate: true },
      note: { type: DataTypes.INTEGER, isInt: true, min: 1, max: 5 }
    },
    {
      timestamps: false,
      getterMethods: {
        dateFr() {
          function pad(s) {
            return s < 10 ? "0" + s : s;
          }
          var d = new Date(this.datePublication);
          return [
            pad(d.getDate()),
            pad(d.getMonth() + 1),
            d.getFullYear()
          ].join("/");
        }
      }
    }
  );

  return Articles;
};

module.exports = Articles;
