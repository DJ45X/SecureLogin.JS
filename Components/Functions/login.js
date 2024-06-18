const { getConnection } = require("../Utils/db");
const argon2 = require("argon2");

async function loginUser(username, password) {
    const pepperedPassword = password + process.env.PEPPER;
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT password_hash, salt FROM users WHERE username = ?", [username]);
    await connection.end();

    if (rows.length > 0) {
        const storedHash = rows[0].password_hash;
        try {
            if (await argon2.verify(storedHash, pepperedPassword)) {
                console.log("Login successful");
            } else {
                console.log("Incorrect password");
            }
        } catch (err) {
            console.error("Error verifying password: ", err);
        }
    } else {
        console.log("User not found");
    }
}

module.exports = { loginUser };