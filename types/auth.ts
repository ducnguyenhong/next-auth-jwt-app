export interface IdpLoginResponse {
  token: string;
  partners: Partner[];
  working: any;
  user: User;
  roles: any;
}

export interface Partner {
  id: string;
  user_id: string;
  partner_id: string;
  branch_id: any;
  status: boolean;
  partner: PartnerPreview;
  role: Role;
}

export interface PartnerPreview {
  id: string;
  title: string;
  domain: string;
  extra?: Extra;
  status: boolean;
  partner_branches: PartnerBranch[];
}

export interface Extra {
  logo: string;
  cover: string;
}

export interface PartnerBranch {
  id: string;
  title: string;
  country: string;
  region: string;
  city: string;
  address: string;
  status: boolean;
}

export interface Role {
  id: string;
  title: string;
  status: boolean;
}

export interface User {
  id: string;
  partner_id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
  status: boolean;
  password: string;
}
