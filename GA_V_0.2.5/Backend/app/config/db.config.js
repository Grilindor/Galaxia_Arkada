module.exports = {
  HOST: "localhost",
  USER: "admin_marc",
  PASSWORD: "liberatus0987", // tu la changer des postgres??
  DB: "galaxia_arcadia_v0_2_5",// tu la changer des postgres??
  dialect: "postgres",
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
