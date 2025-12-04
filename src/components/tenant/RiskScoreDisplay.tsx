import { RiskScoreResponse } from '@/types/tenant';
import { CheckCircle2, AlertTriangle, XCircle, Gauge, Clock, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RiskScoreDisplayProps {
  result: RiskScoreResponse;
}

export function RiskScoreDisplay({ result }: RiskScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-success';
    if (score <= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBgColor = (score: number) => {
    if (score < 30) return 'bg-success/10 border-success/30';
    if (score <= 60) return 'bg-warning/10 border-warning/30';
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
    switch (recommendation) {
      case 'APPROVE':
        return (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/30">
            <CheckCircle2 className="w-8 h-8 text-success" />
            <div>
              <p className="font-semibold text-success">APPROVE</p>
              <p className="text-sm text-muted-foreground">Recommended to proceed with application</p>
            </div>
          </div>
        );
      case 'REQUEST_INFO':
        return (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-warning/10 border border-warning/30">
            <AlertTriangle className="w-8 h-8 text-warning" />
            <div>
              <p className="font-semibold text-warning">REQUEST INFO</p>
              <p className="text-sm text-muted-foreground">Additional information needed</p>
            </div>
          </div>
        );
      case 'REJECT':
        return (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <XCircle className="w-8 h-8 text-destructive" />
            <div>
              <p className="font-semibold text-destructive">REJECT</p>
              <p className="text-sm text-muted-foreground">Application does not meet criteria</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Main Score */}
      <div className={`p-8 rounded-2xl border-2 text-center ${getScoreBgColor(result.risk_score)}`}>
        <p className="text-sm font-medium text-muted-foreground mb-2">RISK SCORE</p>
        <div className={`text-7xl font-bold animate-score-reveal ${getScoreColor(result.risk_score)}`}>
          {result.risk_score}
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
              style={{ width: `${result.confidence_score}%` }}
            />
          </div>
          <span className="font-semibold text-primary">{result.confidence_score.toFixed(1)}%</span>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Cpu className="w-3 h-3" />
            <span className="text-xs">Model Version</span>
          </div>
          <p className="font-mono text-sm">{result.model_version}</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="w-3 h-3" />
            <span className="text-xs">Inference Time</span>
          </div>
          <p className="font-mono text-sm">{result.inference_time_ms}ms</p>
        </div>
      </div>
    </div>
  );
}
