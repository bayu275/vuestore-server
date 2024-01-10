const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log('Database connected...');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err.message);
        process.exit();
    });

// console.log(db);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Vuestore-Server' });
});

require('./app/routes/product.routes')(app);
require('./app/routes/order.routes')(app);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
