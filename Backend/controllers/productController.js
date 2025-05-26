const Product = require("../models/Product");
const User = require("../models/User");

class ProductController {
  async addProduct(req, res) {
    try {

      if(req.user.roles[0] !== "ADMIN") {
        console.log("Нет Доступа");
        return res.status(400).json({ error: "Нет Доступа" })
      }

      const { name, price, description } = req.body;
  
      let imagePaths = '';
      if (req.files && req.files.length > 0) {
        req.files.forEach((file, index) => {
          imagePaths += file.path;
          if(index + 1 < req.files.length) {
            imagePaths += ' , ';
          }
        });
      } 
      // else {
      //   return res.status(400).json({ message: "Нет загруженных изображений" });
      // }
  
    
      const product = new Product({
        name,
        description,
        price,
        image: imagePaths || "uploads/no_img.png",
      });
  
      await product.save();
      return res.status(200).json({ message: "Продукт успешно добавлен!", product });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка добавления продукта" });
    }
  }
  
  async deleteOneProduct(req, res) {
    try {

      if(req.user.roles[0] !== "ADMIN") {
        console.log("Нет Доступа");
        return res.status(400).json({ error: "Нет Доступа" })
      }

      const id = req.params.id;
      const product = await Product.findByIdAndDelete({ "_id": id });
      res.json({message: "Product deleted", product});
    } catch (e) {
      res.status(500).json({message: "Ошибка удаления"})
      console.log(e);
    }
  }

  async getProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (e) {
      res.status(500).json({message: "Ошибка выдачи продуктов"})
      console.log(e);
    }
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findById({ "_id": id });
      res.json(product);
    } catch (e) {
      res.status(500).json({message: "Ошибка выдачи одного продукта"})
      console.log(e);
    }
  }

  async updateProduct(req, res) {
    try {

      if(req.user.roles[0] !== "ADMIN") {
        console.log("Нет Доступа");
        return res.status(400).json({ error: "Нет Доступа" })
      }

      const id = req.params.id;
      const {name, price, description} = req.body;

      const product = await Product.findByIdAndUpdate({ "_id": id }, { name: name, price: price, description: description });
    
      
      res.status(200).json({message: "Продукт изменен"})
    } catch (e) {
      res.status(500).json({message: "Ошибка изменения"})
      console.log(e);
    }
  }
}

module.exports = new ProductController();
