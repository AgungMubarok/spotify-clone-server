const express = require("express");
const spotifyWebAPi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new spotifyWebAPi({
    redirectUri: "http://localhost:3000",
    clientId: "24ef595ffeb94dc3947acdba4e428e42",
    clientSecret: "1eb95f791bb546028b275b51ddba1b49"
  })

  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  }).catch((err) => {
    res.sendStatus(400)
  })
})

app.listen(3001)