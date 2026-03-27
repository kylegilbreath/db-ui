/**
 * Mock data for prototyping
 * Replace with actual mock data as needed
 */

export interface MockNotebook {
  id: string
  name: string
  lastModified: string
  status: 'running' | 'idle' | 'error'
}

export interface MockJob {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed' | 'failed'
  lastRun: string
}

export const mockNotebooks: MockNotebook[] = [
  { id: '1', name: 'Data Analysis Notebook', lastModified: '2024-01-15', status: 'running' },
  { id: '2', name: 'ML Training Script', lastModified: '2024-01-14', status: 'idle' },
  { id: '3', name: 'ETL Pipeline', lastModified: '2024-01-13', status: 'error' },
]

export const mockJobs: MockJob[] = [
  { id: '1', name: 'Daily Data Sync', status: 'active', lastRun: '2024-01-15 10:00' },
  { id: '2', name: 'Weekly Report', status: 'paused', lastRun: '2024-01-08 09:00' },
  { id: '3', name: 'Model Training', status: 'completed', lastRun: '2024-01-14 15:30' },
]
