export class AppLog {
  id!: number;
  level!: string;
  message: string = '';
  stack: string = '';
  context: string = '';
  timestamp!: string;
}
