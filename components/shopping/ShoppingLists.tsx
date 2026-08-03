import ShoppingListCard from "./ShoppingListCard";
import { ShoppingList } from "@/app/(protected)/shopping/page";

type Props = {
  lists: ShoppingList[];

  onEdit: (list: ShoppingList) => void;

  onDelete: (list: ShoppingList) => void;
};

export default function ShoppingLists({ lists, onEdit, onDelete }: Props) {
  return (
    <section className="space-y-4">
      <h2
        className="
font-semibold
text-lg
"
      >
        Your Lists
      </h2>

      {lists.map((list) => (
        <ShoppingListCard
          key={list.id}
          {...list}
          onEdit={() => onEdit(list)}
          onDelete={() => onDelete(list)}
        />
      ))}
    </section>
  );
}
