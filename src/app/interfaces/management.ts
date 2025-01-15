export interface Employees {
  id: string;
  name: string;
  position: string;
  admissionDate: string;
  wage: number;
  isActive: boolean;
  vacationRecords: VacationRecord[];
}

export interface CreateEmployee {
  name: string;
  position: string;
  admissionDate: string;
  wage: number;
  isActive: boolean;
}

export interface VacationRecord {
  vacationStartDate: Date;
  vacationeEndDate: Date;
  vacationStatus: string;
  employeesId: string;
}

export interface UpdateEmployee {
  name: string;
  position: string;
  Date: string;
  wage: number;
  status: boolean;
}
