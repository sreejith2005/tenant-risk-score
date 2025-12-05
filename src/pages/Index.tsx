import { useState } from 'react';
import { TenantForm } from '@/components/tenant/TenantForm';
import { RiskScoreDisplay } from '@/components/tenant/RiskScoreDisplay';
import { TenantFormData, RiskScoreResponse } from '@/types/tenant';
import { Card } from '@/components/ui/card';
import { Shield, FileCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RiskScoreResponse | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (data: TenantFormData) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('https://88c2b9794cf8.ngrok-free.app/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const resultData: RiskScoreResponse = await response.json();
      setResult(resultData);
      
      toast({
        title: 'Risk Assessment Complete',
        description: `Score: ${resultData.risk_score} - ${resultData.risk_category} Risk`,
      });
    } catch (error) {
      console.error('Error calculating risk:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast({
          title: 'Connection Error',
          description: 'Unable to connect to the scoring server. Please ensure the API is running.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to calculate risk score',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero text-primary-foreground py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Tenant Risk Scoring</h1>
          </div>
          <p className="text-primary-foreground/80 max-w-2xl">
            AI-powered risk assessment for tenant applications. Get instant insights into applicant reliability and payment potential.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div>
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-2 mb-6">
                <FileCheck className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Application Details</h2>
              </div>
              <TenantForm onSubmit={handleSubmit} isLoading={isLoading} />
            </Card>
          </div>

          {/* Results Column */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Card className="p-6 shadow-card min-h-[400px]">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Risk Assessment</h2>
              </div>

              {result ? (
                <RiskScoreDisplay result={result} />
              ) : (
                <div className="flex flex-col items-center justify-center h-[320px] text-center">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Shield className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground">
                    Fill out the application form and click "Calculate Risk Score" to see the assessment results.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
