const rateLimit = require('express-rate-limit');

// un limiteur pour la route de connexion
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // 3 tentatives max par fenêtre
  message: {
    status: 429,
    message: "Trop de tentatives de connexion. Réessayez dans 15 minutes.",
  },
  standardHeaders: true, // Retourne les infos de limite dans les headers
  legacyHeaders: false, // Désactive les anciens headers `X-RateLimit-*`
});

module.exports = { loginLimiter };
