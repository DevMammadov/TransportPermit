import Button from "@/ui/shared/Button";
import { TPagination } from "./TPagination";
import Chevron from "@svg/chevron-down.svg?react";
import { twMerge } from "tailwind-merge";
import { useCallback } from "react";
import { range } from "./helpers";

const Pagination = ({ count, page, onChange, className }: TPagination) => {
  const setActive = useCallback(
    (selected: number) => (selected === page ? "bg-blue-50 text-blue-600 rounded-md border-none" : "border-none"),
    [page],
  );

  const middlePages = (() => {
    if (page <= 3) {
      return range(2, Math.min(5, count - 1));
    }

    if (page >= count - 2) {
      return range(Math.max(count - 4, 2), count - 1);
    }

    return [page - 1, page, page + 1];
  })();

  return (
    <div className={twMerge("flex", className)}>
      <Button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        variant="OUTLINED"
        className="aspect-square p-2 mr-2 rounded-md text-sm border-gray-200"
        icon={Chevron}
        classNames={{ icon: "rotate-90" }}
      >
        {/* Geri */}
      </Button>

      <Button
        onClick={() => onChange(1)}
        variant="OUTLINED"
        className={twMerge(
          "font-semibold text-sm py-2 px-3 aspect-square",
          setActive(1),
        )}
      >
        1
      </Button>
      {page > 3 && count > 5 && (
        <Button
          variant="OUTLINED"
          className="font-semibold text-sm py-2 px-3 aspect-square border-none hover:bg-transparent"
        >
          ...
        </Button>
      )}

      {middlePages.map((middlePage) => (
        <Button
          key={middlePage}
          onClick={() => onChange(middlePage)}
          variant="OUTLINED"
          className={twMerge(
            "font-semibold text-sm py-2 px-3 aspect-square",
            setActive(middlePage),
          )}
        >
          {middlePage}
        </Button>
      ))}
      
      {page < count - 2 && count > 5 && (
        <Button
          variant="OUTLINED"
          className="font-semibold text-sm py-2 px-3 aspect-square border-none hover:bg-transparent"
        >
          ...
        </Button>
      )}
      {count > 1 && (
        <Button
          onClick={() => onChange(count)}
          variant="OUTLINED"
          className={twMerge(
            "font-semibold text-sm py-2 px-3 aspect-square",
            setActive(count),
          )}
        >
          {count}
        </Button>
      )}

      <Button
        onClick={() => onChange(page + 1)}
        disabled={page === count}
        variant="OUTLINED"
        className="aspect-square p-2 ml-2 rounded-md text-sm border-gray-200"
        icon={Chevron}
        classNames={{ icon: "rotate-[-90deg]" }}
        iconPosition="end"
      >
        {/* Növbəti */}
      </Button>
    </div>
  );
};

export default Pagination;
