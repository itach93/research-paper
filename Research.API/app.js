const express = require('express');
const bodyParser = require('body-parser');

const models = require('./models');
const authRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/UserRoutes');
const paperRoutes = require('./routes/AreaRoutes');

const passport = require('./helpers/passport');

const app = express();

// body-parser: application/json
app.use(bodyParser.json());

app.use(passport.initialize());


// PORT
const PORT = process.env.PORT || 3000;

// To fix CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/uploads/', express.static('uploads'));

// app.use(express.static(path.join(__dirname + '/uploads')));
// app.use( express.static(__dirname + 'uploads'));

app.use('/api', authRoutes, paperRoutes, userRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/papers', paperRoutes);

// Run server & Connection to database
models.sequelize.authenticate()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server listen on port ${PORT}`);
            console.log('connection to db successfully');
            // initial();
        });
    }).catch(err => {
        console.log(err);
    });

function initial() {
    models.Role.create({
        name: "Author"
    });

    models.Role.create({
        name: "Admin"
    });

    models.Role.create({
        name: "Reviewer"
    });

    models.Role.create({
        name: "Editor"
    });
}