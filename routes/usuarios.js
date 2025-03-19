const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");

const {
  getUsuarios,
  getUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  buscarUsuariosPorCiudad,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", getUsuarios);

router.get(
    "/buscar",
    [check("ciudad", "La ciudad es obligatoria").not().isEmpty(), validarCampos],
    buscarUsuariosPorCiudad
  );

router.get(
  "/:id",
  [check("id", "El ID no es válido").isMongoId(), validarCampos],
  getUsuarioPorId
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("email").normalizeEmail(),
    check("edad", "La edad debe ser un número positivo")
      .optional()
      .isInt({ min: 0 }),
    check(
      "direcciones",
      "Debe proporcionar al menos una dirección válida"
    ).isArray({ min: 1 }),
    check("direcciones.*.calle", "La calle es obligatoria").not().isEmpty(),
    check("direcciones.*.ciudad", "La ciudad es obligatoria").not().isEmpty(),
    check("direcciones.*.pais", "El país es obligatorio").not().isEmpty(),
    check("direcciones.*.codigo_postal", "El código postal es obligatorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    check("id", "El ID no es válido").isMongoId(),
    check("email", "El email debe ser válido").optional().isEmail(),
    check("edad", "La edad debe ser un número positivo")
      .optional()
      .isInt({ min: 0 }),
    check("direcciones", "Debe ser un array de direcciones")
      .optional()
      .isArray(),
    check("direcciones.*.calle", "La calle es obligatoria")
      .optional()
      .not()
      .isEmpty(),
    check("direcciones.*.ciudad", "La ciudad es obligatoria")
      .optional()
      .not()
      .isEmpty(),
    check("direcciones.*.pais", "El país es obligatorio")
      .optional()
      .not()
      .isEmpty(),
    check("direcciones.*.codigo_postal", "El código postal es obligatorio")
      .optional()
      .not()
      .isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete(
  "/:id",
  [check("id", "El ID no es válido").isMongoId(), validarCampos],
  eliminarUsuario
);



module.exports = router;
