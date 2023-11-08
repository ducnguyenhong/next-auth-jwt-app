import { SSCProps, buildUrl } from "@/types/ssc";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

interface RequestOption {
  baseUrl: string;
  searchParams: SSCProps["searchParams"];
}

export async function request<T>(
  url: string,
  options?: Partial<RequestOption>
): Promise<T> {
  if (typeof window !== "undefined") {
    throw new Error("request is only available on server side");
  }

  const token = cookies().get("token")?.value;

  let requestUrl = url;
  if (!url.startsWith("http")) {
    requestUrl = `${process.env.NEXT_API_DOMAIN}${url}`;
  }

  requestUrl = buildUrl(requestUrl, options?.searchParams ?? {});

  const reqOptions: RequestInit = {};
  if (token && token.length > 0) {
    reqOptions.headers = {
      ...reqOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const resp = await fetch(requestUrl, reqOptions);
  if (!resp.ok) {
    if (resp.status === 401) {
      redirect("/auth/login", RedirectType.replace);
    }

    throw new Error("Failed to fetch partners");
  }

  const result: T = await resp.json();

  return result;
}
