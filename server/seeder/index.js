const fs = require('fs');
const path = require('path');
const product = require('../models/product');
const category = require('../models/category');

async function Seeder() {
  if (!fs.existsSync(path.join(process.cwd(), "seeder", "data", "products.json"))) {
    await getAndWriteProducts();
  }
  const productsInDbCount = await product.countDocuments();
  if (productsInDbCount === 0) {
    await insertProductsToDB();
  }

};

async function getAndWriteProducts() {
  try {
    const res = await (await fetch('https://dummyjson.com/products?limit=0')).json();
    fs.writeFileSync(path.join(process.cwd(), "seeder", "data", "products.json"), new TextEncoder().encode(JSON.stringify(res.products, "\t")));
  } catch (error) {
    console.error(error);
  }
}

async function insertProductsToDB() {
  try {
    const products = JSON.parse(fs.readFileSync(path.join(process.cwd(), "seeder", "data", "products.json")));
    if (!products) return;
    const categoriesToInsert = new Set();

    for (const product of products) {
      try {
        const catInDB = await category.findOne({ name: product.category });
        if (!catInDB) categoriesToInsert.add(product.category);
      } catch (error) {
        console.error(error);
        categoriesToInsert.add(product.category);
      }
    }

    const catForDB = [];

    for (const cat of categoriesToInsert) {
      catForDB.push({name: cat});
    }


    if(catForDB.length > 0){
      await category.insertMany(catForDB);
    }

    for (const product of products) {
        const catInDB = await category.findOne({ name: product.category });
        product.category = catInDB.id;
    }

    if(products.length > 0){
      await product.insertMany(products);
    }
  } catch (error) {
    console.error(error);
  }
}


module.exports = Seeder;

