const db = require('../database/index.js');

module.exports.getUserById = (req, res) => {
  console.log('hitting get user by id');
  db.getUserById(req.params.userId, (err, results) => {
    if (err) {
      res.status(404).send('user not found');
    }
    res.send(results);
  });
};

module.exports.getUserByName = (req, res) => {
  db.getUserByName(req.params.username, (err, results) => {
    if (err) {
      res.status(404).send('user not found');
    }
    res.send(results);
  });
};

module.exports.getAllUsers = (req, res) => {
  db.getAllUsers((err, results) => {
    if (err) {
      res.status(404).send('getAllUsers failed');
    }
    res.send(results);
  });
};

module.exports.decrementFollower = (req, res) => {
  db.decrementFollowers(req.params.username, (err) => {
    if (err) {
      res.status(404).send('decrementing followers failed');
    }
    res.sendStatus(200);
  });
};

module.exports.incrementFollower = (req, res) => {
  db.incrementFollowers(req.params.username, (err) => {
    if (err) {
      res.status(404).send('incrementing followers failed');
    }
    res.sendStatus(200);
  });
};

module.exports.addUser = (req, res) => {
  db.addUser(req.body, (err) => {
    if (err) {
      res.status(500).send('ERROR: unable to create user');
    } else {
      res.status(201).send('SUCCESS! User was created');
    };
  });
};



}
