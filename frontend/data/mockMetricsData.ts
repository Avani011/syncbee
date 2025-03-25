import { MetricDataPoint } from '../types/metrics';

// Sample data for the performance metrics
export const sampleDailyData: MetricDataPoint[] = [
  { date: '03/18', completed: 5, total: 8 },
  { date: '03/19', completed: 7, total: 9 },
  { date: '03/20', completed: 3, total: 5 },
  { date: '03/21', completed: 4, total: 6 },
  { date: '03/22', completed: 8, total: 8 },
  { date: '03/23', completed: 6, total: 10 },
  { date: '03/24', completed: 5, total: 7 },
];

export const sampleWeeklyData: MetricDataPoint[] = [
  { date: 'Week 1', completed: 24, total: 35 },
  { date: 'Week 2', completed: 30, total: 42 },
  { date: 'Week 3', completed: 28, total: 38 },
  { date: 'Week 4', completed: 33, total: 40 },
];

export const sampleMonthlyData: MetricDataPoint[] = [
  { date: 'Jan', completed: 89, total: 120 },
  { date: 'Feb', completed: 95, total: 130 },
  { date: 'Mar', completed: 110, total: 140 },
];