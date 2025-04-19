const validateContentType = require("../../middlewares/validateContentType");

const express = require("express");
const {
  SliderAdd,
  SliderDel,
  SliderEdit,
  SliderList,
} = require("../../controllers/home/slider");
const upload = require("../../middlewares/uploadFile");

const router = express.Router();

/**
 * @swagger
 * /api/slider:
 *   get:
 *     summary: Bütün slayderləri gətir
 *     responses:
 *       200:
 *         description: Slayderlərin siyahısı
 *   post:
 *     summary: Yeni slayder əlavə et
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Yeni slayder əlavə edildi
 */

router.get("/", SliderList);
router.post("/", upload.single("image"), SliderAdd);
router.put("/:id", upload.single("image"), SliderEdit);
router.delete("/:id", SliderDel);

module.exports = router;
