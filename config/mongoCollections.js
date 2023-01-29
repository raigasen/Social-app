const mongoConnect = require('../config/mongoConnection');
/* This allows to have one reference for each collection per app */
const getCollectionFunction = (collection) => {
    let _col = undefined;
  
    return async () => {
      if (!_col) {
        const db = await mongoConnect.connectToDb();
        _col = await db.collection(collection);
      }
  
      return _col;
    };
  };
  
  /* list of collections : */
  module.exports = {
    users: getCollectionFunction('users'),
    comments: getCollectionFunction('comments')
  };