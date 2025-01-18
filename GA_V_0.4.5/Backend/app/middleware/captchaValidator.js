const axios = require("axios");

const validateCaptcha = async (req, res, next) => {
  const { recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return res.status(400).send({ message: "Captcha token est requis." });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      }
    );

    if (!response.data.success) {
      return res.status(403).send({ message: "Captcha invalide." });
    }

    next();
  } catch (err) {
    console.error("Erreur de validation du Captcha :", err.message);
    console.log("Réponse de reCAPTCHA :", response.data);
    res.status(500).send({ message: "Erreur serveur pendant la validation du Captcha." });
  }
};

module.exports = { validateCaptcha };
