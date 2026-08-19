const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const msg = `le pokemon demandé n'exite pas. réessayer avec un autre identifiant`;
          return res.status(404).json({ msg });
        }
        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const msg = `la liste des pokemons n'a pas pu être recupéré. ressayer dans quelques instants.`;
        res.status(500).json({ msg, data: error });
      });
  });
};
