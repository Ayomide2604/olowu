type Props = {
  filters: string[];
  activeFilter: string;
  onChange: (filter: string) => void;
};

export default function EventFilters({
  filters,
  activeFilter,
  onChange,
}: Props) {
  return (
    <div
      className="
      flex
      gap-3
      overflow-x-auto
      pb-2
      scrollbar-hide
      "
    >
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`
          whitespace-nowrap
          px-5
          py-2.5
          rounded-full
          text-sm
          font-medium
          transition-all
          duration-200


          ${
            activeFilter === filter
              ? "bg-purple-600 text-white shadow-md shadow-purple-200"
              : "bg-white text-gray-600 border border-gray-100"
          }

          `}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
