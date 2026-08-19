const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "le nom est déja pris.",
        },
        validate: {
          notEmpty: {
            msg: "le nom ne peut pas être vide",
          },
          notNull: { msg: "le nom est une propriété requise" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie",
          },
          notNull: { msg: "les points de vie sont une propiété requise" },
          max: {
            args: [999],
            msg: "les points de vie doivent être inferieur ou égal à 999 ",
          },
          min: {
            args: [0],
            msg: "les points de vie doivent être superieur à 0 ",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les cp",
          },
          notNull: { msg: "les cp sont une propiété requise" },
          max: {
            args: [99],
            msg: "les cp doivent être inferieur ou égal à 99 ",
          },
          min: {
            args: [0],
            msg: "les cp doivent être superieur à 0 ",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Utilisez uniquement des URL pour l'image",
          },
          notNull: { msg: "l'image est une propriété requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit au mois avoir un type");
            }
            if (value.split(",").length > 3) {
              throw new Error(
                "Un pokemon ne peux pas avoir plus de deux types",
              );
            }
            value.split(",").forEach((types) => {
              if (!validTypes.includes(types)) {
                throw new Error(
                  `le type d'un pokemon doit appartenir à la liste : ${validTypes}`,
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    },
  );
};
