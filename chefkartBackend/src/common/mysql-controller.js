/**
 * To initialize a Database connection.
 */

const mysql = require("mysql");

const initializeConnection = () => {
    try {
      // create a new connection to the database
      const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "<your password>",
        database: "client_referals"
      });
      return connection;
    } catch (error) {
      console.log("Error occured while initializing connection:", error);
    }
}

module.exports = initializeConnection;