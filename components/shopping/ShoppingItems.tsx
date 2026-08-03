import ShoppingItemCard from "./ShoppingItemCard";
import { ShoppingItem } from "@/app/(protected)/shopping/[id]/page";

type Props = {
  items: ShoppingItem[];
  onToggle: (id: string) => void;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
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
          id={item.id}
          title={item.title}
          quantity={item.quantity}
          completed={item.completed}
          onToggle={() => onToggle(item.id)}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </section>
  );
}
