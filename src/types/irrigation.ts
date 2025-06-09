export interface IrrigationSchedule {
  id: string;
  name: string;
  startTime: string;
  duration: number; // in minutes
  days: string[]; // array of day keys
  active: boolean;
}

export interface SoilMoistureSettings {
  targetMoisture: number;
  minMoisture: number;
  maxMoisture: number;
  autoIrrigation: boolean;
}

export const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Понедељак' },
  { key: 'tuesday', label: 'Уторак' },
  { key: 'wednesday', label: 'Среда' },
  { key: 'thursday', label: 'Четвртак' },
  { key: 'friday', label: 'Петак' },
  { key: 'saturday', label: 'Субота' },
  { key: 'sunday', label: 'Недеља' }
];

export const DEFAULT_IRRIGATION_SCHEDULES: IrrigationSchedule[] = [
  {
    id: '1',
    name: 'Јутарње заливање',
    startTime: '06:00',
    duration: 30,
    days: ['monday', 'wednesday', 'friday'],
    active: true
  },
  {
    id: '2',
    name: 'Вечерње заливање',
    startTime: '18:00',
    duration: 20,
    days: ['tuesday', 'thursday', 'saturday'],
    active: true
  }
];

export const DEFAULT_SOIL_MOISTURE_SETTINGS: SoilMoistureSettings = {
  targetMoisture: 65,
  minMoisture: 40,
  maxMoisture: 85,
  autoIrrigation: true
};