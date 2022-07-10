"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        id: "ee774408-7dda-4085-84e2-d45b27ceab68",
        id_card: "V20995685",
        first_name: "Rosmer",
        last_name: "Campos",
        name: "Rosmer Campos",
        username: "rosmercampos",
        email: "rosmercampos@gmail.com",
        hash: "$argon2id$v=19$m=4096,t=3,p=1$L56NJkg6g/IZ79IgEpMD2g$5MZ0cPbl8mKbcy2ELSsWVuCvKX+VYsaTZUVX2tROxdo", // password
        salt: "Auyama",
        phone: "584125532688",
        birthday: new Date(),
        country: "Venezuela",
        gender: "Masculino",
        status: "Activo",
        staff: true,
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
