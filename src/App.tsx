import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Thermometer, 
  Gauge, 
  Wifi, 
  WifiOff, 
  Power, 
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Target,
  Play,
  Pause
} from 'lucide-react';

interface SensorData {
  temperature: number;
  pressure: number;
  moisture: { zone1: number; zone2: number; zone3: number; zone4: number };
  valves: { valve1: boolean; valve2: boolean };
  wifiConnected: boolean;
  mqttConnected: boolean;
  systemActive: boolean;
  targetTemperature: number;
  autoMode: boolean;
}

const TemperatureControl: React.FC<{ 
  currentTemp: number; 
  targetTemp: number; 
  autoMode: boolean;
  onTargetChange: (temp: number) => void;
  onAutoModeToggle: () => void;
}> = ({ currentTemp, targetTemp, autoMode, onTargetChange, onAutoModeToggle }) => {
  
  const getTemperatureStatus = () => {
    const diff = Math.abs(currentTemp - targetTemp);
    if (diff <= 1) return { status: 'Оптимално', color: 'text-green-400' };
    if (diff <= 3) return { status: 'Близу циља', color: 'text-yellow-400' };
    return { status: 'Далеко од циља', color: 'text-red-400' };
  };

  const tempStatus = getTemperatureStatus();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">Контрола Температуре</span>
        </div>
        <button
          onClick={onAutoModeToggle}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
            autoMode 
              ? 'bg-green-500/20 text-green-200 border border-green-500/30' 
              : 'bg-gray-500/20 text-gray-200 border border-gray-500/30'
          }`}
        >
          {autoMode ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          {autoMode ? 'Ауто' : 'Ручно'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Тренутна и циљана температура */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-white/70 mb-1">Тренутна</div>
            <div className="text-2xl font-bold text-white">{currentTemp.toFixed(1)}°C</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-white/70 mb-1">Циљана</div>
            <div className="text-2xl font-bold text-blue-300">{targetTemp.toFixed(1)}°C</div>
          </div>
        </div>

        {/* Статус */}
        <div className="text-center">
          <span className={`text-sm font-medium ${tempStatus.color}`}>
            {tempStatus.status}
          </span>
        </div>

        {/* Клизач за циљану температуру */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/70">
            <span>Циљана температура</span>
            <span>{targetTemp}°C</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="10"
              max="40"
              step="0.5"
              value={targetTemp}
              onChange={(e) => onTargetChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((targetTemp - 10) / 30) * 100}%, rgba(255,255,255,0.2) ${((targetTemp - 10) / 30) * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-white/50 mt-1">
              <span>10°C</span>
              <span>25°C</span>
              <span>40°C</span>
            </div>
          </div>
        </div>

        {/* Аутоматски режим опис */}
        {autoMode && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="text-xs text-blue-200">
              <div className="font-medium mb-1">Аутоматски режим активан:</div>
              <div>• Вентили се контролишу аутоматски</div>
              <div>• Циљ: одржавање {targetTemp}°C ± 1°C</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TemperatureGauge: React.FC<{ temperature: number; targetTemp: number }> = ({ temperature, targetTemp }) => {
  const percentage = ((temperature - 10) / 30) * 100;
  const targetPercentage = ((targetTemp - 10) / 30) * 100;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  
  const getColor = (temp: number) => {
    if (temp < 15) return 'from-blue-500 to-cyan-400';
    if (temp < 25) return 'from-green-500 to-emerald-400';
    if (temp < 35) return 'from-yellow-500 to-orange-400';
    return 'from-red-500 to-pink-400';
  };

  const getStatus = (temp: number) => {
    if (temp < 10 || temp > 40) return 'Критично';
    if (temp < 15 || temp > 35) return 'Упозорење';
    return 'Оптимално';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">Температура</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          getStatus(temperature) === 'Критично' ? 'bg-red-500/20 text-red-200' :
          getStatus(temperature) === 'Упозорење' ? 'bg-yellow-500/20 text-yellow-200' :
          'bg-green-500/20 text-green-200'
        }`}>
          {getStatus(temperature)}
        </span>
      </div>
      
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
          {/* Позадински круг */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          {/* Циљана температура (тања линија) */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="1"
            strokeDasharray={`${targetPercentage}, 100`}
            className="transition-all duration-1000 ease-out"
          />
          {/* Тренутна температура */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="url(#tempGradient)"
            strokeWidth="2"
            strokeDasharray={`${clampedPercentage}, 100`}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="tempGradient" className={`bg-gradient-to-r ${getColor(temperature)}`}>
              <stop offset="0%" stopColor={temperature < 15 ? '#3B82F6' : temperature < 25 ? '#10B981' : temperature < 35 ? '#F59E0B' : '#EF4444'} />
              <stop offset="100%" stopColor={temperature < 15 ? '#06B6D4' : temperature < 25 ? '#34D399' : temperature < 35 ? '#FB923C' : '#F472B6'} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{temperature.toFixed(1)}</div>
            <div className="text-sm text-white/70">°C</div>
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-1">
        <div className="text-sm text-white/70">Опсег: 10°C - 40°C</div>
        <div className="text-xs text-blue-300">Циљ: {targetTemp}°C</div>
      </div>
    </div>
  );
};

const PressureGauge: React.FC<{ pressure: number }> = ({ pressure }) => {
  const getStatus = (pressure: number) => {
    if (pressure < 0.5) return 'Низак';
    if (pressure >= 1.0) return 'Нормалан';
    return 'Упозорење';
  };

  const getColor = (pressure: number) => {
    if (pressure < 0.5) return 'text-red-400';
    if (pressure >= 1.0) return 'text-green-400';
    return 'text-yellow-400';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">Притисак Воде</span>
        </div>
        {pressure < 0.5 && <AlertTriangle className="w-5 h-5 text-red-400" />}
      </div>
      
      <div className="text-center">
        <div className={`text-4xl font-bold mb-2 ${getColor(pressure)}`}>
          {pressure.toFixed(2)}
        </div>
        <div className="text-white/70 text-sm mb-2">бара</div>
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
          getStatus(pressure) === 'Низак' ? 'bg-red-500/20 text-red-200' :
          getStatus(pressure) === 'Нормалан' ? 'bg-green-500/20 text-green-200' :
          'bg-yellow-500/20 text-yellow-200'
        }`}>
          {getStatus(pressure)}
        </div>
      </div>
    </div>
  );
};

const MoistureZone: React.FC<{ zone: string; moisture: number; onToggle: () => void; active: boolean }> = ({ 
  zone, moisture, onToggle, active 
}) => {
  const getMoistureColor = (level: number) => {
    if (level < 30) return 'from-red-500 to-orange-400';
    if (level < 60) return 'from-yellow-500 to-amber-400';
    return 'from-green-500 to-emerald-400';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-medium">{zone}</span>
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
            active ? 'bg-blue-600' : 'bg-gray-600'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            active ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm text-white/70 mb-1">
          <span>Влажност</span>
          <span>{moisture}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${getMoistureColor(moisture)} transition-all duration-500`}
            style={{ width: `${moisture}%` }}
          />
        </div>
      </div>
      
      <div className={`text-xs text-center ${
        moisture < 30 ? 'text-red-200' :
        moisture < 60 ? 'text-yellow-200' :
        'text-green-200'
      }`}>
        {moisture < 30 ? 'Суво' : moisture < 60 ? 'Умерено' : 'Влажно'}
      </div>
    </div>
  );
};

