# user

Install dependencies: npm install

Start up the server in development mode: npm run start

Start up the server in production mode: npm run start:prod

Seed the database: npm run seed

Rebuild the bundle with webpack after changing react files:
npm run build

CRUD API endpoints:

Create: app.post('/adduser', c.addUser)
Delete: app.delete('/deleteuser/:id', c.deleteUser);
Update: app.patch('/updateuser/:id', c.updateUser);
Read: app.get('/users', c.getAllUsers);