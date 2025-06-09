import React from 'react';
import { Droplets, Target, AlertTriangle } from 'lucide-react';
import { SoilMoistureSettings } from '../types/irrigation';

interface SoilMoistureControlProps {
  currentMoisture: number;
  settings: SoilMoistureSettings;
  onSettingsChange: (settings: SoilMoistureSettings) => void;
}

const SoilMoistureControl: React.FC<SoilMoistureControlProps> = ({
  currentMoisture,
  settings,
  onSettingsChange
}) => {
  const getMoistureStatus = () => {
    const diff = Math.abs(currentMoisture - settings.targetMoisture);
    if (currentMoisture < settings.minMoisture) return { status: 'Критично ниска', color: 'text-red-400' };
    if (currentMoisture > settings.maxMoisture) return { status: 'Превисока', color: 'text-orange-400' };
    if (diff <= 5) return { status: 'Оптимална', color: 'text-green-400' };
    if (diff <= 15) return { status: 'Близу циља', color: 'text-yellow-400' };
    return { status: 'Далеко од циља', color: 'text-red-400' };
  };

  const moistureStatus = getMoistureStatus();

  const handleTargetChange = (target: number) => {
    onSettingsChange({
      ...settings,
      targetMoisture: target
    });
  };

  const handleAutoIrrigationToggle = () => {
    onSettingsChange({
      ...settings,
      autoIrrigation: !settings.autoIrrigation
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-2 mb-4">
        <Droplets className="w-5 h-5 text-white" />
        <span className="text-white font-semibold">Контрола Влажности Земљишта</span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-white/70 mb-1">Тренутна</div>
            <div className="text-2xl font-bold text-white">{currentMoisture.toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-white/70 mb-1">Циљана</div>
            <div className="text-2xl font-bold text-blue-300">{settings.targetMoisture.toFixed(1)}%</div>
          </div>
        </div>

        <div className="text-center">
          <span className={`text-sm font-medium ${moistureStatus.color}`}>
            {moistureStatus.status}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/70">
            <span>Циљана влажност</span>
            <span>{settings.targetMoisture}%</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="20"
              max="90"
              step="1"
              value={settings.targetMoisture}
              onChange={(e) => handleTargetChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #06B6D4 0%, #06B6D4 ${((settings.targetMoisture - 20) / 70) * 100}%, rgba(255,255,255,0.2) ${((settings.targetMoisture - 20) / 70) * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-white/50 mt-1">
              <span>20%</span>
              <span>55%</span>
              <span>90%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Аутоматско наводњавање</div>
            <div className="text-sm text-white/60">Заливај када је влажност ниска</div>
          </div>
          <button
            onClick={handleAutoIrrigationToggle}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.autoIrrigation ? 'bg-cyan-500' : 'bg-gray-500'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
              settings.autoIrrigation ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
          <div className="text-xs text-cyan-200">
            <div className="font-medium mb-1">Аутоматска регулација:</div>
            <div>• Заливање када влажност падне испод {settings.minMoisture}%</div>
            <div>• Заустављање када достигне {settings.targetMoisture}%</div>
            <div>• Заштита од прекомерног заливања</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilMoistureControl;