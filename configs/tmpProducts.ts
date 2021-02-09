import { Price, Product, ImageData } from "@mamat14/shop-server/shop_model";
import { lukoshkoDuos } from "./beds/lukoshkoDuos";
import lukoshkoTrios from "./beds/lukoshkoTrios";
import chemodans from "./beds/chemodans";
import kvadroSofts from "./beds/kvadroSofts";
import kvadroStrongs from "./beds/kvadroStrongs";

function min(arr: Product[]): Price {
  const min = arr.map((s) => s.price.price).reduce((a, b) => Math.min(a, b));
  return { price: min };
}

export type ImageWithName = ImageData & { name: string };
export type TmpGroupedProduct = Omit<Product, "images"> & {
  images: ImageWithName[];
};

export const tmpProducts: TmpGroupedProduct[] = [
  {
    id: "tmpChemodan",
    name: chemodans[0].name,
    displayName: `Чемодан`,
    description: "",
    price: min(chemodans),
    images: [
      {
        src: "/beds/chemodan/IMG_4965.jpg",
        alt: "Собака на желтом чемодане",
        name: "products/chemodan-av-07-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-25020.jpg",
        alt: "Чемодан зеленый",
        name: "products/chemodan-av-12-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-7078.jpg",
        alt: "Чемодан черный ",
        name: "products/chemodan-av-18-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-7161.jpg",
        alt: "ручки чемодана",
        name: "products/chemodan-av-12-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-7169.jpg",
        alt: "Чемодан ручки",
        name: "products/chemodan-av-07-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-7173.jpg",
        alt: "Чемодан этикетка",
        name: "products/chemodan-av-12-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-7180 (2).jpg",
        alt: "Чемодан ручка",
        name: "products/chemodan-av-07-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-7183.jpg",
        alt: "Чемодан молния",
        name: "products/chemodan-av-12-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-7196 (1).jpg",
        alt: "Чемодан ручка",
        name: "products/chemodan-av-12-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-7255 (1).jpg",
        alt: "Чемодан зеленый",
        name: "products/chemodan-av-12-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-7258 (1).jpg",
        alt: " Чемодан зеленый",
        name: "products/chemodan-av-12-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-7268 (2).jpg",
        alt: " Зеленый и желтый чемодан",
        name: "products/chemodan-av-07-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-7271.jpg",
        alt: " Желтый чемодан",
        name: "products/chemodan-av-07-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-24800.jpg",
        alt: "Желтый чемодан с корги",
        name: "products/chemodan-av-07-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-24947 (2).jpg",
        alt: " Чемодан зеленый",
        name: "products/chemodan-av-12-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-24967 (2).jpg",
        alt: "Чемодан зеленый",
        name: "products/chemodan-av-12-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-25034.jpg",
        alt: "Чемодан зеленый",
        name: "products/chemodan-av-12-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-25044 (1).jpg",
        alt: "Чемодан черный",
        name: "products/chemodan-av-18-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-25071.jpg",
        alt: "Чемодан черный",
        name: "products/chemodan-av-18-chemodan-m",
      },
      {
        src: "/beds/chemodan/Dogs-25157.jpg",
        alt: "Чемоданы все",
        name: "products/chemodan-av-18-chemodan-m",
      },
      {
        src: "/beds/chemodan/IMG_4961.jpg",
        alt: "Чемодан зеленый",
        name: "products/chemodan-av-12-chemodan-m",
      },
      {
        src: "/beds/chemodan/IMG_4964.jpg",
        alt: "Чемодан зеленый",
        name: "products/chemodan-av-12-chemodan-m",
      },
    ],
  },
  {
    id: "tmpLukoshko",
    name: lukoshkoDuos[0].name,
    displayName: `Лукошко Дуо`,
    description: "",
    price: min(lukoshkoDuos),
    images: [
      {
        src: "/beds/lukoshko2/Dogs-7043.jpg",
        alt: "Фото лежанки лукошко с собачкой и тюльпанами",
        name: "products/lukoshkoDuo-vic-32-lukoshko-xs",
      },
    ],
  },
  {
    id: "tmpLukoshkoEifel",
    name: lukoshkoTrios[0].name,
    displayName: `Лукошко Трио`,
    description: "",
    price: min(lukoshkoTrios),
    images: [
      {
        src: "/beds/lukoshko3/Dogs-7253.jpg",
        alt: "Фото серого Лукошко Трио сверху",
        name: "products/lukoshkoTrio-vic-96-lukoshko-xs",
      },
      {
        src: "/beds/lukoshko3/Dogs-7254.jpg",
        alt: "Фото серого Лукошко Трио ракурс",
        name: "products/lukoshkoTrio-vic-96-lukoshko-xs",
      },
      {
        src: "/beds/lukoshko3/Dogs-7309.jpg",
        alt:
          "Фото розового Лукошко Трио с каплями на водонепроницаемой поверхности",
        name: "products/lukoshkoTrio-vic-96-lukoshko-xs",
      },
      {
        src: "/beds/lukoshko3/Dogs-24838.jpg",
        alt: "Фото спереди собачки в сером Лукошко Трио",
        name: "products/lukoshkoTrio-vic-96-lukoshko-xs",
      },
      {
        src: "/beds/lukoshko3/Dogs-24849.jpg",
        alt: "Фото спереди веселой собачки в сером Лукошко Трио",
        name: "products/lukoshkoTrio-vic-96-lukoshko-xs",
      },
      {
        src: "/beds/lukoshko3/Dogs-25105.jpg",
        alt: "Фото довольного мопса в сером Лукошко Трио",
        name: "products/lukoshkoTrio-vic-96-lukoshko-xs",
      },
      {
        src: "/beds/lukoshko3/Dogs-25115.jpg",
        alt: "Фото довольного мопса в сером Лукошко Трио",
        name: "products/lukoshkoTrio-vic-96-lukoshko-xs",
      },
      {
        src: "/beds/lukoshko3/Dogs-25127.jpg",
        alt: "Фото довольного мопса в сером Лукошко Трио",
        name: "products/lukoshkoTrio-vic-96-lukoshko-xs",
      },
      {
        src: "/beds/lukoshko3/Dogs-25142.jpg",
        alt: "Фото довольного мопса в сером Лукошко Трио",
        name: "products/lukoshkoTrio-vic-96-lukoshko-xs",
      },
    ],
  },
  {
    id: "tmpKvadro",
    name: kvadroSofts[0].name,
    displayName: `Квадро Soft`,
    description: "",
    price: min(kvadroSofts),
    images: [
      {
        src: "/beds/kvadro-soft/Dogs-7152 (1).jpg",
        alt: "Мопс зеленое квалро",
        name: "products/kvadroSoft-vic-70-kvadro-xs",
      },
      {
        src: "/beds/kvadro-soft/Dogs-7234.jpg",
        alt: "Зеленое квадро",
        name: "products/kvadroSoft-vic-70-kvadro-xs",
      },
      {
        src: "/beds/kvadro-soft/Dogs-7239.jpg",
        alt: "Зеленое квадро",
        name: "products/kvadroSoft-vic-70-kvadro-xs",
      },
      {
        src: "/beds/kvadro-soft/Dogs-7278.jpg",
        alt: "Зеленое квадро",
        name: "products/kvadroSoft-vic-70-kvadro-xs",
      },
    ],
  },
  {
    id: "tmpKvadroStrong",
    name: kvadroStrongs[0].name,
    displayName: `Квадро Стронг`,
    description: "",
    price: min(kvadroStrongs),
    images: [
      {
        src: "/beds/kvadro-strong/Dogs-24890.jpg",
        alt: "Собака прямо в Квадро стронг",
        name: "products/kvadroStrong-av-11-kvadro-xs",
      },
      {
        src: "/beds/kvadro-strong/Dogs-7248.jpg",
        alt: " Квадро стронг полностью",
        name: "products/kvadroStrong-av-11-kvadro-xs",
      },
      {
        src: "/beds/kvadro-strong/Dogs-7249.jpg",
        alt: "Этикетка в Квадро стронг",
        name: "products/kvadroStrong-av-11-kvadro-xs",
      },
      {
        src: "/beds/kvadro-strong/Dogs-7251.jpg",
        alt: "Подушка в Квадро стронг",
        name: "products/kvadroStrong-av-11-kvadro-xs",
      },
      {
        src: "/beds/kvadro-strong/Dogs-7326.jpg",
        alt: "Фото ткани в Квадро стронг",
        name: "products/kvadroStrong-av-11-kvadro-xs",
      },
      {
        src: "/beds/kvadro-strong/Dogs-7332.jpg",
        alt: "Фото ткани в Квадро стронг",
        name: "products/kvadroStrong-av-11-kvadro-xs",
      },
      {
        src: "/beds/kvadro-strong/Dogs-24875.jpg",
        alt: "Собака сверху в Квадро стронг",
        name: "products/kvadroStrong-av-11-kvadro-xs",
      },
    ],
  },
];