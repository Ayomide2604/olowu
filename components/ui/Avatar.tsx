type Props = {
  name: string;
  image?: string;
};

export default function Avatar({ name, image }: Props) {
  return (
    <div
      className="
w-12
h-12
rounded-full
bg-gradient-to-br
from-purple-500
to-indigo-500
flex
items-center
justify-center
text-white
font-semibold
overflow-hidden
"
    >
      {image ? (
        <img src={image} className="w-full h-full object-cover" />
      ) : (
        name.charAt(0)
      )}
    </div>
  );
}
