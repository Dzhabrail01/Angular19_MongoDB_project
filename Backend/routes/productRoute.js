const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const upload = require('../middlewares/upload.js')

router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getOneProduct);
router.post("/addProduct", authMiddleware, upload.array('image[]', 10), productController.addProduct);
router.delete("/delproduct/:id", authMiddleware,productController.deleteOneProduct);
router.patch("/update/:id", authMiddleware, productController.updateProduct);

module.exports = router;
