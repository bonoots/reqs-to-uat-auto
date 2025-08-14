import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  tool: string;
}

interface WorkflowCardProps {
  title: string;
  description: string;
  steps: WorkflowStep[];
  onStart: () => void;
  isRunning?: boolean;
  className?: string;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  title,
  description,
  steps,
  onStart,
  isRunning = false,
  className
}) => {
  const getStatusColor = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'running':
        return 'bg-primary text-primary-foreground';
      case 'error':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStepIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'running':
        return '●';
      case 'error':
        return '✗';
      default:
        return '○';
    }
  };

  return (
    <Card className={cn("bg-gradient-card shadow-medium", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <Button 
            onClick={onStart} 
            disabled={isRunning}
            className="bg-gradient-primary"
          >
            {isRunning ? 'Running...' : 'Start Workflow'}
          </Button>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                getStatusColor(step.status)
              )}>
                {getStepIcon(step.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{step.title}</p>
                  <Badge variant="outline">{step.tool}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="w-px h-8 bg-border ml-4" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};