const express = require("express");
const cors = require('cors')
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const Role = require("./models/UserRole"); // Импортируем модель Role
const PORT = process.env.PORT || 5000;

const app = express({ limit: "100mb" });

app.use(cors())

app.use(express.json())
app.use('/auth', authRouter)
app.use('/product', productRoute)
app.use("/uploads", express.static("uploads"))

// Функция для создания ролей, если они не существуют
const createDefaultRoles = async () => {
  try {
    const defaultRoles = ["USER", "ADMIN"];
    
    for (const roleValue of defaultRoles) {
      const roleExists = await Role.findOne({ value: roleValue });
      if (!roleExists) {
        const newRole = new Role({ value: roleValue });
        await newRole.save();
        console.log(`Роль ${roleValue} создана`);
      }
    }
  } catch (e) {
    console.error("Ошибка при создании ролей:", e);
  }
};

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017');
    
    // Создаем роли после подключения к MongoDB
    await createDefaultRoles();
    
    app.listen(PORT, () => {
      console.clear();
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();