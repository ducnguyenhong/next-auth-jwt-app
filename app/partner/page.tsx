import { IdpLoginResponse } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Partner() {
  const store = cookies();
  const token = store.get("token");

  const resp = await fetch(`${process.env.NEXT_PUBLIC_IDP_URL}/profile`, {
    headers: {
      authorization: `Bearer ${token?.value}`,
    },
  });

  if (resp.status === 401) {
    redirect("/auth/login");
  }

  if (resp.status < 200 || resp.status >= 400) {
    const text = await resp.text();
    throw new Error(`Failed to fetch user profile: ${text}`);
  }

  const profile: IdpLoginResponse = await resp.json();

  if (profile.partners.length === 0) {
    redirect("/partner/apply");
  }

  return <div>partner</div>;
}
