import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Save,
  X,
  Trash2,
  CheckCircle,
  Leaf
} from 'lucide-react';
import { IrrigationSchedule, DAYS_OF_WEEK } from '../types/irrigation';

interface IrrigationScheduleManagerProps {
  schedules: IrrigationSchedule[];
  onScheduleAdd: (schedule: Omit<IrrigationSchedule, 'id'>) => void;
  onScheduleUpdate: (id: string, schedule: Partial<IrrigationSchedule>) => void;
  onScheduleDelete: (id: string) => void;
}

const IrrigationScheduleManager: React.FC<IrrigationScheduleManagerProps> = ({
  schedules,
  onScheduleAdd,
  onScheduleUpdate,
  onScheduleDelete
}) => {
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    startTime: '06:00',
    duration: 30,
    days: [] as string[],
    active: true
  });

  const handleAddSchedule = () => {
    if (newSchedule.name && newSchedule.days.length > 0) {
      onScheduleAdd(newSchedule);
      setNewSchedule({
        name: '',
        startTime: '06:00',
        duration: 30,
        days: [],
        active: true
      });
      setIsAddingSchedule(false);
    }
  };

  const toggleDay = (day: string) => {
    setNewSchedule(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const formatScheduleDays = (days: string[]) => {
    const dayLabels = days.map(day => 
      DAYS_OF_WEEK.find(d => d.key === day)?.label || day
    );
    return dayLabels.join(', ');
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">Управљање Распоредом Наводњавања</span>
        </div>
        <button
          onClick={() => setIsAddingSchedule(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Додај Распред
        </button>
      </div>

      {/* Add New Schedule Form */}
      {isAddingSchedule && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Назив распореда</label>
              <input
                type="text"
                value={newSchedule.name}
                onChange={(e) => setNewSchedule(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50"
                placeholder="нпр. Јутарње заливање"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Време почетка</label>
                <input
                  type="time"
                  value={newSchedule.startTime}
                  onChange={(e) => setNewSchedule(prev => ({ ...prev, startTime: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Трајање (минути)</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={newSchedule.duration}
                  onChange={(e) => setNewSchedule(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Дани у недељи</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {DAYS_OF_WEEK.map(day => (
                  <button
                    key={day.key}
                    onClick={() => toggleDay(day.key)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      newSchedule.days.includes(day.key)
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddSchedule}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Сачувај
              </button>
              <button
                onClick={() => setIsAddingSchedule(false)}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Откажи
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Schedules */}
      <div className="space-y-3">
        {schedules.length === 0 ? (
          <div className="text-center text-white/60 py-8">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Нема дефинисаних распореда наводњавања</p>
            <p className="text-sm">Додајте нови распоред да бисте аутоматизовали заливање</p>
          </div>
        ) : (
          schedules.map(schedule => (
            <div key={schedule.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-medium">{schedule.name}</h3>
                    <div className={`w-2 h-2 rounded-full ${schedule.active ? 'bg-green-400' : 'bg-gray-400'}`} />
                  </div>
                  <div className="text-sm text-white/70 space-y-1">
                    <div>Време: {schedule.startTime} | Трајање: {schedule.duration} мин</div>
                    <div>Дани: {formatScheduleDays(schedule.days)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onScheduleUpdate(schedule.id, { active: !schedule.active })}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      schedule.active
                        ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                        : 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30'
                    }`}
                  >
                    {schedule.active ? 'Активан' : 'Неактиван'}
                  </button>
                  <button
                    onClick={() => onScheduleDelete(schedule.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IrrigationScheduleManager;