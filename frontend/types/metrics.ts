// Define TypeScript interfaces for metrics data

export interface MetricDataPoint {
    date: string;
    completed: number;
    total: number;
  }
  
  export type ViewMode = 'daily' | 'weekly' | 'monthly';
  export type DateRange = 'last7days' | 'last30days' | 'last3months' | 'last6months' | 'lastYear';
  
  // You can extend these types as needed for your backend integration