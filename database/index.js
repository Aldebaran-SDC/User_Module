const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({
  path: './.env',
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Shain:G1mm3m0ng0@cluster0-xgt6f.mongodb.net/test1?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {

//   if (err) {
//     console.log(err);
//   } else { console.log('connected'); }
//   const collection = client.db("test1").collection("devices");
//   // perform actions on the collection object
//   //client.close();
// });



mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
});

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

module.exports.addUser = addUser;
module.exports.getUserById = getUserById;
module.exports.decrementFollowers = decrementFollowers;
module.exports.incrementFollowers = incrementFollowers;
module.exports.getAllUsers = getAllUsers;
module.exports.getUserByName = getUserByName;
module.exports.User = User;