const ValveControl: React.FC<{ 
  valve: string; 
  active: boolean; 
  onToggle: () => void;
  autoMode: boolean;
  autoControlled?: boolean;
}> = ({ valve, active, onToggle, autoMode, autoControlled = false }) => {
  
  const isDisabled = autoMode && autoControlled;
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-400" />
          <span className="text-white font-medium">{valve}</span>
          {autoMode && autoControlled && (
            <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded">
              Ауто
            </span>
          )}
        </div>
        <div className={`w-3 h-3 rounded-full ${active ? 'bg-green-400' : 'bg-gray-500'}`} />
      </div>
      
      <button
        onClick={onToggle}
        disabled={isDisabled}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
          isDisabled
            ? 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
            : active 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isDisabled 
          ? 'Аутоматски режим'
          : active 
            ? 'Затвори Вентил' 
            : 'Отвори Вентил'
        }
      </button>
    </div>
  );
};

const SystemStatus: React.FC<{ data: SensorData }> = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-white" />
        <span className="text-white font-semibold">Статус Система</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {data.wifiConnected ? <Wifi className="w-4 h-4 text-green-400" /> : <WifiOff className="w-4 h-4 text-red-400" />}
            <span className="text-white/80">WiFi Веза</span>
          </div>
          <span className={`text-sm ${data.wifiConnected ? 'text-green-400' : 'text-red-400'}`}>
            {data.wifiConnected ? 'Повезано' : 'Није повезано'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className={`w-4 h-4 ${data.mqttConnected ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-white/80">MQTT Брокер</span>
          </div>
          <span className={`text-sm ${data.mqttConnected ? 'text-green-400' : 'text-red-400'}`}>
            {data.mqttConnected ? 'Повезано' : 'Није повезано'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Power className={`w-4 h-4 ${data.systemActive ? 'text-green-400' : 'text-gray-400'}`} />
            <span className="text-white/80">Статус Система</span>
          </div>
          <span className={`text-sm ${data.systemActive ? 'text-green-400' : 'text-gray-400'}`}>
            {data.systemActive ? 'Активан' : 'У приправности'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className={`w-4 h-4 ${data.autoMode ? 'text-blue-400' : 'text-gray-400'}`} />
            <span className="text-white/80">Режим Рада</span>
          </div>
          <span className={`text-sm ${data.autoMode ? 'text-blue-400' : 'text-gray-400'}`}>
            {data.autoMode ? 'Аутоматски' : 'Ручни'}
          </span>
        </div>
        
        <div className="pt-2 border-t border-white/20">
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <Clock className="w-3 h-3" />
            <span>Последње ажурирање: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 22.5,
    pressure: 1.2,
    moisture: { zone1: 45, zone2: 62, zone3: 38, zone4: 71 },
    valves: { valve1: false, valve2: true },
    wifiConnected: true,
    mqttConnected: true,
    systemActive: true,
    targetTemperature: 24.0,
    autoMode: false
  });

  // Аутоматска контрола температуре
  useEffect(() => {
    if (sensorData.autoMode) {
      const tempDiff = sensorData.temperature - sensorData.targetTemperature;
      
      // Логика за аутоматску контролу вентила на основу температуре
      setSensorData(prev => {
        let newValves = { ...prev.valves };
        
        // Ако је превише топло, отвори вентиле за хлађење
        if (tempDiff > 2) {
          newValves.valve1 = true;
          newValves.valve2 = true;
        }
        // Ако је превише хладно, затвори вентиле
        else if (tempDiff < -2) {
          newValves.valve1 = false;
          newValves.valve2 = false;
        }
        // У оптималном опсегу, одржавај тренутно стање
        
        return {
          ...prev,
          valves: newValves
        };
      });
    }
  }, [sensorData.temperature, sensorData.targetTemperature, sensorData.autoMode]);

  // Симулација података у реалном времену
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        temperature: 22.5 + (Math.random() - 0.5) * 10,
        pressure: 1.2 + (Math.random() - 0.5) * 0.8,
        moisture: {
          zone1: Math.max(20, Math.min(90, prev.moisture.zone1 + (Math.random() - 0.5) * 10)),
          zone2: Math.max(20, Math.min(90, prev.moisture.zone2 + (Math.random() - 0.5) * 10)),
          zone3: Math.max(20, Math.min(90, prev.moisture.zone3 + (Math.random() - 0.5) * 10)),
          zone4: Math.max(20, Math.min(90, prev.moisture.zone4 + (Math.random() - 0.5) * 10))
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleValve = (valve: 'valve1' | 'valve2') => {
    // У аутоматском режиму, не дозволи ручну контролу главних вентила
    if (sensorData.autoMode && (valve === 'valve1' || valve === 'valve2')) {
      return;
    }
    
    setSensorData(prev => ({
      ...prev,
      valves: {
        ...prev.valves,
        [valve]: !prev.valves[valve]
      }
    }));
  };

  const toggleZone = (zone: 'zone1' | 'zone2' | 'zone3' | 'zone4') => {
    console.log(`Укључивање наводњавања за ${zone}`);
  };

  const handleTargetTemperatureChange = (temp: number) => {
    setSensorData(prev => ({
      ...prev,
      targetTemperature: temp
    }));
  };

  const toggleAutoMode = () => {
    setSensorData(prev => ({
      ...prev,
      autoMode: !prev.autoMode
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Droplets className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">ESP32 Систем за Наводњавање</h1>
          </div>
          <p className="text-white/70">Напредна Контролна Табла за Климу и Наводњавање</p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Temperature & Pressure */}
          <div className="lg:col-span-1 space-y-6">
            <TemperatureGauge 
              temperature={sensorData.temperature} 
              targetTemp={sensorData.targetTemperature}
            />
            <PressureGauge pressure={sensorData.pressure} />
          </div>

          {/* Temperature Control */}
          <div className="lg:col-span-1">
            <TemperatureControl
              currentTemp={sensorData.temperature}
              targetTemp={sensorData.targetTemperature}
              autoMode={sensorData.autoMode}
              onTargetChange={handleTargetTemperatureChange}
              onAutoModeToggle={toggleAutoMode}
            />
          </div>

          {/* Moisture Zones */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Зоне Влажности Земљишта</span>
              </div>
              <div className="space-y-4">
                <MoistureZone 
                  zone="Зона 1" 
                  moisture={sensorData.moisture.zone1} 
                  onToggle={() => toggleZone('zone1')}
                  active={true}
                />
                <MoistureZone 
                  zone="Зона 2" 
                  moisture={sensorData.moisture.zone2} 
                  onToggle={() => toggleZone('zone2')}
                  active={false}
                />
                <MoistureZone 
                  zone="Зона 3" 
                  moisture={sensorData.moisture.zone3} 
                  onToggle={() => toggleZone('zone3')}
                  active={true}
                />
                <MoistureZone 
                  zone="Зона 4" 
                  moisture={sensorData.moisture.zone4} 
                  onToggle={() => toggleZone('zone4')}
                  active={false}
                />
              </div>
            </div>
          </div>

          {/* Controls & Status */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <Power className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Контрола Вентила</span>
              </div>
              <div className="space-y-4">
                <ValveControl 
                  valve="Главни Вентил" 
                  active={sensorData.valves.valve1} 
                  onToggle={() => toggleValve('valve1')}
                  autoMode={sensorData.autoMode}
                  autoControlled={true}
                />
                <ValveControl 
                  valve="Секундарни Вентил" 
                  active={sensorData.valves.valve2} 
                  onToggle={() => toggleValve('valve2')}
                  autoMode={sensorData.autoMode}
                  autoControlled={true}
                />
              </div>
            </div>
            
            <SystemStatus data={sensorData} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white/50 text-sm">
          <p>ESP32 Систем за Наводњавање в2.1 | WebSocket: Порт 81 | MQTT: localhost:1883</p>
        </div>
      </div>

      {/* CSS за клизач */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}

export default App;