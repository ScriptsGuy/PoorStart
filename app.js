const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const PageNotFoundController = require('./controllers/404');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/wishlist');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5c0d8a5172e03a195ffb1fcc')
    .then((user) => {
      req.user = user;
      next();
    }).catch((err) => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(PageNotFoundController.get404);

mongoose.connect('mongodb+srv://salah:DANTEjoker..93@cluster0-20wus.mongodb.net/shop?retryWrites=true')
  .then((result) => {
    console.log('connected!!');
    User.findOne().then((user) => {
      if (!user) {
        // eslint-disable-next-line no-shadow
        const user = new User({
          name: 'salah',
          email: 'salah@test.com',
          wishList: {
            item: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  }).catch((err) => {
    console.log(err);
  });

