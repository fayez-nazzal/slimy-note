const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connect = () => {
  return mongoose.connect(
    "mongodb://slimy-note-db:3gnO6oIeZ19v1Hdo4lgSmygX3psdSIsn9IoZDCAtLzEWNwYRzhPaeOb5gsMKU0u2RKlSVbkzBi4Nwp7bYhEwFQ%3D%3D@slimy-note-db.mongo.cosmos.azure.com:10255/?ssl=true&appName=@slimy-note-db@",
    { useNewUrlParser: true }
  );
};

module.exports = {
  connect,
  mongoose,
};
