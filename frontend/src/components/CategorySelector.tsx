import type { Category } from "../types/category.types";

interface CategorySelectorProps {
  categories: Category[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const CategorySelector = ({
  categories,
  selected,
  onChange,
}: CategorySelectorProps) => {
  const handleToggle = (categoryId: string) => {
    onChange(
      selected.includes(categoryId)
        ? selected.filter((id) => id !== categoryId)
        : [...selected, categoryId]
    );
  };

  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body p-5">
        <h3 className="card-title text-base flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          Categories
          {selected.length > 0 && (
            <span className="badge badge-sm badge-primary ml-auto">
              {selected.length} selected
            </span>
          )}
        </h3>
        <div className="flex flex-wrap gap-2 mt-3">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat._id}
              onClick={() => handleToggle(cat._id)}
              className={`badge badge-lg cursor-pointer transition-all hover:scale-105 ${selected.includes(cat._id)
                  ? "badge-primary"
                  : "badge-ghost hover:badge-outline"
                }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};