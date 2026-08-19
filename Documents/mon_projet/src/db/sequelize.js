const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const pokemons = require("./mock-pokemon");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = async () => {
  await sequelize.sync({ force: true });
  for (const pokemon of pokemons) {
    try {
      await Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      });
      console.log(`✅ ${pokemon.name} créé`);
    } catch (err) {
      console.log(`❌ Échec sur ${pokemon.name} :`, err.message);
    }
  }
  bcrypt
    .hash("pikachu", 10)
    .then((hash) => {
      return User.create({
        username: "pikachu",
        password: hash,
      });
    })
    .then((user) => console.log(user.toJSON()));
  console.log("La base de donnée a bien été initialisée !");
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
