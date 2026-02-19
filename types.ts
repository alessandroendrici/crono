
export enum LogType {
  IN = 'IN',
  OUT = 'OUT'
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  color: string;
}

export interface TimeLog {
  id: string;
  employeeId: string;
  type: LogType;
  timestamp: number;
}

export interface DayReport {
  date: string;
  logs: TimeLog[];
  totalMinutes: number;
}

export interface MonthlyReport {
  employee: Employee;
  month: string;
  days: DayReport[];
  totalMinutes: number;
}
