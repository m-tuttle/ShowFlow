const axios = require("axios");
const router = require("express").Router();

router.get("/shows/:showname", (req, res) => {
  axios
    .get("http://api.tvmaze.com/search/shows?q=", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));

    console.log(res);
});

module.exports = router;