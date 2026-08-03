type Props = {
    onClose: () => void;

    onDelete: () => void;
};

export default function DeleteTakModal({ onClose, onDelete }: Props) {
    return (
        <div
            className="
fixed
inset-0
bg-black/30
flex
items-center
justify-center
px-5
"
        >
            <div
                className="
bg-white
rounded-3xl
p-6
max-w-sm
w-full
"
            >
                <h2
                    className="
font-bold
text-lg
"
                >
                    Delete Task?
                </h2>

                <p
                    className="
text-gray-500
mt-2
"
                >
                    This task will be permanently removed.
                </p>

                <div
                    className="
flex
gap-3
mt-6
"
                >
                    <button
                        onClick={onClose}
                        className="
flex-1
py-3
rounded-xl
bg-gray-100
"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        className="
flex-1
py-3
rounded-xl
bg-red-500
text-white
"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
