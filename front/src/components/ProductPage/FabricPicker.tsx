import { Fabric } from "apis/catalog";
import React from "react";
import Image from "next/image";
import Typography from "@material-ui/core/Typography";
import Picker from "./Picker";

function Icon({ item: fabric }: { item: Fabric }) {
  return (
    <Image width={24} height={24} src={fabric.imageSrc} alt={fabric.imageAlt} />
  );
}

export default function FabricPicker({
  selected,
  fabrics,
}: {
  selected: Fabric;
  fabrics: (Fabric & { href: string })[];
}) {
  return (
    <div>
      <Typography gutterBottom variant="subtitle2" component="h3">
        Цвет - {selected.displayName}
      </Typography>
      <Picker
        selectedId={selected.id}
        items={fabrics.sort((a, b) => a.id.localeCompare(b.id))}
        icon={Icon}
      />
    </div>
  );
}