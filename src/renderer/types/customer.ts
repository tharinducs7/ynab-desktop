/**
 * Represents a customer record in the system.
 */
export interface CUSTOMER_TYPE {
  /** Full name of the customer */
  name: string;
  /** City where the customer is located */
  city: string;
  /** Current credit balance (in LKR) */
  credit_balance: number;
  /** Total amount of cheques pending clearance */
  pending_cheque_balance: number;
  /** Maximum credit limit allowed for the customer */
  credit_limit: number;
  /** Contact email */
  email: string;
  /** Contact mobile number */
  mobile_number: string;
  /** Amount due from returned cheques */
  return_cheque_balance: number;
  /** Optional notes about the customer */
  notes?: string;
  /** Whether the customer is active (true) or inactive (false) */
  is_active: boolean;
}
