import React, { useState, useMemo, useCallback } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  Row,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Download, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Pin,
  Filter
} from 'lucide-react';
import { config } from '@/config';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  filterOptions?: {
    key: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
  enableSelection?: boolean;
  enableExport?: boolean;
  enableVirtualization?: boolean;
  pageSize?: number;
  onSelectionChange?: (selectedRows: TData[]) => void;
  onExport?: (data: TData[]) => void;
  className?: string;
  'aria-label'?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search...',
  filterOptions = [],
  enableSelection = false,
  enableExport = false,
  enableVirtualization = false,
  pageSize = 20,
  onSelectionChange,
  onExport,
  className,
  'aria-label': ariaLabel,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pinnedColumns, setPinnedColumns] = useState<string[]>([]);

  // Enhanced columns with selection and pinning
  const enhancedColumns = useMemo(() => {
    const baseColumns = [...columns];

    if (enableSelection) {
      baseColumns.unshift({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={`Select row ${row.index + 1}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    return baseColumns;
  }, [columns, enableSelection]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  // Handle selection changes
  React.useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, onSelectionChange, table]);

  // Export functionality
  const handleExport = useCallback(() => {
    if (onExport) {
      const filteredData = table.getFilteredRowModel().rows.map(row => row.original);
      onExport(filteredData);
    }
  }, [onExport, table]);

  // Pin/unpin columns
  const toggleColumnPin = useCallback((columnId: string) => {
    setPinnedColumns(prev => 
      prev.includes(columnId) 
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  }, []);

  // Virtualized row renderer
  const VirtualizedRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const row = table.getRowModel().rows[index];
    
    return (
      <div style={style}>
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          className="hover:bg-muted/50"
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell 
              key={cell.id}
              className={cn(
                "table-cell",
                pinnedColumns.includes(cell.column.id) && "sticky left-0 bg-background z-10"
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      </div>
    );
  };

  const shouldUseVirtualization = enableVirtualization && 
    data.length > config.ui.virtualizationThreshold;

  return (
    <div className={cn("space-y-4", className)} role="region" aria-label={ariaLabel}>
      {/* Controls Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          {searchKey && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="pl-10"
                aria-label={searchPlaceholder}
              />
            </div>
          )}

          {/* Filters */}
          {filterOptions.map((filter) => (
            <Select
              key={filter.key}
              value={(table.getColumn(filter.key)?.getFilterValue() as string) ?? 'all'}
              onValueChange={(value) =>
                table.getColumn(filter.key)?.setFilterValue(value === 'all' ? '' : value)
              }
            >
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter.label}</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {enableSelection && (
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected
            </div>
          )}
          
          {enableExport && (
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();
                  
                  return (
                    <TableHead 
                      key={header.id}
                      className={cn(
                        "table-header",
                        pinnedColumns.includes(header.column.id) && "sticky left-0 bg-muted z-20",
                        canSort && "cursor-pointer select-none"
                      )}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder ? null : (
                          <>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {canSort && (
                              <div className="flex flex-col">
                                {sortDirection === 'asc' && <ArrowUp className="h-3 w-3" />}
                                {sortDirection === 'desc' && <ArrowDown className="h-3 w-3" />}
                                {!sortDirection && <ArrowUpDown className="h-3 w-3 opacity-50" />}
                              </div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleColumnPin(header.column.id);
                              }}
                              title={`${pinnedColumns.includes(header.column.id) ? 'Unpin' : 'Pin'} column`}
                            >
                              <Pin className={cn(
                                "h-3 w-3",
                                pinnedColumns.includes(header.column.id) && "text-primary"
                              )} />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          
          <TableBody>
            {shouldUseVirtualization ? (
              <tr>
                <td colSpan={enhancedColumns.length} className="p-0 text-center py-4">
                  <div className="text-muted-foreground">
                    Virtualization temporarily disabled - showing standard table
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="hover:bg-muted/50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell 
                          key={cell.id}
                          className={cn(
                            "table-cell",
                            pinnedColumns.includes(cell.column.id) && "sticky left-0 bg-background z-10"
                          )}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={enhancedColumns.length} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} result(s)
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to next page"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}