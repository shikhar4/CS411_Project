const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: {
      type : Number,
      required: true
    },
    friend_list: {
      type: Array,
      required: false
    },
    borrowing: {
        type: Array,
        required: false
      },
    borrowed: {
        type: Array,
        required: false
      },     

  });
  
  const user = mongoose.model("User", UserSchema);
  module.exports = user;