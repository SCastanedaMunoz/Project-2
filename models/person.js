module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define("Person", {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        len: [1],
      },
    },
    age: {
      type: DataTypes.STRING,
      validate: {
        len: [1],
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });
  return Person;
};
