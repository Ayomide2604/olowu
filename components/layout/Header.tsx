import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header
      className="
flex
items-center
justify-between
px-5
pt-5
pb-3
"
    >
      <div className="flex items-center gap-3">
        <div
          className="
w-11
h-11
rounded-2xl
bg-purple-600
flex
items-center
justify-center
text-white
font-bold
"
        >
          OF
        </div>

        <div>
          <h1
            className="
font-bold
text-lg
"
          >
            Olowu Family
          </h1>

          <p
            className="
text-xs
text-gray-500
"
          >
            Family dashboard
          </p>
        </div>
      </div>

      <button
        className="
w-11
h-11
rounded-full
bg-white
shadow-sm
flex
items-center
justify-center
"
      >
        <Bell size={20} />
      </button>
    </header>
  );
}
