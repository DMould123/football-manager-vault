const BestXI = require('../models/bestXI');
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const saveBestXI = async (req, res) => {
  try {
    const { formation, players } = req.body;
    const userId = req.userId;

    if (!formation || !players) {
      return res.status(400).json({ error: 'Formation and players are required' });
    }

    let bestXI = await BestXI.findOne({ user: userId });

    if (bestXI) {
      bestXI.formation = formation;
      // Create a new object with only the player data
      const cleanPlayers = Object.fromEntries(
        Object.entries(players).filter(([key]) => !key.startsWith('$'))
      );
      bestXI.players = cleanPlayers;
    } else {
      bestXI = new BestXI({
        user: userId,
        formation,
        players: Object.fromEntries(
          Object.entries(players).filter(([key]) => !key.startsWith('$'))
        )
      });
    }

    await bestXI.save();
    res.json({ message: 'Best XI saved successfully', bestXI });
  } catch (error) {
    console.error('Error saving Best XI:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

const getBestXI = async (req, res) => {
  try {
    const userId = req.userId;
    const bestXI = await BestXI.findOne({ user: userId });

    if (!bestXI) {
      return res.json({ formation: '4-4-2', players: {} });
    }

    res.json(bestXI);
  } catch (error) {
    console.error('Error fetching Best XI:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  authenticateUser,
  saveBestXI,
  getBestXI
};
