const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
      if (pokemon === null) {
        const msg = `le pokemon demandé n'exite pas. réessayer avec un autre identifiant`;
        return res.status(404).json({ msg });
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id },
      })
        .then((_) => {
          const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`;
          res.json({ message, data: pokemonDeleted });
        })
        .catch((error) => {
          const msg = `la liste des pokemons n'a pas pu être supprimé. ressayer dans quelques instants.`;
          res.status(500).json({ msg, data: error });
        });
    });
  });
};
