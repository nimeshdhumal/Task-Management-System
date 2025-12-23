
require('dotenv').config();
const express = require('express');
const taskRoutes = require('./src/routes/taskRoutes');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
const { sequelize } = require('./src/config/db');
const User = require('./src/models/userModel');// Register all the models into the Sequelize.model();;;
const Task = require('./src/models/taskModel');
const Comment = require('./src/models/commentsModel');
const errorHandler = require('./src/middlewares/errorHandler');
const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);
app.use('/admin', adminRoutes);

// async function tableCreation() {
//     // await User.sync();
//     await sequelize.sync({ alter: true });
//     console.log("Table created successfully!!!");
// }

// tableCreation();
app.use(errorHandler); // Global error handler;;;
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});