'use client';
import { DNSRecord, } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

const renderStatus = (isValid: boolean) => {
  return isValid ? (
    <Badge variant="success" className="ml-2 bg-green-400 text-white px-4 py-2">
      <CheckCircle2 className="w-4 h-4 mr-1" />
      Valid
    </Badge>
  ) : (
    <Badge variant="destructive" className="ml-2 px-4 py-2">
      <XCircle className="w-4 h-4 mr-1" />
      Invalid
    </Badge>
  );
};


export const columns: ColumnDef<DNSRecord>[] = [
  {
    accessorKey: 'name',
    header: 'Domain Name'
  },
  {
    accessorKey: 'spf.valid',
    header: 'SPF Valid',
    cell: ({ row }) => renderStatus(row.original.spf.valid),
  },
  {
    accessorKey: 'dkim.valid',
    header: 'DKIM Valid',
    cell: ({ row }) => renderStatus(row.original.dkim.valid),

  },
  {
    accessorKey: 'dmarc.valid',
    header: 'DMARC Valid',
    cell: ({ row }) => renderStatus(row.original.dmarc.valid),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];