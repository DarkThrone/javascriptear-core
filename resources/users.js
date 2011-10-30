var db = require('./dbconf'),
    users = db.doc;

exports.findOrCreateUserData = function(data, promise) {
  users.view('docs/twitterId', { key: data.id_str }, function(err, doc) {
    if ( err ) {
      console.log("Error using users/_design/docs/_views/twitterid:");
      console.log(err);
      promise.fail(err);
      return;
    } 
    if ( doc.length !== 0 ) {
      promise.fulfill(doc);
    } else {
      var doc = {
        name: data.name,
        twitterId: data.id_str
      };
      conn.database(dbname).save(doc, function(err, res) {
        if ( err ) {
          console.log("Error using users:");
          console.log(err);
          promise.fail(err);
          return;
        }
        promise.fulfill(doc);
      });
    }
  });
};

