import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Code, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const n8nWorkflowJSON = {
  "name": "Product Owner Assistant - Requirements to User Stories",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "requirements-upload",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "webhook-start",
      "name": "Webhook - CSV Upload",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [240, 300]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "csv_data",
              "name": "csv_data",
              "value": "={{ $json.body.file }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "parse-csv",
      "name": "Parse CSV Requirements",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [460, 300]
    },
    {
      "parameters": {
        "model": "gpt-4",
        "messages": {
          "values": [
            {
              "role": "system",
              "content": "You are a senior product owner. Convert the following requirements into professional user stories with acceptance criteria following industry standards:\n\nFormat:\n**User Story:** As a [user type], I want [functionality] so that [benefit].\n\n**Acceptance Criteria:**\n- Given [context], when [action], then [expected result]\n- Given [context], when [action], then [expected result]\n\n**Story Points:** [estimation]\n\n**Priority:** [High/Medium/Low]"
            },
            {
              "role": "user", 
              "content": "Requirements: {{ $json.csv_data }}"
            }
          ]
        }
      },
      "id": "openai-stories",
      "name": "Generate User Stories with OpenAI",
      "type": "@n8n/n8n-nodes-langchain.openAi",
      "typeVersion": 1,
      "position": [680, 300]
    },
    {
      "parameters": {
        "model": "gpt-4",
        "messages": {
          "values": [
            {
              "role": "system",
              "content": "Create a mermaid flowchart diagram for the user story. Use proper mermaid syntax with decision points, user actions, and system responses."
            },
            {
              "role": "user",
              "content": "User Story: {{ $json.choices[0].message.content }}"
            }
          ]
        }
      },
      "id": "openai-flowchart",
      "name": "Generate Flow Diagram", 
      "type": "@n8n/n8n-nodes-langchain.openAi",
      "typeVersion": 1,
      "position": [900, 300]
    },
    {
      "parameters": {
        "url": "https://api.atlassian.com/ex/jira/{{ $vars.jira_cloud_id }}/rest/api/3/issue",
        "authentication": "basicAuth",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "fields",
              "value": "{\n  \"project\": {\n    \"key\": \"{{ $vars.jira_project_key }}\"\n  },\n  \"parent\": {\n    \"key\": \"{{ $vars.jira_epic_key }}\"\n  },\n  \"summary\": \"{{ $json.title }}\",\n  \"description\": {\n    \"type\": \"doc\",\n    \"version\": 1,\n    \"content\": [\n      {\n        \"type\": \"paragraph\",\n        \"content\": [\n          {\n            \"text\": \"{{ $json.user_story }}\",\n            \"type\": \"text\"\n          }\n        ]\n      }\n    ]\n  },\n  \"issuetype\": {\n    \"name\": \"Story\"\n  }\n}"
            }
          ]
        }
      },
      "id": "create-jira-ticket",
      "name": "Create Jira Story",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [1120, 200]
    },
    {
      "parameters": {
        "url": "https://api.atlassian.com/wiki/rest/api/content",
        "authentication": "basicAuth",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "type",
              "value": "page"
            },
            {
              "name": "title",
              "value": "User Story: {{ $json.title }}"
            },
            {
              "name": "space",
              "value": "{ \"key\": \"{{ $vars.confluence_space_key }}\" }"
            },
            {
              "name": "body",
              "value": "{\n  \"storage\": {\n    \"value\": \"<h2>User Story</h2>\\n<p>{{ $json.user_story }}</p>\\n<h2>Acceptance Criteria</h2>\\n<p>{{ $json.acceptance_criteria }}</p>\\n<h2>User Flow Diagram</h2>\\n<ac:structured-macro ac:name=\\\"mermaid\\\">\\n<ac:parameter ac:name=\\\"diagramDefinition\\\">{{ $json.flow_diagram }}</ac:parameter>\\n</ac:structured-macro>\\n<h2>Jira Ticket</h2>\\n<p><a href=\\\"{{ $json.jira_url }}\\\">{{ $json.jira_key }}</a></p>\",\n    \"representation\": \"storage\"\n  }\n}"
            }
          ]
        }
      },
      "id": "create-confluence-page",
      "name": "Create Confluence Documentation",
      "type": "n8n-nodes-base.httpRequest", 
      "typeVersion": 4.2,
      "position": [1120, 400]
    },
    {
      "parameters": {
        "url": "https://api.figma.com/v1/files/{{ $vars.figma_file_key }}/comments",
        "authentication": "bearerToken",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-Figma-Token",
              "value": "{{ $vars.figma_token }}"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "message",
              "value": "New wireframe request:\\n\\nUser Story: {{ $json.user_story }}\\n\\nFlow Diagram: {{ $json.flow_diagram }}\\n\\nJira: {{ $json.jira_url }}"
            },
            {
              "name": "client_meta",
              "value": "{ \"x\": 100, \"y\": 100 }"
            }
          ]
        }
      },
      "id": "create-figma-comment",
      "name": "Create Figma Wireframe Request",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [1120, 600]
    }
  ],
  "connections": {
    "Webhook - CSV Upload": {
      "main": [
        [
          {
            "node": "Parse CSV Requirements",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parse CSV Requirements": {
      "main": [
        [
          {
            "node": "Generate User Stories with OpenAI",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate User Stories with OpenAI": {
      "main": [
        [
          {
            "node": "Generate Flow Diagram",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate Flow Diagram": {
      "main": [
        [
          {
            "node": "Create Jira Story",
            "type": "main",
            "index": 0
          },
          {
            "node": "Create Confluence Documentation", 
            "type": "main",
            "index": 0
          },
          {
            "node": "Create Figma Wireframe Request",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
};

interface N8nWorkflowCodeProps {
  className?: string;
}

export const N8nWorkflowCode: React.FC<N8nWorkflowCodeProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(n8nWorkflowJSON, null, 2));
      toast({
        title: "Copied to clipboard",
        description: "n8n workflow JSON has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(n8nWorkflowJSON, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-owner-assistant-workflow.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "n8n workflow JSON file is being downloaded.",
    });
  };

  return (
    <Card className={`bg-gradient-card shadow-medium ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>n8n Workflow Configuration</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">JSON</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button 
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Copy className="h-4 w-4" />
              <span>Copy JSON</span>
            </Button>
            <Button 
              onClick={downloadJSON}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
          
          {isVisible && (
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{JSON.stringify(n8nWorkflowJSON, null, 2)}</code>
              </pre>
            </div>
          )}
          
          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">Setup Instructions:</h4>
            <ol className="text-sm space-y-1 text-muted-foreground">
              <li>1. Import this JSON into your n8n instance</li>
              <li>2. Configure the following environment variables:</li>
              <ul className="ml-4 space-y-1">
                <li>• jira_cloud_id - Your Jira Cloud ID</li>
                <li>• jira_project_key - Target project key</li>
                <li>• jira_epic_key - Parent epic key</li>
                <li>• confluence_space_key - Confluence space</li>
                <li>• figma_file_key - Figma file ID</li>
                <li>• figma_token - Figma API token</li>
              </ul>
              <li>3. Set up authentication for Jira, Confluence, and Figma</li>
              <li>4. Configure OpenAI API credentials</li>
              <li>5. Activate the workflow</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};