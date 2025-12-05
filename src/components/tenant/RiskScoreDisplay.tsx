import { RiskScoreResponse } from '@/types/tenant';
import { CheckCircle2, AlertTriangle, XCircle, Gauge, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RiskScoreDisplayProps {
  result: RiskScoreResponse;
}

export function RiskScoreDisplay({ result }: RiskScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-success';
    if (score <= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBgColor = (score: number) => {
    if (score < 40) return 'bg-success/10 border-success/30';
    if (score <= 70) return 'bg-warning/10 border-warning/30';
    return 'bg-destructive/10 border-destructive/30';
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'LOW':
        return <Badge className="bg-success text-success-foreground">LOW RISK</Badge>;
      case 'MEDIUM':
        return <Badge className="bg-warning text-warning-foreground">MEDIUM RISK</Badge>;
      case 'HIGH':
        return <Badge className="bg-destructive text-destructive-foreground">HIGH RISK</Badge>;
      default:
        return <Badge variant="secondary">{category}</Badge>;
    }
  };

  const getRecommendationDisplay = (recommendation: string) => {
    const lowerRec = recommendation.toLowerCase();
    
    if (lowerRec.includes('approve') && !lowerRec.includes('reject')) {
      return (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/30">
          <CheckCircle2 className="w-8 h-8 text-success flex-shrink-0" />
          <div>
            <p className="font-semibold text-success">{recommendation}</p>
            <p className="text-sm text-muted-foreground">Recommended to proceed with application</p>
          </div>
        </div>
      );
    }
    
    if (lowerRec.includes('reject')) {
      return (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
          <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
          <div>
            <p className="font-semibold text-destructive">{recommendation}</p>
            <p className="text-sm text-muted-foreground">Application does not meet criteria</p>
          </div>
        </div>
      );
    }
    
    // Manual review or other cases
    return (
      <div className="flex items-center gap-3 p-4 rounded-lg bg-warning/10 border border-warning/30">
        <AlertTriangle className="w-8 h-8 text-warning flex-shrink-0" />
        <div>
          <p className="font-semibold text-warning">{recommendation}</p>
          <p className="text-sm text-muted-foreground">Additional review recommended</p>
        </div>
      </div>
    );
  };

  const confidencePercent = result.confidence * 100;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Main Score */}
      <div className={`p-8 rounded-2xl border-2 text-center ${getScoreBgColor(result.risk_score)}`}>
        <p className="text-sm font-medium text-muted-foreground mb-2">RISK SCORE</p>
        <div className={`text-7xl font-bold animate-score-reveal ${getScoreColor(result.risk_score)}`}>
          {Math.round(result.risk_score)}
        </div>
        <div className="mt-4">
          {getCategoryBadge(result.risk_category)}
        </div>
      </div>

      {/* Recommendation */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">RECOMMENDATION</h4>
        {getRecommendationDisplay(result.recommendation)}
      </div>

      {/* Reasoning */}
      {result.reasoning && (
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Analysis</span>
          </div>
          <p className="text-sm text-muted-foreground">{result.reasoning}</p>
        </div>
      )}

      {/* Confidence */}
      <div className="p-4 rounded-lg bg-secondary">
        <div className="flex items-center gap-2 mb-2">
          <Gauge className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Confidence Score</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-500"
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
          <span className="font-semibold text-primary">{confidencePercent.toFixed(1)}%</span>
        </div>
      </div>

      {/* Default Probability */}
      <div className="p-3 rounded-lg bg-muted/50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Default Probability</span>
          <span className="font-mono text-sm font-medium">
            {(result.default_probability * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
