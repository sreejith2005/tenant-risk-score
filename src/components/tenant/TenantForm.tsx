import { useState, useEffect } from 'react';
import { TenantFormData, defaultFormData } from '@/types/tenant';
import { FormSection } from './FormSection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Briefcase,
  CreditCard,
  Home,
  TrendingUp,
  Loader2,
} from 'lucide-react';

interface TenantFormProps {
  onSubmit: (data: TenantFormData) => void;
  isLoading: boolean;
}

export function TenantForm({ onSubmit, isLoading }: TenantFormProps) {
  const [formData, setFormData] = useState<TenantFormData>(defaultFormData);

  useEffect(() => {
    // Auto-generate applicant_id on mount
    setFormData(prev => ({
      ...prev,
      applicant_id: `APP-${Date.now()}`
    }));
  }, []);

  const handleChange = (field: keyof TenantFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <FormSection title="Personal Information" icon={<User className="w-5 h-5" />}>
        <div className="sm:col-span-2">
          <Label htmlFor="applicant_id">Applicant ID</Label>
          <Input
            id="applicant_id"
            value={formData.applicant_id}
            readOnly
            className="bg-muted/50 font-mono text-sm"
          />
        </div>
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            min={18}
            max={120}
            value={formData.age}
            onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
            required
          />
        </div>
      </FormSection>

      {/* Employment & Income */}
      <FormSection title="Employment & Income" icon={<Briefcase className="w-5 h-5" />}>
        <div>
          <Label htmlFor="employment_status">Employment Status</Label>
          <Select
            value={formData.employment_status}
            onValueChange={(value) => handleChange('employment_status', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">Employed</SelectItem>
              <SelectItem value="self-employed">Self-Employed</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="monthly_income">Monthly Income ($) *</Label>
          <Input
            id="monthly_income"
            type="number"
            min={0}
            value={formData.monthly_income}
            onChange={(e) => handleChange('monthly_income', parseFloat(e.target.value) || 0)}
            required
            placeholder="5000"
          />
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            id="employment_verified"
            checked={formData.employment_verified}
            onCheckedChange={(checked) => handleChange('employment_verified', checked === true)}
          />
          <Label htmlFor="employment_verified" className="cursor-pointer">
            Employment Verified
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            id="income_verified"
            checked={formData.income_verified}
            onCheckedChange={(checked) => handleChange('income_verified', checked === true)}
          />
          <Label htmlFor="income_verified" className="cursor-pointer">
            Income Verified
          </Label>
        </div>
      </FormSection>

      {/* Credit & Payment History */}
      <FormSection title="Credit & Payment History" icon={<CreditCard className="w-5 h-5" />}>
        <div>
          <Label htmlFor="credit_score">Credit Score (300-850) *</Label>
          <Input
            id="credit_score"
            type="number"
            min={300}
            max={850}
            value={formData.credit_score}
            onChange={(e) => handleChange('credit_score', parseInt(e.target.value) || 300)}
            required
          />
        </div>
        <div>
          <Label htmlFor="previous_evictions">Previous Evictions</Label>
          <Input
            id="previous_evictions"
            type="number"
            min={0}
            value={formData.previous_evictions}
            onChange={(e) => handleChange('previous_evictions', parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="rental_history_years">Rental History (Years) *</Label>
          <Input
            id="rental_history_years"
            type="number"
            min={0}
            value={formData.rental_history_years}
            onChange={(e) => handleChange('rental_history_years', parseFloat(e.target.value) || 0)}
            required
          />
        </div>
        <div>
          <Label htmlFor="on_time_payments_percent">On-Time Payments (%)</Label>
          <Input
            id="on_time_payments_percent"
            type="number"
            min={0}
            max={100}
            value={formData.on_time_payments_percent}
            onChange={(e) => handleChange('on_time_payments_percent', parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="late_payments_count">Late Payments Count</Label>
          <Input
            id="late_payments_count"
            type="number"
            min={0}
            value={formData.late_payments_count}
            onChange={(e) => handleChange('late_payments_count', parseInt(e.target.value) || 0)}
          />
        </div>
      </FormSection>

      {/* Property Details */}
      <FormSection title="Property Details" icon={<Home className="w-5 h-5" />}>
        <div>
          <Label htmlFor="monthly_rent">Monthly Rent ($) *</Label>
          <Input
            id="monthly_rent"
            type="number"
            min={0}
            value={formData.monthly_rent}
            onChange={(e) => handleChange('monthly_rent', parseFloat(e.target.value) || 0)}
            required
            placeholder="2000"
          />
        </div>
        <div>
          <Label htmlFor="security_deposit">Security Deposit ($)</Label>
          <Input
            id="security_deposit"
            type="number"
            min={0}
            value={formData.security_deposit}
            onChange={(e) => handleChange('security_deposit', parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="lease_term_months">Lease Term</Label>
          <Select
            value={formData.lease_term_months.toString()}
            onValueChange={(value) => handleChange('lease_term_months', parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6 Months</SelectItem>
              <SelectItem value="12">12 Months</SelectItem>
              <SelectItem value="24">24 Months</SelectItem>
              <SelectItem value="36">36 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select
            value={formData.bedrooms.toString()}
            onValueChange={(value) => handleChange('bedrooms', parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3">3 Bedrooms</SelectItem>
              <SelectItem value="4">4 Bedrooms</SelectItem>
              <SelectItem value="5">5 Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="property_type">Property Type</Label>
          <Select
            value={formData.property_type}
            onValueChange={(value) => handleChange('property_type', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, State"
          />
        </div>
      </FormSection>

      {/* Market Context */}
      <FormSection title="Market Context" icon={<TrendingUp className="w-5 h-5" />}>
        <div>
          <Label htmlFor="market_median_rent">Market Median Rent ($)</Label>
          <Input
            id="market_median_rent"
            type="number"
            min={0}
            value={formData.market_median_rent}
            onChange={(e) => handleChange('market_median_rent', parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="local_unemployment_rate">Local Unemployment Rate (%)</Label>
          <Input
            id="local_unemployment_rate"
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={formData.local_unemployment_rate}
            onChange={(e) => handleChange('local_unemployment_rate', parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="inflation_rate">Inflation Rate (%)</Label>
          <Input
            id="inflation_rate"
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={formData.inflation_rate}
            onChange={(e) => handleChange('inflation_rate', parseFloat(e.target.value) || 0)}
          />
        </div>
      </FormSection>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Analyzing Risk...
          </>
        ) : (
          'Calculate Risk Score'
        )}
      </Button>
    </form>
  );
}
