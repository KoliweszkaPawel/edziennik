import {Timestamp} from '@angular/fire/firestore';

export interface Grade {
  id?: string,
  studentId: string,
  subject: string,
  value: number,
  weight: number,
  description: string,
  createdAt: Date,
  teacher: string
}

export interface GradeDTO {
  id?: string,
  studentId: string,
  subject: string,
  value: number,
  weight: number,
  description: string,
  createdAt: Timestamp,
  teacher: string
}
