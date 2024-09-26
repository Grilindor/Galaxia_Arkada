module.exports = {
  HOST: "localhost",
  USER: "admin_marc",
  PASSWORD: "libratus130",
  DB: "galaxia_arcadia_v0_1_5",
  dialect: "postgres",
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
