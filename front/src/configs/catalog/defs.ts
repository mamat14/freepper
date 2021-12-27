import {
  DogBed_Variant,
  Fabric,
  ImageData,
  Price,
  Product,
  Size,
  SizeDetails,
} from "apis/catalog";
import { VIC_FABRICS, VIC_KEYS, VicFabricKeys } from "../fabrics/vicFabrics";
import { AV_FABRICS, AV_KEYS, AvFabricKeys } from "../fabrics/avFabrics";
import {
  KRESLO_FABRICS,
  KRESLO_KEYS,
  KresloFabricKeys,
} from "../fabrics/kresloFabricKeys";

export type ProductKey =
  | "lukoshkoDuo"
  | "lukoshkoTrio"
  | "chemodan"
  | "kvadroSoft"
  | "kvadroStrong"
  | "norka"
  | "podushka"
  | "kolorado"
  | "kreslo";

export const helper1: Record<ProductKey, 1> = {
  kreslo: 1,
  norka: 1,
  podushka: 1,
  chemodan: 1,
  kvadroSoft: 1,
  kvadroStrong: 1,
  lukoshkoDuo: 1,
  lukoshkoTrio: 1,
  kolorado: 1,
};
export const productKeys = Object.keys(helper1);
export function isProductKey(t: string): t is ProductKey {
  return !!productKeys.find((x) => x === t);
}

export type FabricKey = VicFabricKeys | AvFabricKeys | KresloFabricKeys;
export type AvBeds = "chemodan" | "kolorado" | "kvadroStrong" | "norka";
export type FabricKey2<T> = T extends AvBeds
  ? AvFabricKeys
  : T extends "kreslo"
  ? KresloFabricKeys
  : VicFabricKeys;
type Helper2 = {
  [P in ProductKey]: FabricKey2<P>[];
};

export const MODEL_TO_FABRIC: Helper2 = {
  kreslo: KRESLO_KEYS,
  chemodan: AV_KEYS,
  kolorado: AV_KEYS,
  kvadroSoft: VIC_KEYS,
  kvadroStrong: AV_KEYS,
  lukoshkoDuo: VIC_KEYS,
  lukoshkoTrio: VIC_KEYS,
  norka: AV_KEYS,
  podushka: VIC_KEYS,
};

export function isFabricKeyOf<T extends ProductKey>(
  t: T,
  fabricId: string,
): fabricId is FabricKey2<T> {
  // @ts-ignore
  return MODEL_TO_FABRIC[t].includes(fabricId);
}

export function makeProductName(
  name: ProductKey,
  fabric: FabricKey,
  size: string,
) {
  return `products/${name}-${fabric}-${size}`;
}

export type Prices = Partial<Record<Size, Price>>;
export type AllPrices = Record<ProductKey, Prices>;

export type Sizes = Partial<Record<Size, SizeDetails>>;
export type AllSizes = Record<ProductKey, Sizes>;

export type Fabrics<T extends ProductKey> = Record<
  FabricKey2<T>,
  Fabric & { id: FabricKey2<T> }
>;
export type AllFabrics = {
  [P in ProductKey]: Fabrics<P>;
};

export const ALL_PRICES: AllPrices = {
  kreslo: {
    S: { price: 1850 },
    M: { price: 2100 },
  },
  kolorado: {
    S: { price: 1250 },
    M: { price: 1400 },
    L: { price: 1600 },
    XL: { price: 1800 },
  },
  norka: {
    XS: { price: 1550 },
    S: { price: 1650 },
    M: { price: 1800 },
    L: { price: 2100 },
  },
  podushka: {
    S: { price: 400 },
    M: { price: 500 },
    L: { price: 600 },
  },
  chemodan: {
    S: { price: 1350 },
    M: { price: 1500 },
    L: { price: 1650 },
    XL: { price: 1800 },
    XXL: { price: 2100 },
  },
  kvadroSoft: {
    XS: { price: 950 },
    S: { price: 1050 },
    M: { price: 1350 },
    L: { price: 1550 },
    XL: { price: 1750 },
    XXL: { price: 2000 },
  },
  kvadroStrong: {
    XS: { price: 1050 },
    S: { price: 1200 },
    M: { price: 1450 },
    L: { price: 1600 },
    XL: { price: 1850 },
    XXL: { price: 2150 },
  },
  lukoshkoDuo: {
    XS: { price: 1300 },
    S: { price: 1400 },
    M: { price: 1550 },
    L: { price: 1700 },
  },
  lukoshkoTrio: {
    XS: { price: 1350 },
    S: { price: 1450 },
    M: { price: 1600 },
    L: { price: 1750 },
  },
};

