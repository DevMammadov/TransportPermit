import Arrow from "@/data/assets/vectors/arrow.svg?react";
import { Fragment, useMemo } from "react";
import { Link, UIMatch, useMatches, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { TBreadcrump, TCustomRouteHandle } from "./TBradcrump";

export const Breadcrump = ({ className }: TBreadcrump) => {
  // Properly type the useMatches hook
  const matches = useMatches() as UIMatch<unknown, TCustomRouteHandle>[];
  const params = useParams(); // Fetch current URL parameters to resolve wizard steps

  const { breadcrumpList, pageTitle } = useMemo(() => {
    // 1. Filter out routes without breadcrumbs AND filter out dynamic route variables (containing ":")
    const validMatches = matches.filter((match) => {
      const hasBreadcrumb = Boolean(match.handle?.breadcrumb);

      // match.id contains the raw route template string (e.g., "routes/permissions/:id")
      const routePattern = match.id || "";
      const isDynamicParam = routePattern.includes(":");

      // New change: If breadcrumb is explicitly defined as a function, allow dynamic routing patterns to pass through
      const isFunctionCrumb = typeof match.handle?.breadcrumb === "function";

      return hasBreadcrumb && (!isDynamicParam || isFunctionCrumb);
    });

    // 2. Map safe items with their URL paths and text labels
    const trail: { label: string; path: string }[] = [];

    validMatches.forEach((match) => {
      // New change: Resolve the breadcrumb text whether it is a static string or an evaluator function
      const resolvedLabel =
        typeof match.handle!.breadcrumb === "function"
          ? match.handle!.breadcrumb(match)
          : match.handle!.breadcrumb;

      trail.push({
        label: resolvedLabel,
        path: match.pathname,
      });

      // Inject sub-steps (e.g., "Addım 1", "Addım 2") dynamically if dynamicCrumb helper exists in route handle
      if (match.handle?.dynamicCrumb) {
        const extraCrumb = match.handle.dynamicCrumb(params);
        if (extraCrumb) {
          trail.push({
            label: extraCrumb,
            path: match.pathname,
          });
        }
      }
    });

    // 3. Extract the last valid route details for the main <h1> header title
    const currentRoute = validMatches[validMatches.length - 1];
    const currentHandle = currentRoute?.handle;

    // New change: Safely compute the pageTitle heading supporting both strings and function configurations
    let title = "";
    if (currentHandle) {
      const targetField = currentHandle.title || currentHandle.breadcrumb;
      title =
        typeof targetField === "function"
          ? targetField(currentRoute)
          : targetField || "";
    }

    return {
      breadcrumpList: trail,
      pageTitle: title,
    };
  }, [matches, params]);

  return (
    <div className={twMerge("flex flex-col justify-center", className)}>
      <h1 className="text-2xl font-bold text-md">{pageTitle}</h1>

      <nav
        aria-label="Breadcrumb"
        className="text-sm text-gray-500 items-center hidden lg:flex mt-1"
      >
        {breadcrumpList.map((crumb, i) => (
          <Fragment key={`${crumb.label}-${i}`}>
            {i === 0 ? (
              <span>{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className={twMerge(
                  "transition-colors duration-150",
                  // Only the very last item becomes blue and unclickable, others remain gray
                  i === breadcrumpList.length - 1
                    ? "text-blue-500 pointer-events-none font-medium"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                {crumb.label}
              </Link>
            )}

            {i !== breadcrumpList.length - 1 && (
              <Arrow className="stroke-gray-500 stroke-1 rotate-180 inline h-2 w-2 mx-2 shrink-0" />
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrump;
