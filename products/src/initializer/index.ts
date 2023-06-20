import { ProductCreatedPublisher } from "../events/publishers/product-created-publisher";
import { Category } from "../models/category";
import { Product, ProductAttrs } from "../models/product";
import path from "path";
import { natsWrapper } from "../nats-wrapper";

export const initialize = async () => {
  const existingCategories = await Category.find();

  if (!(existingCategories.length === 0)) {
    return;
  }
  const initialCategories: { name: string }[] = [
    { name: "Category 1" },
    { name: "Category 2" },
    { name: "Category 3" },
  ];

  initialCategories.forEach(async (category: { name: string }) => {
    const createdCategory = Category.build(category);

    await createdCategory.save();
  });

  console.log("Initial categories created:", initialCategories);

  const existingProducts = await Product.find();

  if (!(existingProducts.length === 0)) {
    return;
  }

  const category = await Category.findOne({ name: "Category 1" });
  const category2 = await Category.findOne({ name: "Category 2" });


  if (!category) {
    return;
  }
  if (!category2) {
    return;
  }

  const imagePath = path.join(__dirname, "../images/image.png");

  const initialProducts: ProductAttrs[] = [
    {
      category,
      description: "This is a description for product 1",
      name: "Product 1",
      price: 100,
      stock: 100,
      image: imagePath,
    },
    {
      category,
      description: "This is a description for product 2",
      name: "Product 2",
      price: 100,
      stock: 100,
      image: imagePath,
    },
    {
      category: category2,
      description: "This is a description for product 3",
      name: "Product 3",
      price: 100,
      stock: 100,
      image: imagePath,
    },
    {
      category,
      description: "This is a description for product 4",
      name: "Product 4",
      price: 100,
      stock: 100,
      image: imagePath,
    },
    {
      category: category2,
      description: "This is a description for product 5",
      name: "Product 5",
      price: 100,
      stock: 100,
      image: imagePath,
    },
    {
      category,
      description: "This is a description for product 6",
      name: "Product 6",
      price: 100,
      stock: 100,
      image: imagePath,
    },
    {
      category,
      description: "This is a description for product 7",
      name: "Product 7",
      price: 100,
      stock: 100,
      image: imagePath,
    },
    {
      category,
      description: "This is a description for product 8",
      name: "Product 8",
      price: 100,
      stock: 100,
      image: imagePath,
    },
    {
      category,
      description: "This is a description for product 9",
      name: "Product 9",
      price: 100,
      stock: 100,
      image: imagePath,
    },
    {
      category,
      description: "This is a description for product 10",
      name: "Product 10",
      price: 100,
      stock: 100,
      image: imagePath,
    },
  ];

  initialProducts.forEach(async (product: ProductAttrs) => {
    
    const createdProduct = Product.build(product);

    await createdProduct.save();

    await new ProductCreatedPublisher(natsWrapper.client).publish({
      id: createdProduct.id,
      name: createdProduct.name,
      description: createdProduct.description,
      price: createdProduct.price,
      stock: createdProduct.stock,
      version: createdProduct.version,
      image: createdProduct.image!,
    });
  });
  console.log("Initial products created:", initialProducts);
};
