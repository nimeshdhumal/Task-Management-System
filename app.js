require('dotenv').config();
const express = require('express');
const taskRoutes = require('./src/routes/task.routes');
const authRoutes = require('./src/routes/auth.routes');
const adminRoutes = require('./src/routes/admin.routes');
const commentRoutes = require('./src/routes/comment.routes');
const { sequelize } = require('./src/config/db');
const User = require('./src/models/user.model');// Register all the models into the Sequelize.model();;;
const Task = require('./src/models/task.model');
const Comment = require('./src/models/comment.model');
const errorHandler = require('./src/middlewares/error.handler');
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