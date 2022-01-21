import { Category, Model, Product } from "apis/catalog";

import ALL_IMAGES from "./images.json";
import {
  ALL_FABRICS,
  ALL_PRICES,
  ALL_SIZES,
  allProductKeys,
  CategoryId,
  DESCRIPTIONS,
  makeProducts,
  modelToCategory,
  PRODUCT_NAMES,
  ProductKey,
} from "./defs";

function min(arr: Product[]): number {
  return arr.map((s) => s.price.price).reduce((a, b) => Math.min(a, b));
}
export const all_products_grouped = Object.keys(allProductKeys).map((key) =>
  makeProducts(
    key,
    PRODUCT_NAMES[key],
    ALL_PRICES[key],
    DESCRIPTIONS[key],
    ALL_IMAGES[key],
    ALL_SIZES[key],
    ALL_FABRICS[key],
  ),
);
export const all_products = all_products_grouped.flatMap((x) => x);

function createCategory(catId: CategoryId): Category & { id: CategoryId } {
  const name = `categories/${catId}`;
  const products = all_products
    .filter((p) => modelToCategory[p.modelId as ProductKey] === catId)
    .map((p) => p.name);
  return {
    id: catId,
    name,
    displayName: "Лежанки",
    description: "Лежанки для питомцев",
    image: {
      src: "https://picsum.photos/300/300?random=1",
      alt: "beds category",
      name,
    },
    products,
  };
}

export const categories: (Category & { id: CategoryId })[] = [
  createCategory("beds"),
  createCategory("ammo"),
];

export const models = all_products_grouped.map((modelProducts): Model => {
  const p = modelProducts[0];
  return {
    description: "",
    displayName: PRODUCT_NAMES[p.modelId],
    id: p.modelId,
    images: modelProducts
      .filter(
        (product) => product.details.dogBed.size === p.details.dogBed.size,
      )
      .flatMap((product) => product.images),
    name: p.name,
    minimalPrice: min(modelProducts),
  };
});