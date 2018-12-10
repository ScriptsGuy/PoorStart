const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const colors = require('colors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


const app = express();
const MONGODB_URI = 'mongodb+srv://salah:DANTEjoker..93@cluster0-20wus.mongodb.net/shop?retryWrites=true';
const mongoStore = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const PageNotFoundController = require('./controllers/404');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


const User = require('./models/wishlist');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my secret', resave: false, saveUninitialized: false, store: mongoStore,
}));


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(PageNotFoundController.get404);

mongoose.connect(MONGODB_URI)
  .then((result) => {
    console.log('connected!!'.bgGreen.bold);
    User.findOne().then((user) => {
      if (!user) {
        // eslint-disable-next-line no-shadow
        const user = new User({
          name: 'salah',
          email: 'salah@test.com',
          wishList: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  }).catch((err) => {
    console.log(err);
  });

