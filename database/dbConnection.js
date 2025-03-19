const mongoose = require("mongoose");

const dbMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("Base de datos mongo online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbMongo,
};
