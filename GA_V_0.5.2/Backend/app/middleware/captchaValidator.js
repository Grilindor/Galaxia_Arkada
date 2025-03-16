const axios = require("axios");

const captchaValidator = async (req, res, next) => {
  const { captchaToken } = req.body;
  if (!captchaToken) {
    return res.status(400).json({ message: "CAPTCHA requis." });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        },
      }
    );

    if (process.env.NODE_ENV === "test") {
      return next(); // Bypass CAPTCHA pour les tests
    }

    if (response.data.success) {
      next(); // CAPTCHA valide, passe au middleware suivant
    } else {
      res.status(400).json({ message: "Captcha invalide." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur de validation CAPTCHA." });
  }
};

module.exports = captchaValidator;
