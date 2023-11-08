export interface SSCProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function buildUrl(
  baseUrl: string,
  searchParams: SSCProps["searchParams"]
) {
  const requestUrl = new URL(baseUrl);

  if (searchParams) {
    for (const key of Object.keys(searchParams)) {
      if (!searchParams[key]) {
        continue;
      }

      const values = searchParams[key];
      if (!values) {
        continue;
      }

      if (Array.isArray(values)) {
        for (const value of values) {
          requestUrl.searchParams.append(key, value);
        }
      } else {
        requestUrl.searchParams.append(key, values);
      }
    }
  }

  return requestUrl.toString();
}
