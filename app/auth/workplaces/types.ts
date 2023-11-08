export interface PartnerTypeResponse {
  rows: PartnerType[];
  count: number;
}

export interface PartnersResponse {
  rows: Partner[];
  count: number;
}

export interface Partner {
  id: string;
  code: string;
  user_id: string;
  type_id: string;
  title: string;
  email: string;
  phone: string;
  domain: string;
  website?: string;
  country: string;
  city: string;
  address: string;
  extra?: Partial<Extra>;
  status: boolean;
  created_at: string;
  updated_at: string;
  PartnerType: PartnerType;
}

interface Extra {
  logo: string;
  cover: string;
}

export interface PartnerType {
  code: string;
  title: string;
  id: string;
  desc?: string | null;
  status?: boolean;
}
