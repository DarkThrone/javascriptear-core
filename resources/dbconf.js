var cradle = require('cradle'),
    host   = "http://carritoz.couchone.com",
    port   = 80,
    dbname = "arjs",
    user   = "admin",
    pass   = "administrator1234",
    conn   = new (cradle.Connection)(host, port, 
                  {cache:true, raw: false, 
                   auth: {username:user, password:pass}}),
    document  = conn.database(dbname);
exports.doc = document;
