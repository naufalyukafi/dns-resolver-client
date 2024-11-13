import {
  createSearchParamsCache,
  createSerializer,
  parseAsBoolean,
  parseAsInteger,
  parseAsString
} from 'nuqs/server';

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString,
  name: parseAsString,
  spfValid: parseAsString,
  dkimValid: parseAsString,
  dmarcValid: parseAsString,
}
export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
