const mongoClient = require('mongodb').MongoClient;
const settings = require('../config/settings.json');
const mongoConf = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = {
  connectToDb: async () => {
    if (!_connection) {
      _connection = await mongoClient.connect(mongoConf.serverUrl);
      _db = await _connection.db(mongoConf.database);
    }

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  }
};