export const KOLORADO_SIZES = {
  S: { description: "50x50см" },
  M: { description: "60x60см" },
  L: { description: "70x70см" },
  XL: { description: "80x80см" },
};

export const NORKA_SIZES = {
  XS: { description: "50см" },
  S: { description: "60см" },
  M: { description: "70см" },
  L: { description: "80см" },
};

export const PODUSHKA_SIZES = {
  S: { description: "45x35см" },
  M: { description: "60x40см" },
  L: { description: "65х45см" },
};

export const CHEMODAN_SIZES: Sizes = {
  S: { description: "70x50см" },
  M: { description: "90x60см" },
  L: { description: "110x70см" },
  XL: { description: "120x80см" },
  XXL: { description: "140x100см" },
};

export const KVADRO_SIZES: Sizes = {
  XS: { description: "50x40см" },
  S: { description: "60x45см" },
  M: { description: "70x50см" },
  L: { description: "90х60см" },
  XL: { description: "110x70см" },
  XXL: { description: "140x100см" },
};

export const LUKOSHKO_SIZES: Sizes = {
  XS: { description: "Диаметр 50см" },
  S: { description: "Диаметр 60см" },
  M: { description: "Диаметр 70см" },
  L: { description: "Диаметр 80см" },
};

export const KRESLO_SIZES: Sizes = {
  S: { description: "30x30x23см" },
  M: { description: "45x45x37см" },
};

export const ALL_SIZES: AllSizes = {
  kolorado: KOLORADO_SIZES,
  norka: NORKA_SIZES,
  podushka: PODUSHKA_SIZES,
  chemodan: CHEMODAN_SIZES,
  kvadroSoft: KVADRO_SIZES,
  kvadroStrong: KVADRO_SIZES,
  lukoshkoDuo: LUKOSHKO_SIZES,
  lukoshkoTrio: LUKOSHKO_SIZES,
  kreslo: KRESLO_SIZES,
};

export const ALL_FABRICS: AllFabrics = {
  kolorado: AV_FABRICS,
  norka: AV_FABRICS,
  podushka: VIC_FABRICS,
  chemodan: AV_FABRICS,
  kvadroSoft: VIC_FABRICS,
  kvadroStrong: AV_FABRICS,
  lukoshkoDuo: VIC_FABRICS,
  lukoshkoTrio: VIC_FABRICS,
  kreslo: KRESLO_FABRICS,
};

export const CHEMODAN_DESCRIPTION = `
Ткань, фурнитура, наполнители:
 - ткань прошита армированными нитями
 - матрас наполнен гипоаллергенным и антибактериальным холлофайбером и синтепоном.
 - водоотталкивающая ткань
`;

export const KVADRO_DESCRIPTION = `
Ткань, фурнитура, наполнители:
 - ткань прошита армированными нитями
 - матрас наполнен гипоаллергенным и антибактериальным холлофайбером.
 - водоотталкивающая ткань

Характеристики: 
 - лежак не боится воды
 - аккуратные, мягкие бортики, на которые любимец может положить голову
 - чехол, который можно стирать в стиральной машине
 - съемная подушка
`;

export const LUKOSHKO_DESCRIPTION = `
Ткань, фурнитура, наполнители:
 - ткань прошита армированными нитями
 - матрас наполнен гипоаллергенным и антибактериальным холлофайбером.
 - водоотталкивающая ткань


«Лукошко» сшито из ткани со специальной водоотталкивающей пропиткой: влага скатывается и легко встряхивается с этого материала. ⠀
Мы любим ее за бархатную обработку материала и воздушное наполнение.
Материал имеет такое плотное переплетение, что даже острую, как елочные иголочки шерсть, можно стряхнуть одним движением. Это же свойство делает ткань очень крепкой и износостойкой. Лежаночка имеет съемный чехол на подушечку, который можно стирать в машинке.
`;

export const NORKA_DESCRIPTION = `
Ткань, фурнитура, наполнители:
  - мебельная ткань микрофибра
  - плотность ткани: 370г/м2
  - тест на стирание по Мартиндейлу – 50 000 циклов
  - цветостойкость: 5 (макс 5)
  - ткань прошита армированными нитями
  - лежак наполнен гипоаллергенным и антибактериальным холлофайбером, основа из мебельного паролона
  - водоотталкивающая ткань
  - 25% шерсть
`;

