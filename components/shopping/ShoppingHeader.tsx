import { Plus } from "lucide-react";

type Props = {
  onAdd: () => void;
};

export default function ShoppingHeader({ onAdd }: Props) {
  return (
    <section
      className="
flex
justify-between
items-start
"
    >
      <div>
        <p
          className="
text-sm
text-gray-500
"
        >
          Family Shopping
        </p>

        <h1
          className="
text-3xl
font-bold
mt-1
"
        >
          Shopping
        </h1>

        <p
          className="
text-gray-500
mt-2
"
        >
          Manage your family shopping lists.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="
w-12
h-12
rounded-2xl
bg-purple-600
text-white
flex
items-center
justify-center
shadow-lg
shadow-purple-200
"
      >
        <Plus />
      </button>
    </section>
  );
}
