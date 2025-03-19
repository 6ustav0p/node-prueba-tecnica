const { response, request } = require("express");
const Usuario = require("../models/usuario");

const getUsuarios = async (req = request, res = response) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const usuarios = await Usuario.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Usuario.countDocuments();

    res.json({
      ok: true,
      usuarios,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getUsuarioPorId = async (req = request, res = response) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearUsuario = async (req = request, res = response) => {
  try {
    const { email, direcciones } = req.body;

    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya está registrado.",
      });
    }

    if (!Array.isArray(direcciones) || direcciones.length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "Debe proporcionar al menos una dirección válida.",
      });
    }

    const usuario = new Usuario(req.body);
    await usuario.save();

    res.status(201).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: error.message,
    });
  }
};

const actualizarUsuario = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { email, direcciones } = req.body;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    if (email && email !== usuario.email) {
      const emailExistente = await Usuario.findOne({ email });
      if (emailExistente) {
        return res.status(400).json({
          ok: false,
          msg: "El email ya está en uso por otro usuario.",
        });
      }
    }

    if (direcciones && (!Array.isArray(direcciones) || direcciones.length === 0)) {
      return res.status(400).json({
        ok: false,
        msg: "Debe proporcionar al menos una dirección válida.",
      });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: error.message,
    });
  }
};

const eliminarUsuario = async (req = request, res = response) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    res.json({
      ok: true,
      msg: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const buscarUsuariosPorCiudad = async (req = request, res = response) => {
  try {
    const { ciudad } = req.query;
    if (!ciudad) {
      return res.status(400).json({
        ok: false,
        msg: "Se requiere el parámetro 'ciudad'",
      });
    }

    const usuarios = await Usuario.find({ "direcciones.ciudad": ciudad });

    res.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  buscarUsuariosPorCiudad,
};
