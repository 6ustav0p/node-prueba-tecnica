const { Schema, model } = require("mongoose");

const DireccionSchema = new Schema({
  calle: { type: String, required: true },
  ciudad: { type: String, required: true },
  pais: { type: String, required: true },
  codigo_postal: { type: String, required: true },
});

const UsuarioSchema = new Schema({
  nombre: { type: String, required: [true, "El nombre es obligatorio."] },
  email: {
    type: String,
    required: [true, "El email es obligatorio."],
    unique: true,
    match: [/.+\@.+\..+/, "El email debe ser válido."],
  },
  edad: { type: Number, min: 0 },
  fecha_creacion: { type: Date, default: Date.now },
  direcciones: {
    type: [DireccionSchema],
    validate: {
      validator: function (val) {
        return val.length > 0;
      },
      message: "Debe haber al menos una dirección.",
    },
  },
});

module.exports = model("Usuario", UsuarioSchema);
