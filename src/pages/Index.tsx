import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUpload } from '@/components/ui/file-upload';
import { WorkflowCard } from '@/components/WorkflowCard';
import { IntegrationStatus } from '@/components/IntegrationStatus';
import { N8nWorkflowCode } from '@/components/N8nWorkflowCode';
import { 
  FileText, 
  Users, 
  GitBranch, 
  Target, 
  Zap, 
  Brain,
  Settings,
  BarChart3
} from 'lucide-react';
import heroImage from '@/assets/hero-workflow.jpg';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const singleWorkflowSteps = [
    {
      id: '1',
      title: 'Parse Requirement',
      description: 'Extract and analyze single requirement',
      status: 'pending' as const,
      tool: 'n8n'
    },
    {
      id: '2', 
      title: 'Generate User Story',
      description: 'Create professional user story with OpenAI',
      status: 'pending' as const,
      tool: 'OpenAI'
    },
    {
      id: '3',
      title: 'Create Flow Diagram',
      description: 'Generate Mermaid user flow diagram',
      status: 'pending' as const,
      tool: 'Mermaid'
    },
    {
      id: '4',
      title: 'Create Jira Ticket',
      description: 'Create story ticket under epic',
      status: 'pending' as const,
      tool: 'Jira'
    },
    {
      id: '5',
      title: 'Document in Confluence',
      description: 'Record story and diagram in Confluence',
      status: 'pending' as const,
      tool: 'Confluence'
    },
    {
      id: '6',
      title: 'Request Figma Wireframe',
      description: 'Create wireframe request in Figma',
      status: 'pending' as const,
      tool: 'Figma'
    }
  ];

  const batchWorkflowSteps = [
    {
      id: '1',
      title: 'Process CSV File',
      description: 'Convert CSV to readable requirements batch',
      status: 'pending' as const,
      tool: 'n8n'
    },
    {
      id: '2',
      title: 'Generate User Stories List',
      description: 'Create multiple professional user stories',
      status: 'pending' as const,
      tool: 'OpenAI'
    },
    {
      id: '3',
      title: 'Create Flow Diagrams',
      description: 'Generate user flow diagrams for each story',
      status: 'pending' as const,
      tool: 'Mermaid'
    },
    {
      id: '4',
      title: 'Bulk Create Jira Tickets',
      description: 'Create all story tickets under epic',
      status: 'pending' as const,
      tool: 'Jira'
    },
    {
      id: '5',
      title: 'Upload to Confluence',
      description: 'Record all stories and diagrams',
      status: 'pending' as const,
      tool: 'Confluence'
    },
    {
      id: '6',
      title: 'Generate Figma Wireframes',
      description: 'Create comprehensive wireframe solution',
      status: 'pending' as const,
      tool: 'Figma'
    }
  ];

  const integrations = [
    {
      name: 'Jira',
      status: 'connected' as const,
      description: 'Create tickets and manage epics',
      icon: '🎯',
      lastSync: '2 hours ago'
    },
    {
      name: 'Confluence',
      status: 'connected' as const,
      description: 'Document user stories and flows',
      icon: '📚',
      lastSync: '1 hour ago'
    },
    {
      name: 'Figma',
      status: 'disconnected' as const,
      description: 'Create wireframes and prototypes',
      icon: '🎨'
    },
    {
      name: 'OpenAI',
      status: 'connected' as const,
      description: 'AI-powered story generation',
      icon: '🤖',
      lastSync: '30 minutes ago'
    },
    {
      name: 'n8n',
      status: 'connected' as const,
      description: 'Workflow automation platform',
      icon: '⚡',
      lastSync: '5 minutes ago'
    }
  ];

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for processing.`,
    });
  };

  const handleSingleWorkflow = () => {
    toast({
      title: "Single workflow started",
      description: "Processing individual requirement...",
    });
  };

  const handleBatchWorkflow = () => {
    if (!uploadedFile) {
      toast({
        title: "No file uploaded",
        description: "Please upload a CSV file first.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Batch workflow started",
      description: `Processing ${uploadedFile.name}...`,
    });
  };

  const handleConfigureIntegration = (integration: any) => {
    toast({
      title: `Configure ${integration.name}`,
      description: "Opening configuration panel...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <Badge className="bg-white/20 text-white border-white/30">
                SaaS Product Owner Assistant
              </Badge>
              <h1 className="text-5xl font-bold leading-tight">
                Automate Requirements to 
                <span className="text-primary-glow"> User Stories</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Transform your requirements into professional user stories, acceptance criteria, 
                and prototypes automatically using n8n workflow automation.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-white/80">
                  <Brain className="h-5 w-5" />
                  <span>AI-Powered Generation</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Zap className="h-5 w-5" />
                  <span>n8n Automation</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <GitBranch className="h-5 w-5" />
                  <span>Multi-Tool Integration</span>
                </div>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <img 
                src={heroImage} 
                alt="Workflow automation dashboard" 
                className="w-full max-w-lg rounded-2xl shadow-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Product Owner Dashboard</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload requirements, configure workflows, and monitor your automation pipeline
          </p>
        </div>

        <Tabs defaultValue="workflows" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workflows" className="flex items-center space-x-2">
              <GitBranch className="h-4 w-4" />
              <span>Workflows</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Upload</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="n8n-code" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>n8n Code</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <WorkflowCard
                title="Single Requirement Workflow"
                description="Process individual requirements into complete user stories with flows and wireframes"
                steps={singleWorkflowSteps}
                onStart={handleSingleWorkflow}
              />
              <WorkflowCard
                title="Batch CSV Workflow"
                description="Process multiple requirements from CSV file for bulk story creation"
                steps={batchWorkflowSteps}
                onStart={handleBatchWorkflow}
              />
            </div>

            {/* Workflow Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="bg-gradient-card shadow-medium">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Professional Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Generate user stories following industry standards with proper acceptance criteria
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card shadow-medium">
                <CardHeader>
                  <Target className="h-8 w-8 text-success mb-2" />
                  <CardTitle>Complete Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    From requirements to Jira tickets, Confluence docs, and Figma wireframes
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-card shadow-medium">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-warning mb-2" />
                  <CardTitle>Efficiency Boost</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Reduce manual work by 80% and ensure consistent documentation quality
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <FileUpload 
                onFileUpload={handleFileUpload}
                className="mb-8"
              />
              
              {uploadedFile && (
                <Card className="bg-gradient-card shadow-medium">
                  <CardHeader>
                    <CardTitle>Upload Summary</CardTitle>
                    <CardDescription>File ready for processing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">File Name:</span>
                        <span className="text-muted-foreground">{uploadedFile.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">File Size:</span>
                        <span className="text-muted-foreground">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Status:</span>
                        <Badge className="bg-success text-success-foreground">Ready</Badge>
                      </div>
                      <Button 
                        onClick={handleBatchWorkflow}
                        className="w-full bg-gradient-primary"
                      >
                        Start Batch Processing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationStatus 
              integrations={integrations}
              onConfigure={handleConfigureIntegration}
            />
          </TabsContent>

          <TabsContent value="n8n-code">
            <N8nWorkflowCode />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;