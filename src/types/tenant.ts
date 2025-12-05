export interface TenantFormData {
  applicant_id: string;
  name: string;
  age: number;
  employment_status: 'employed' | 'self-employed' | 'unemployed';
  monthly_income: number;
  employment_verified: boolean;
  income_verified: boolean;
  credit_score: number;
  previous_evictions: number;
  rental_history_years: number;
  on_time_payments_percent: number;
  late_payments_count: number;
  monthly_rent: number;
  security_deposit: number;
  lease_term_months: number;
  bedrooms: number;
  property_type: 'apartment' | 'house' | 'condo' | 'townhouse';
  location: string;
  market_median_rent: number;
  local_unemployment_rate: number;
  inflation_rate: number;
}

export interface RiskScoreResponse {
  success: boolean;
  applicant_id: string;
  risk_score: number;
  risk_category: 'LOW' | 'MEDIUM' | 'HIGH';
  default_probability: number;
  recommendation: string;
  confidence: number;
  reasoning: string;
}

export const defaultFormData: TenantFormData = {
  applicant_id: '',
  name: '',
  age: 30,
  employment_status: 'employed',
  monthly_income: 0,
  employment_verified: false,
  income_verified: false,
  credit_score: 650,
  previous_evictions: 0,
  rental_history_years: 0,
  on_time_payments_percent: 100,
  late_payments_count: 0,
  monthly_rent: 0,
  security_deposit: 0,
  lease_term_months: 12,
  bedrooms: 1,
  property_type: 'apartment',
  location: '',
  market_median_rent: 0,
  local_unemployment_rate: 5.0,
  inflation_rate: 3.0,
};
