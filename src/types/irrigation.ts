export interface IrrigationSchedule {
  id: string;
  name: string;
  startTime: string;
  duration: number; // in minutes
  days: string[]; // ['monday', 'tuesday', etc.]
  active: boolean;
}

export interface SoilMoistureSettings {
  targetMoisture: number;
  minMoisture: number;
  maxMoisture: number;
  autoIrrigation: boolean;
}

export const DEFAULT_SOIL_MOISTURE_SETTINGS: SoilMoistureSettings = {
  targetMoisture: 65,
  minMoisture: 30,
  maxMoisture: 90,
  autoIrrigation: true
};

export const DEFAULT_IRRIGATION_SCHEDULES: IrrigationSchedule[] = [
  {
    id: '1',
    name: 'NOĆNO ZALIVANJE',
    startTime: '02:00',
    duration: 180,
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

export const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Понедељак' },
  { key: 'tuesday', label: 'Уторак' },
  { key: 'wednesday', label: 'Среда' },
  { key: 'thursday', label: 'Четвртак' },
  { key: 'friday', label: 'Петак' },
  { key: 'saturday', label: 'Субота' },
  { key: 'sunday', label: 'Недеља' }
];
