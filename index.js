import express from "express";
import fetch from "node-fetch";

const app = express();

const FACEIT_API_KEY = process.env.FACEIT_API_KEY;
const FACEIT_NICK = "8benedictus8";

app.get("/stats", async (req, res) => {
  try {
    const response = await fetch(
      `https://open.faceit.com/data/v4/players?nickname=${FACEIT_NICK}`,
      {
        headers: {
          Authorization: `Bearer ${FACEIT_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    const cs = data.games.cs2;
    const elo = cs.faceit_elo;
    const level = cs.skill_level;
    const matches = cs.matches;
const wins = cs.wins;

const winrate =
  matches && matches > 0
    ? ((wins / matches) * 100).toFixed(1)
    : "N/A";


    res.send(
      `FACEIT: lvl ${level} | ELO ${elo} | WR ${winrate}%`
    );
  } catch (err) {
    res.send("FACEIT временно недоступен");
  }
});

app.listen(3000);
