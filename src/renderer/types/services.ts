export interface SERVICE_TYPE {
  id?: number;
  code: string;
  name: string;
  description: string;
  cost_price: string | number;
  price: string | number;
  is_active: string | boolean;
  created_at?: string;
  updated_at?: string;
}
