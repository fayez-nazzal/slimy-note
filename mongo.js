const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

const connect = () => {
  return mongoose.connect(
    "mongodb://slimy-note-db:3gnO6oIeZ19v1Hdo4lgSmygX3psdSIsn9IoZDCAtLzEWNwYRzhPaeOb5gsMKU0u2RKlSVbkzBi4Nwp7bYhEwFQ%3D%3D@slimy-note-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&appName=@slimy-note-db@"
  );
};

module.exports = {
  connect,
  mongoose,
};
