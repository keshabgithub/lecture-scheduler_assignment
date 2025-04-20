// backend/hashPassword.js

const bcrypt = require('bcrypt');

async function run() {
  const plainPassword = "instructor123";
  const hashed = await bcrypt.hash(plainPassword, 10);
  console.log("🔐 Hashed password:", hashed);
}

run();
