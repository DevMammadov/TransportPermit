import { TCollapseCell } from "@/ui/shared/DataTable/TDataTable";
import ListItem from "@/ui/shared/ListItem";
import TableAction from "@/ui/shared/DataTable/TableAction";
import Transition from "@/ui/shared/Transition";

const CollapseCell = <T,>({
  columns,
  expand,
  data,
  containerRef,
}: TCollapseCell<T>) => {
  return (
    <Transition type="Collapse" show={expand}>
      <div className="px-4 flex flex-col gap-4 pt-3 pb-6">
        {columns.map((column) =>
          column.action ? (
            <TableAction
              containerRef={containerRef}
              key={column.title?.toString()}
            >
              {column.render?.(data)}
            </TableAction>
          ) : (
            <ListItem
              key={column.title?.toString()}
              value={column.render?.(data) || String(data[column.field])}
              label={column.title}
            />
          )
        )}
      </div>
    </Transition>
  );
};

export default CollapseCell;
