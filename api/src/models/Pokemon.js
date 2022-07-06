const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const defaultImg = 'https://w7.pngwing.com/pngs/248/960/png-transparent-pikachu-pokemon-go-silhouette-drawing-pikachu-dog-like-mammal-fictional-character-black-thumbnail.png'
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    hp: {
      type: DataTypes.INTEGER,
    },

    attack: {
      type: DataTypes.INTEGER,
    },

    defense: {
      type: DataTypes.INTEGER,
    },

    speed: {
      type: DataTypes.INTEGER,
    },

    height: {
      type: DataTypes.FLOAT,
    },

    weight: {
      type: DataTypes.INTEGER,
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: defaultImg
    },
    createdAtDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
    { timestamps: false }
  );
};

