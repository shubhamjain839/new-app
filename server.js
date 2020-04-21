const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
//connect to daatabase
connectDB();

const app = express();
//initialize middleware
app.use(express.json({ extended: false }));
//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//serve static assests in production

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/bulid'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
