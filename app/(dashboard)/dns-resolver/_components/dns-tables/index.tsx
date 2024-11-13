'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { DNSRecord } from '@/constants/data';
import { columns } from './columns';
import {
  VALIDATION_OPTIONS,
  useDNSTableFilters
} from './use-dns-table-filters';

export default function DNSTable({
  data,
  totalData
}: {
  data: DNSRecord[];
  totalData: number;
}) {
  const {
    name,
    setName,
    spfValid,
    setSpfValid,
    dkimValid,
    setDkimValid,
    dmarcValid,
    setDmarcValid,
    isAnyFilterActive,
    resetFilters,
    page,
    limit,
    setPage
  } = useDNSTableFilters();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={name}
          setSearchQuery={setName}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="spfValid"
          title="SPF Validation"
          options={VALIDATION_OPTIONS}
          setFilterValue={setSpfValid}
          filterValue={spfValid}
        />
        <DataTableFilterBox
          filterKey="dkimValid"
          title="DKIM Validation"
          options={VALIDATION_OPTIONS}
          setFilterValue={setDkimValid}
          filterValue={dkimValid}
        />
        <DataTableFilterBox
          filterKey="dmarcValid"
          title="DMARC Validation"
          options={VALIDATION_OPTIONS}
          setFilterValue={setDmarcValid}
          filterValue={dmarcValid}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable
        columns={columns}
        data={data}
        totalItems={totalData}
      />
    </div>
  );
}