var db = require('./dbconf'),
    qa = db.doc;


exports.createQuestion = function(data)  {
  qa.view('docs/search', { key: data.id_str }, function(err, doc) {
    if ( err ) {
      console.log("Error creating users/_design/docs/_views/search:");
      console.log(err);
      return;
    } 
    if ( doc.length !== 0 ) {
      // the question exist ... 
    } else {
      data.tags = String.split(tags);
      var doc = {
        title: data.title, 
        question: data.question, 
        tags: data.tags,
        answers: [],
        karma: 0
      };
      conn.database(dbname).save(doc, function(err, res) {
        if ( err ) {
          // troubles with save the doc
          return;
        }
      });
    }
  });
};

