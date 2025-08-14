import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface Integration {
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  description: string;
  icon: string;
  lastSync?: string;
}

interface IntegrationStatusProps {
  integrations: Integration[];
  onConfigure: (integration: Integration) => void;
}

export const IntegrationStatus: React.FC<IntegrationStatusProps> = ({
  integrations,
  onConfigure
}) => {
  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-success text-success-foreground">Connected</Badge>;
      case 'error':
        return <Badge className="bg-destructive text-destructive-foreground">Error</Badge>;
      default:
        return <Badge className="bg-warning text-warning-foreground">Not Connected</Badge>;
    }
  };

  return (
    <Card className="bg-gradient-card shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Integration Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{integration.icon}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{integration.name}</h4>
                    {getStatusIcon(integration.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                  {integration.lastSync && (
                    <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(integration.status)}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onConfigure(integration)}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};