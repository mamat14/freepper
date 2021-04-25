import { Size } from "@mamat14/shop-server/shop_model";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import Picker from "./Picker";

export default function SizePicker({
  selected,
  sizes,
}: {
  selected: Size;
  sizes: (Size & { href: string })[];
}) {
  return (
    <div>
      <Typography gutterBottom variant="subtitle2" component="h3">
        Размер - {selected.description}
      </Typography>
      <Picker
        selectedId={selected.id}
        items={sizes.sort((a, b) => a.weight - b.weight)}
      />
    </div>
  );
}
