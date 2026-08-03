"use client";

type Props = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      px-5
      z-50
      "
    >
      <div
        className="
        bg-white
        w-full
        max-w-sm
        rounded-3xl
        p-6
        shadow-xl
        "
      >
        <h2
          className="
          text-xl
          font-bold
          "
        >
          {title}
        </h2>

        <p
          className="
          text-sm
          text-gray-500
          mt-2
          "
        >
          {message}
        </p>

        <div
          className="
          mt-6
          space-y-3
          "
        >
          <button
            onClick={onConfirm}
            className="
            w-full
            py-3
            rounded-2xl
            bg-red-600
            text-white
            font-medium
            "
          >
            {confirmText}
          </button>

          <button
            onClick={onCancel}
            className="
            w-full
            py-3
            rounded-2xl
            bg-gray-100
            "
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
