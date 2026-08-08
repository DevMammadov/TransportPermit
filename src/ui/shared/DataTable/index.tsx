import { useMedia } from "@/app/hooks/useMedia";
import Button from "@/ui/shared/Button";
import CollapseCell from "@/ui/shared/DataTable/CollapseCell";
import { StatusCell } from "@/ui/shared/DataTable/StatusCell";
import TableAction from "@/ui/shared/DataTable/TableAction";
import Pagination from "@/ui/shared/Pagination";
import Select from "@/ui/shared/Select";
import Spinner from "@/ui/shared/Spinner";
import ChevronDownIcon from "@svg/chevron-down.svg?react";
import DownloadFileIcon from "@svg/download.svg?react";
import {
  Fragment,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { TColumn, TDataTable } from "./TDataTable";

const DataTable = <T, S>({
  data = [],
  columns,
  title,
  count = 0,
  stripped = true,
  showCount = true,
  unit,
  onPageChange,
  currentPage,
  className,
  pageSize = 5,
  onPageSizeChange,
  mobileVisibleFields,
  loading,
  onExport,
  exportLoading,
  collapsible = false,
  subColumns = [],
  subItemsKey,
  isHeightFixed = true,
  actions,
  onRowExpand,
  loadingSubRows,
}: TDataTable<T, S>) => {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const headRef = useRef<HTMLTableSectionElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMedia();
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [bodyHeight, setBodyHeight] = useState<number | string>("auto");

  const { tableColumns, expandColumns } = useMemo(() => {
    const _mobileVisibleFields = mobileVisibleFields?.length
      ? mobileVisibleFields
      : [columns[0].field];
    const mobileColumns = columns.filter(
      (c) => _mobileVisibleFields.includes(c.field) && c.show !== "DESKTOP",
    );
    const desktopColumns = columns.filter((c) => c.show !== "MOBILE");

    return {
      tableColumns: isMobile ? mobileColumns : desktopColumns,
      expandColumns: columns.filter(
        (c) => !_mobileVisibleFields.includes(c.field) && c.show !== "DESKTOP",
      ),
    };
  }, [columns, isMobile, mobileVisibleFields]);

  useEffect(() => {
    if (!isHeightFixed) {
      setBodyHeight("auto");
      return;
    }

    if (rowRef.current && headRef.current) {
      setBodyHeight(
        rowRef.current.clientHeight * pageSize + headRef.current.clientHeight,
      );
    } else {
      setBodyHeight(70);
    }
  }, [pageSize, data, isHeightFixed]);

  const handleRowCollapse = (item: T, index: number) => {
    if (!expandedRows.includes(index)) {
      setExpandedRows([...expandedRows, index]);
      onRowExpand?.(item, index);
    } else {
      setExpandedRows(expandedRows.filter((c) => c !== index));
    }
  };

  const getCellContent = (column: TColumn<any>, item: any) => {
    if (column.action) {
      return (
        <TableAction
          containerRef={tableContainerRef}
          disabled={column.actionDisabled?.(item)}
        >
          {column.render?.(item) as ReactNode}
        </TableAction>
      );
    } else if (column.renderStatus) {
      return <StatusCell status={column.renderStatus(item)} />;
    } else {
      return column.render?.(item) || String(item[column.field] ?? "");
    }
  };

  return (
    <div className={twMerge("flex flex-col items-center gap-5", className)}>
      <div className="flex flex-col border border-gray-100 rounded-lg w-full p-3">
        {title && (
          <div className="p-3 mb-2 rounded-tl-lg rounded-tr-lg flex justify-between items-center">
            <div className="flex items-center justify-center">
              <span className="text-xl font-bold text-gray-900">{title}</span>
              {showCount && (
                <span className="rounded-lg text-xs px-2 py-0.5 pt-1 shrink-0 bg-blue-50 border border-blue-200 text-blue-600 ml-4 text-nowrap">
                  {count} {unit || ""}
                </span>
              )}
            </div>
            {onExport && (
              <Button
                variant="TRANSPARENT"
                onClick={onExport}
                icon={DownloadFileIcon}
                loading={exportLoading}
              >
                Excel Fayl
              </Button>
            )}
            {actions}
          </div>
        )}
        <div
          className={twMerge(
            "rounded-lg h-full overflow-auto relative",
            isMobile && "no-scrollbar",
          )}
          ref={tableContainerRef}
          style={{ height: isMobile ? "auto" : bodyHeight }}
        >
          {loading && (
            <div className="absolute h-full w-full flex-center bg-transparent-500">
              <Spinner size="md" />
            </div>
          )}
          <table className="text-xl w-full">
            <thead ref={headRef} className="bg-gray-50">
              <tr>
                {tableColumns.map(
                  (column) =>
                    !column.hidden && (
                      <th
                        key={String(column.title)}
                        className={twMerge(
                          "p-4 font-semibold text-gray-600 text-xs text-left",
                          column.className,
                        )}
                      >
                        {column.title}
                      </th>
                    ),
                )}
                {(isMobile || (!isMobile && collapsible)) && (
                  <th className="w-10"></th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const isRowExpanded = expandedRows.includes(index);

                const subItems = subItemsKey
                  ? (item[subItemsKey] as unknown as S[])
                  : [];

                const isClickable = isMobile || (collapsible && !!subItemsKey);

                const shouldShowIcon =
                  isMobile || (collapsible && !!subItemsKey);

                return (
                  <Fragment key={index}>
                    <tr
                      className={twMerge(
                        stripped && "odd:bg-gray-25",
                        isClickable &&
                          "cursor-pointer hover:bg-gray-50/50 transition-colors ",
                      )}
                      onClick={() =>
                        isClickable && handleRowCollapse(item, index)
                      }
                      ref={index === 0 ? rowRef : null}
                    >
                      {tableColumns.map(
                        (column) =>
                          !column.hidden && (
                            <td
                              key={column.title}
                              className={twMerge(
                                "px-4 py-5 border-b border-b-gray-100 text-gray-900 text-sm font-medium",
                                data.length >= pageSize &&
                                  index === data.length - 1 &&
                                  "first:rounded-bl-lg last:rounded-br-lg border-none",
                                column.className,
                              )}
                              style={column.style}
                            >
                              {getCellContent(column, item)}
                            </td>
                          ),
                      )}

                      {(isMobile || (!isMobile && collapsible)) && (
                        <td
                          className={twMerge(
                            "p-4 border-b border-b-gray-100 text-right",
                            index === data.length - 1 && "border-none",
                          )}
                        >
                          {shouldShowIcon ? (
                            <ChevronDownIcon
                              className={twMerge(
                                isRowExpanded && "rotate-180",
                                "transition-all stroke-gray-500 inline-block w-5 h-5",
                              )}
                            />
                          ) : null}
                        </td>
                      )}
                    </tr>

                    {isMobile && isRowExpanded && (
                      <tr>
                        <td colSpan={tableColumns.length + 1}>
                          <CollapseCell
                            columns={expandColumns}
                            expand={isRowExpanded}
                            data={item}
                            containerRef={tableContainerRef}
                          />
                        </td>
                      </tr>
                    )}

                    {!isMobile && collapsible && isRowExpanded && (
                      <tr className="">
                        <td
                          colSpan={tableColumns.length + 1}
                          className="rounded-md"
                        >
                          <div className="p-2 border border-gray-100 rounded-md bg-white">
                            {loadingSubRows?.includes(index) ? (
                              <div className="flex-center h-10">
                                <Spinner size="sm" />
                              </div>
                            ) : subItems.length > 0 ? (
                              <table className="w-full text-left text-xs text-gray-500 rounded-md overflow-hidden">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                  <tr>
                                    {subColumns.map(
                                      (subCol) =>
                                        !subCol.hidden && (
                                          <th
                                            key={subCol.title}
                                            className={twMerge(
                                              "p-4 font-semibold text-gray-600 text-xs",
                                              subCol.className,
                                            )}
                                          >
                                            {subCol.title}
                                          </th>
                                        ),
                                    )}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-900 font-medium">
                                  {subItems.map((subItem, subIndex) => (
                                    <tr
                                      key={subIndex}
                                      className="hover:bg-gray-50/50"
                                    >
                                      {subColumns.map(
                                        (subCol) =>
                                          !subCol.hidden && (
                                            <td
                                              key={subCol.title}
                                              className={twMerge(
                                                "py-5 px-4 text-sm font-medium",
                                                subCol.className,
                                              )}
                                              style={subCol.style}
                                            >
                                              {getCellContent(subCol, subItem)}
                                            </td>
                                          ),
                                      )}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <div className="text-center text-gray-500 text-sm py-4">
                                Məlumat tapılmadı
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* {data.length > 0 && (
        <Pagination
          count={Math.ceil(count / pageSize)}
          page={currentPage}
          onChange={onPageChange}
        />
      )} */}
      {data.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full px-2 mt-4">
          <Pagination
            count={Math.ceil(count / pageSize)}
            page={currentPage}
            onChange={onPageChange}
          />

          {onPageSizeChange && (
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium max-sm:w-full max-sm:justify-between">
              <span>
                {count} müraciətdən {Math.min(pageSize, data.length)} ədəd
                göstər
              </span>

              <Select<number>
                data={[5, 10]}
                value={pageSize}
                onChange={(val) => onPageSizeChange(Number(val))}
                optionLabel={(d) => String(d)}
                optionValue={(d) => d}
                labelPosition="outside"
                className="w-20 -mb-3"
                classNames={{
                  input:
                    "h-9 py-1 px-3 bg-white rounded-md border-gray-200 text-sm font-semibold text-gray-900 justify-between",
                  option: "py-1.5 pl-3 text-sm",
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataTable;
