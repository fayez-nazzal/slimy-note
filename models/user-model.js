const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  displayname: String,
  accessToken: String,
  oauthId: String,
  notebooks: [
    {
      title: String,
      active: Boolean,
      color: String,
      notes: [
        {
          title: String,
          color: String,
          content: String,
        },
      ],
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
