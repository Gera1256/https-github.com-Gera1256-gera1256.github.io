export interface NavItem {
  id: string;
  label: string;
  badge?: string;
}

export interface MetricIndicator {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconName: string;
  color: 'cyan' | 'green' | 'blue' | 'purple';
}

export interface AIConceptCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  example: string;
  icon: string;
  category: 'core' | 'genai' | 'deeplearning';
  tags: string[];
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  impact: string;
}

export interface DataScienceStep {
  step: number;
  name: string;
  desc: string;
  tools: string[];
  algorithms: string[];
  metrics: string[];
}

export interface TechTool {
  name: string;
  category: 'Lenguajes' | 'Frameworks' | 'Librerías' | 'Infraestructura';
  description: string;
  badge: string;
  codeSample: string;
}

export interface ApplicationSector {
  sector: string;
  icon: string;
  description: string;
  example: string;
  metric: string;
  impactLevel: 'Alto' | 'Crítico' | 'Transformacional';
}

export interface TerminalLog {
  id: string;
  type: 'command' | 'response' | 'error' | 'system';
  content: string;
  timestamp: string;
}
