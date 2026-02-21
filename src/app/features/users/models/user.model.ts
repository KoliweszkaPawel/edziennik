export type UserRole = 'student' | 'teacher'

export interface UserProfile {
  uid: string,
  email: string,
  role: UserRole,
}
