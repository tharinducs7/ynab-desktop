/**
 * Represents a customer record in the system.
 */
export interface SUPPLIER_TYPE {
  /** Full name of the customer */
  name: string;
  /** City where the customer is located */
  city: string;
  /** Current credit balance (in LKR) */
  debit_balance: number;
  /** Contact email */
  email: string;
  /** Contact mobile number */
  mobile_number: string;

  registration_no: string;
  /** Optional notes about the customer */
  remarks?: string;
  /** Whether the customer is active (true) or inactive (false) */
  is_active: boolean;
}
