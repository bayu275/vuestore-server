const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173',
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/img', express.static(path.join(__dirname, './public/img')));

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

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Vuestore-Server' });
});

require('./app/routes/product.routes')(app);
require('./app/routes/order.routes')(app);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
