import {DogBed_Variant, ImageData, Price, Product} from "@mamat14/shop-server/shop_model";
import lukoshkoSizes from "../sizes/lukoshkoSizes";
import vicFabrics from "../fabrics/vicFabrics";

function getLukoshkoVariants(): DogBed_Variant[] {
    const res: DogBed_Variant[] = [];
    for (const fabric of vicFabrics) {
        for (const size of lukoshkoSizes) {
            res.push({
                fabricId: fabric.id,
                sizeId: size.id,
                variantName: `products/lukoshko-${fabric.id}-${size.id}`,
            });
        }
    }
    return res;
}

const lukoshkoVariants: DogBed_Variant[] = getLukoshkoVariants();

const lukoshkoImages: Record<string, ImageData[]> = Object.fromEntries(
    Object.entries({
        "vic-32": [
            {src: "/beds/lukoshko2/Dogs-7043.jpg", alt: "фото лежанки Лукошко"},
        ],
        "vic-20": [],
        "vic-21": [],
        "vic-22": [],
        "vic-34": [],
        "vic-36": [],
        "vic-66": [],
        "vic-70": [],
        "vic-80": [],
        "vic-88": [],
        "vic-93": [],
        "vic-96": [],
        "vic-100": [],
    }).map(([id, photos]) => [
        id,
        photos.concat([{src: `/fabrics/vic/${id}.JPG`, alt: "Фото ткани"}]),
    ])
);

const lukoshkoPrices: Record<string, Price> = {
    "lukoshko-1": {price: 950},
    "lukoshko-2": {price: 1050},
    "lukoshko-3": {price: 1350},
    "lukoshko-4": {price: 1550},
};

const lukoshkoDescription = `
# О лежанке
Наша лежаночка состоит из водоотталкивающей ткани
* подушечки и бортики со съемным чехлом
* наполнителя: холофайбер.

# О размерах
* XS (50 х 40 см) для мини йорков, той-терьеров, чихуахуа и др. малышек
* S (60 х 40 см) для шпицев, папильонов, мальтийских болонок
* M (70 х 50 см) для ши-тцу, французских бульдогов, цверг-шнауцеров, вест хайленд уайт терьеров, пекинесов, мейн-кунов, британских вислоухих.
* L (90 х 60 см) для корги, биглей, американских бультерьеров, английских бульдогов, русских кокер спаниелей.
`;


export const lukoshkoDuos: Product[] = lukoshkoVariants.map((v) => ({
    id: v.variantName.split("/").filter((x) => !!x)[1],
    name: v.variantName,
    displayName: `Лукошко Дуо`,
    description: lukoshkoDescription,
    price: lukoshkoPrices[v.sizeId],
    images: lukoshkoImages[v.fabricId],
    details: {
        $case: "dogBed",
        dogBed: {
            sizeId: v.sizeId,
            fabricId: v.fabricId,
            fabrics: vicFabrics,
            sizes: lukoshkoSizes,
            variants: lukoshkoVariants,
        },
    },
}));
