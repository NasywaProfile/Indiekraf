export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  linkText: string;
  linkUrl: string;
  colorTheme: 'blue' | 'purple' | 'green' | 'orange';
  iconName: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

export interface PricePlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  badge?: string;
  colorTheme: 'blue' | 'purple' | 'pink' | 'green';
  bullets: string[];
  category?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
