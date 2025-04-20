export interface ITEM_TYPE {
  id: string; // comes from API as string
  name: string;
  category_name: string;
  item_code: string;
  quantity: number;
  unit_of_measure_symbol: string;
  unit_of_measure_full_name: string;
  batch_selling_price: number;
  batch_cost_price: number;
  damage_quantity: number;
  discount_amount: number;
  warranty: string;
  expiry_date: any;
  images: any;
  is_active: any;
  // ...other fields if needed
}
