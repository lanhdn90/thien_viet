export interface Account {
  username: string;
  password: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
}

export interface UserInfo {
  id: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  authority?: string;
  customer_id?: string;
  tenant_id?: string;
  email?: string;
  status?: "enabled" | "disable";
  created_ts?: number;
}