export const KOLORADO_DESCRIPTION = `
Ткань, фурнитура, наполнители:
  - мебельная ткань микрофибра
  - плотность ткани: 370г/м2
  - тест на стирание по Мартиндейлу – 50 000 циклов
  - цветостойкость: 5 (макс 5)
  - ткань прошита армированными нитями
  - борта и матрас наполнены гипоаллергенным и антибактериальным холлофайбером
  - водоотталкивающая ткань

Характеристики: 
 - лежак не боится воды
 - аккуратные, мягкие бортики, на которые любимец может положить голову
 - чехол, который можно стирать в стиральной машине
 - съемная подушка
`;

export const PODUSHKA_DESCRIPTION = `
Ткань, фурнитура, наполнители:
  - мебельная ткань микрофибра
  - тест на стирание по Мартиндейлу – 30 000 циклов
  - цветостойкость: 4 (макс 5)`;

export const KRESLO_DESCRIPTION = `
Автокресло представлено в 2 размерах: S и М

Материал автокресел: качественный и крепкий Оксфорд

Автокресло оснащено тугими кнопками, обеспечивающими полную безопасность вашего любимца

Во время езды автокресло пристегивается к машинному сиденью с помощью специального ремня.

Любимец также пристегивается к автокреслу за шлейкой с помощью небольшого ремня.

Автокресло подойдет для перевозок на близкие и дальние расстояния
`;

export const DESCRIPTIONS: Record<ProductKey, string> = {
  chemodan: CHEMODAN_DESCRIPTION,
  kvadroSoft: KVADRO_DESCRIPTION,
  kvadroStrong: KVADRO_DESCRIPTION,
  lukoshkoDuo: LUKOSHKO_DESCRIPTION,
  lukoshkoTrio: LUKOSHKO_DESCRIPTION,
  kolorado: KOLORADO_DESCRIPTION,
  norka: NORKA_DESCRIPTION,
  podushka: PODUSHKA_DESCRIPTION,
  kreslo: KRESLO_DESCRIPTION,
};

export const PRODUCT_NAMES: Record<ProductKey, string> = {
  kreslo: "Автокресло",
  chemodan: "Чемодан",
  kvadroSoft: "Квадро Софт",
  kvadroStrong: "Квадро Стронг",
  lukoshkoDuo: "Лукошко Дуо",
  lukoshkoTrio: "Лукошко Трио",
  kolorado: "Колорадо",
  norka: "Норка",
  podushka: "Подушка",
};

export function makeProducts<T extends ProductKey>(
  productKey: T,
  productName: T,
  prices: Prices,
  description: string,
  images: Record<string, ImageData[] | undefined>,
  sizes: Sizes,
  fabrics: Fabrics<T>,
) {
  const sizesIds = Object.keys(sizes) as Size[];
  const allFabrics: (Fabric & { id: FabricKey2<T> })[] = Object.values(fabrics);
  const fabricsSeq = allFabrics.filter(
    (fabric: Fabric & { id: FabricKey2<T> }) => !!images[fabric.id],
  );

  const variants: DogBed_Variant[] = fabricsSeq.flatMap((fabric) =>
    sizesIds.map((size) => ({
      fabricId: fabric.id,
      size,
      variantName: makeProductName(productKey, fabric.id, size),
    })),
  );

  const beds: Product[] = variants.map((v) => {
    const price = prices[v.size];
    if (!price) {
      throw new Error(`no price for ${JSON.stringify(v)}`);
    }
    return {
      id: v.variantName.split("/").filter((x) => !!x)[1],
      name: v.variantName,
      displayName: productName,
      description,
      price,
      images: images[v.fabricId] || [],
      modelId: productKey,
      details: {
        $case: "dogBed",
        dogBed: {
          size: v.size,
          fabricId: v.fabricId,
          fabrics: fabricsSeq,
          sizes,
          variants,
        },
      },
    };
  });

  return beds;
}

export const allProductKeys: Record<ProductKey, 1> = {
  kreslo: 1,
  kolorado: 1,
  norka: 1,
  podushka: 1,
  chemodan: 1,
  kvadroSoft: 1,
  kvadroStrong: 1,
  lukoshkoDuo: 1,
  lukoshkoTrio: 1,
};

export type CategoryId = "beds" | "ammo";
export const modelToCategory: Record<ProductKey, CategoryId> = {
  kreslo: "ammo",
  chemodan: "beds",
  kolorado: "beds",
  kvadroSoft: "beds",
  kvadroStrong: "beds",
  lukoshkoDuo: "beds",
  lukoshkoTrio: "beds",
  norka: "beds",
  podushka: "beds",
};
