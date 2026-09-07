
import Loader from "./Loader";
import EmptyState from "./EmptyState";

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyTitle = "No data found",
  emptyMessage = "There are no records to display.",
  onRowClick,
  rowKey = "id",
  className = "",
}) => {
  const getRowKey = (row, index) => {
    if (typeof rowKey === "function") {
      return rowKey(row, index);
    }

    return row?.[rowKey] ?? index;
  };

  const renderCell = (column, row, rowIndex) => {
    if (typeof column.render === "function") {
      return column.render(row, rowIndex);
    }

    if (column.accessor) {
      return row?.[column.accessor] ?? "—";
    }

    return "—";
  };

  const tableClassName = [
    "data-table",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (loading) {
    return (
      <div className="data-table__state">
        <Loader />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="data-table__state">
        <EmptyState
          title={emptyTitle}
          message={emptyMessage}
        />
      </div>
    );
  }

  return (
    <div className="data-table__wrapper">
      <table className={tableClassName}>
        <thead className="data-table__head">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key || column.accessor}
                className={column.headerClassName || ""}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="data-table__body">
          {data.map((row, rowIndex) => (
            <tr
              key={getRowKey(row, rowIndex)}
              className={
                onRowClick
                  ? "data-table__row data-table__row--clickable"
                  : "data-table__row"
              }
              onClick={() => onRowClick?.(row, rowIndex)}
            >
              {columns.map((column) => (
                <td
                  key={column.key || column.accessor}
                  className={column.cellClassName || ""}
                >
                  {renderCell(column, row, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
