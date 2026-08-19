const express = require("express");
let pokemons = require("./src/db/mock-pokemon");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Sequelize = require("./src/db/sequelize");
const { initDb } = require("./src/db/sequelize");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev")).use(bodyParser.json());

Sequelize.initDb();
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

// les erreurs de status
app.use(({ res }) => {
  const msg = `impossible de trouver la ressource demandée ! essayer avec une autre URL.`;
  res.status(404).json({ msg });
});

app.listen(port, () =>
  console.log(`l'application est disponible sur http://localhost:${port}`),
);
