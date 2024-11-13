'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export const VALIDATION_OPTIONS = [
  { value: 'true', label: 'Valid' },
  { value: 'false', label: 'Invalid' }
];

export function useDNSTableFilters() {
  const [name, setName] = useQueryState(
    'name',
    searchParams.name
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [spfValid, setSpfValid] = useQueryState(
    'spfValid',
    searchParams.spfValid.withOptions({ shallow: false }).withDefault('')
  );

  const [dkimValid, setDkimValid] = useQueryState(
    'dkimValid',
    searchParams.dkimValid.withOptions({ shallow: false }).withDefault('')
  );

  const [dmarcValid, setDmarcValid] = useQueryState(
    'dmarcValid',
    searchParams.dmarcValid.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const [limit] = useQueryState(
    'limit',
    searchParams.limit.withDefault(10)
  );

  const resetFilters = useCallback(() => {
    setName(null);
    setSpfValid(null);
    setDkimValid(null);
    setDmarcValid(null);
    setPage(1);
  }, [setName, setSpfValid, setDkimValid, setDmarcValid, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!name || !!spfValid || !!dkimValid || !!dmarcValid;
  }, [name, spfValid, dkimValid, dmarcValid]);

  return {
    name,
    setName,
    spfValid,
    setSpfValid,
    dkimValid,
    setDkimValid,
    dmarcValid,
    setDmarcValid,
    page,
    setPage,
    limit,
    resetFilters,
    isAnyFilterActive
  };
}