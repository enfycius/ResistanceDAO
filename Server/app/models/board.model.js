module.exports = (sequelize, Sequelize) => {
  const Board = sequelize.define("boards", {
    title: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    content: {
      type: Sequelize.STRING
    },
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    id: false
  });

  return Board;
};
