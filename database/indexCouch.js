var nano = require('nano');
var async = require('async');
var couch = require('./couchdb');





const userSchema = mongoose.Schema({
  id: Number,
  handle: String,
  name: String,
  image_url: String,
  track_count: Number,
  follower_count: Number,
  join_date: Date,
});

const User = mongoose.model('User', userSchema);

const addUser = (obj, callback) => {
  const newUser = new User(obj);
  newUser.save().exec(callback);
}

const getUserById = (ID, callback) => {
  User.findOne({ id: ID }).exec(callback);
};

const getUserByName = (username, callback) => {
  User.findOne({ name: username }).exec(callback);
};

const getAllUsers = (callback) => {
  User.find({}).exec(callback);
};

const decrementFollowers = (username, callback) => {
  User.findOneAndUpdate({ name: username }, { $inc: { follower_count: -1 } }).exec(callback);
};

const incrementFollowers = (username, callback) => {
  User.findOneAndUpdate({ name: username }, { $inc: { follower_count: 1 } }).exec(callback);
};

const updateUser = (ID, callback) => {
  User.findOneAndUpdate({ id: ID}, {name: 'Updated'}).exec(callback);
};

const deleteUser = (ID, callback) => {
  User.deleteOne({id: ID}).exec(callback);
}

module.exports.addUser = addUser;
module.exports.getUserById = getUserById;
module.exports.decrementFollowers = decrementFollowers;
module.exports.incrementFollowers = incrementFollowers;
module.exports.getAllUsers = getAllUsers;
module.exports.getUserByName = getUserByName;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.User = User;
