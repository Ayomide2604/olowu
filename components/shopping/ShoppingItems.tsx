import ShoppingItemCard from "./ShoppingItemCard";
import { ShoppingItem } from "@/app/shopping/[id]/page";

type Props = {
  items: ShoppingItem[];

  onToggle: (id: number) => void;

  onEdit: (item: ShoppingItem) => void;

  onDelete: (id: number) => void;
};

export default function ShoppingItems({
  items,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <section
      className="
space-y-4
"
    >
      {items.map((item) => (
        <ShoppingItemCard
          key={item.id}
          {...item}
          onToggle={() => onToggle(item.id)}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </section>
  );
}
