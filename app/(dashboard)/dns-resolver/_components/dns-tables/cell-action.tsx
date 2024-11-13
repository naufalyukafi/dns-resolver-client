'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Eye, XCircle } from 'lucide-react';
import { useState } from 'react';

interface CellActionProps {
  data: {
    id: string;
    name: string;
    spf: { valid: boolean; record: string[] | null };
    dkim: { valid: boolean; record: string[] | null };
    dmarc: { valid: boolean; record: string[] | null };
    createdAt: string;
    updatedAt: string;
  };
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [detailOpen, setDetailOpen] = useState(false);

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

  const renderRecordDetails = (record: string[] | null) => {
    return record ? (
      <div className="mt-2 p-2 bg-muted rounded-md">
        <code className="text-sm break-all">{record.join(', ')}</code>
      </div>
    ) : (
      <p className="text-muted-foreground mt-2">No record available</p>
    );
  };

  const renderDNSSection = (title: string, valid: boolean, record: string[] | null, description: string) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">
        {title} {renderStatus(valid)}
      </h3>
      <p className="mb-2">{description}</p>
      {renderRecordDetails(record)}
    </div>
  );

  return (
    <>
      <Modal
        title="DNS Details"
        description={`Details for ${data.name}`}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
      >
        <Card>
          <CardContent className="pt-6">
            {renderDNSSection(
              'SPF',
              data.spf.valid,
              data.spf.record,
              'Sender Policy Framework (SPF) helps prevent email spoofing.'
            )}
            <Separator className="my-4" />
            {renderDNSSection(
              'DKIM',
              data.dkim.valid,
              data.dkim.record,
              'DomainKeys Identified Mail (DKIM) provides email authentication.'
            )}
            <Separator className="my-4" />
            {renderDNSSection(
              'DMARC',
              data.dmarc.valid,
              data.dmarc.record,
              'Domain-based Message Authentication, Reporting & Conformance (DMARC) helps prevent email abuse.'
            )}
          </CardContent>
        </Card>
      </Modal>

      <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setDetailOpen(true)}>
        <Eye className="h-4 w-4" />
      </Button>
    </>
  );
};