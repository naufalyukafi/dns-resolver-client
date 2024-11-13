import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import DNSTable from './dns-tables';

type DNSListingPage = {};

export default async function DNSListingPage({ }: DNSListingPage) {
  const page = searchParamsCache.get('page') || 1;
  const name = searchParamsCache.get('name');
  const spfValid = searchParamsCache.get('spfValid');
  const dkimValid = searchParamsCache.get('dkimValid');
  const dmarcValid = searchParamsCache.get('dmarcValid');
  const limit = searchParamsCache.get('limit') || '10';

  // Construct URL with query parameters
  const queryParams = new URLSearchParams();
  if (page) queryParams.append('page', page.toString());
  if (name) queryParams.append('name', name);
  if (spfValid) queryParams.append('spfValid', spfValid);
  if (dkimValid) queryParams.append('dkimValid', dkimValid);
  if (dmarcValid) queryParams.append('dmarcValid', dmarcValid);
  if (limit) queryParams.append('limit', limit.toString());

  const apiUrl = `${process.env.NEXT_PUBLIC_REST_API_URL}domains?${queryParams.toString()}`;

  const response = await fetch(apiUrl, {
    cache: 'no-store'
  });

  const dataDomains = await response.json();

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="DNS RESOLVER"
            description="Manage DNS RESOLVER"
          />
        </div>
        <Separator />
        <DNSTable data={dataDomains?.results} totalData={dataDomains?.totalResults} />
      </div>
    </PageContainer>
  );
}