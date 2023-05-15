import { Product } from "../product";

describe("Product model tests ", () => {
  it("implements optimistic concurrency control", async () => {
    const product = Product.build({
      name: "Product",
      description: "Product description",
      price: 50,
      stock: 10,
    });
    await product.save();

    const firstInstance = await Product.findById(product.id);
    const secondInstance = await Product.findById(product.id);

    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 15 });

    await firstInstance!.save();
    try {
      await secondInstance!.save();
    } catch (err) {
      return;
    }

    throw new Error("Should not reach here");
  });
  it("increments version number on multiple saves", async () => {
    const product = Product.build({
      name: "Product",
      description: "Product description",
      price: 50,
      stock: 10,
    });
    await product.save();

    expect(product.version).toEqual(0);
    console.log(product);

    await product.save();
    expect(product.version).toEqual(1);
    console.log(product);

    

    await product.save();
    expect(product.version).toEqual(2);
    console.log(product);

  });
});
