import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Droplets,
  Sun,
  Scissors,
  Sprout,
  Flower,
  Leaf,
  Bug,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Camera,
  BookOpen,
  Target
} from 'lucide-react';

interface Plant {
  id: string;
  name: string;
  variety: string;
  plantedDate: string;
  location: string;
  status: 'healthy' | 'needs-attention' | 'flowering' | 'harvesting';
  lastWatered: string;
  nextWatering: string;
  notes: string;
  image?: string;
}

interface Activity {
  id: string;
  plantId: string;
  type: 'watering' | 'fertilizing' | 'pruning' | 'harvesting' | 'planting' | 'pest-control';
  date: string;
  notes: string;
  completed: boolean;
}

const CalendarPage: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([
    {
      id: '1',
      name: 'Парадајз',
      variety: 'Чери парадајз',
      plantedDate: '2024-03-15',
      location: 'Пластеник - Ред 1',
      status: 'flowering',
      lastWatered: '2024-12-20',
      nextWatering: '2024-12-22',
      notes: 'Развија се добро, почиње цветање',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg'
    },
    {
      id: '2',
      name: 'Краставац',
      variety: 'Дуги зелени',
      plantedDate: '2024-03-20',
      location: 'Пластеник - Ред 2',
      status: 'healthy',
      lastWatered: '2024-12-20',
      nextWatering: '2024-12-21',
      notes: 'Здраве биљке, редовно заливање',
      image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg'
    },
    {
      id: '3',
      name: 'Салата',
      variety: 'Ледена салата',
      plantedDate: '2024-04-01',
      location: 'Отворено - Грядка А',
      status: 'harvesting',
      lastWatered: '2024-12-19',
      nextWatering: '2024-12-22',
      notes: 'Спремна за бербу',
      image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg'
    },
    {
      id: '4',
      name: 'Паприка',
      variety: 'Црвена бабура',
      plantedDate: '2024-03-10',
      location: 'Пластеник - Ред 3',
      status: 'needs-attention',
      lastWatered: '2024-12-18',
      nextWatering: '2024-12-21',
      notes: 'Потребно је ђубрење и провера за штетнике',
      image: 'https://images.pexels.com/photos/594137/pexels-photo-594137.jpeg'
    }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      plantId: '1',
      type: 'watering',
      date: '2024-12-22',
      notes: 'Редовно заливање',
      completed: false
    },
    {
      id: '2',
      plantId: '2',
      type: 'watering',
      date: '2024-12-21',
      notes: 'Заливање краставца',
      completed: false
    },
    {
      id: '3',
      plantId: '3',
      type: 'harvesting',
      date: '2024-12-21',
      notes: 'Берба салате',
      completed: false
    },
    {
      id: '4',
      plantId: '4',
      type: 'fertilizing',
      date: '2024-12-23',
      notes: 'Ђубрење паприке',
      completed: false
    },
    {
      id: '5',
      plantId: '1',
      type: 'pruning',
      date: '2024-12-25',
      notes: 'Обрезивање парадајза',
      completed: false
    }
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddPlant, setShowAddPlant] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);

  const getStatusIcon = (status: Plant['status']) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'needs-attention': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'flowering': return <Flower className="w-4 h-4 text-pink-400" />;
      case 'harvesting': return <Scissors className="w-4 h-4 text-orange-400" />;
      default: return <Leaf className="w-4 h-4 text-green-400" />;
    }
  };

  const getStatusText = (status: Plant['status']) => {
    switch (status) {
      case 'healthy': return 'Здраво';
      case 'needs-attention': return 'Потребна пажња';
      case 'flowering': return 'Цвета';
      case 'harvesting': return 'За бербу';
      default: return 'Здраво';
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'watering': return <Droplets className="w-4 h-4 text-blue-400" />;
      case 'fertilizing': return <Sprout className="w-4 h-4 text-green-400" />;
      case 'pruning': return <Scissors className="w-4 h-4 text-orange-400" />;
      case 'harvesting': return <Scissors className="w-4 h-4 text-yellow-400" />;
      case 'planting': return <Sprout className="w-4 h-4 text-green-500" />;
      case 'pest-control': return <Bug className="w-4 h-4 text-red-400" />;
      default: return <Leaf className="w-4 h-4 text-green-400" />;
    }
  };

  const getActivityText = (type: Activity['type']) => {
    switch (type) {
      case 'watering': return 'Заливање';
      case 'fertilizing': return 'Ђубрење';
      case 'pruning': return 'Обрезивање';
      case 'harvesting': return 'Берба';
      case 'planting': return 'Садња';
      case 'pest-control': return 'Заштита од штетника';
      default: return 'Активност';
    }
  };

  const getActivitiesForDate = (date: string) => {
    return activities.filter(activity => activity.date === date);
  };

  const getUpcomingActivities = () => {
    const today = new Date().toISOString().split('T')[0];
    return activities
      .filter(activity => activity.date >= today && !activity.completed)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  };

  const toggleActivityComplete = (activityId: string) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const PlantCard: React.FC<{ plant: Plant }> = ({ plant }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-200">
      <div className="flex items-start gap-3">
        {plant.image && (
          <img 
            src={plant.image} 
            alt={plant.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white font-semibold">{plant.name}</h3>
            {getStatusIcon(plant.status)}
          </div>
          <div className="text-sm text-white/70 space-y-1">
            <div>{plant.variety}</div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {plant.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Посађено: {new Date(plant.plantedDate).toLocaleDateString('sr-RS')}
            </div>
          </div>
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs mt-2 ${
            plant.status === 'healthy' ? 'bg-green-500/20 text-green-300' :
            plant.status === 'needs-attention' ? 'bg-yellow-500/20 text-yellow-300' :
            plant.status === 'flowering' ? 'bg-pink-500/20 text-pink-300' :
            'bg-orange-500/20 text-orange-300'
          }`}>
            {getStatusIcon(plant.status)}
            {getStatusText(plant.status)}
          </div>
        </div>
      </div>
      {plant.notes && (
        <div className="mt-3 p-2 bg-white/5 rounded-lg">
          <p className="text-xs text-white/60">{plant.notes}</p>
        </div>
      )}
    </div>
  );

  const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
    const plant = plants.find(p => p.id === activity.plantId);
    
    return (
      <div className={`bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 ${
        activity.completed ? 'opacity-60' : ''
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getActivityIcon(activity.type)}
            <span className="text-white font-medium">{getActivityText(activity.type)}</span>
          </div>
          <button
            onClick={() => toggleActivityComplete(activity.id)}
            className={`p-1 rounded-full transition-colors ${
              activity.completed 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-sm text-white/70 space-y-1">
          <div className="flex items-center gap-1">
            <Leaf className="w-3 h-3" />
            {plant?.name} ({plant?.variety})
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(activity.date).toLocaleDateString('sr-RS')}
          </div>
        </div>
        
        {activity.notes && (
          <div className="mt-2 p-2 bg-white/5 rounded-lg">
            <p className="text-xs text-white/60">{activity.notes}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <Sprout className="w-5 h-5 text-green-400" />
            <span className="text-white/70 text-sm">Укупно биљака</span>
          </div>
          <div className="text-2xl font-bold text-white">{plants.length}</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/70 text-sm">Здраве биљке</span>
          </div>
          <div className="text-2xl font-bold text-green-300">
            {plants.filter(p => p.status === 'healthy').length}
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-white/70 text-sm">Потребна пажња</span>
          </div>
          <div className="text-2xl font-bold text-yellow-300">
            {plants.filter(p => p.status === 'needs-attention').length}
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-white/70 text-sm">Предстојеће активности</span>
          </div>
          <div className="text-2xl font-bold text-blue-300">
            {activities.filter(a => !a.completed && a.date >= new Date().toISOString().split('T')[0]).length}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plants Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Моје Биљке</span>
              </div>
              <button
                onClick={() => setShowAddPlant(true)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Додај Биљку
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plants.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          </div>

          {/* Today's Activities */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Данашње Активности</span>
            </div>
            
            <div className="space-y-3">
              {getActivitiesForDate(new Date().toISOString().split('T')[0]).length === 0 ? (
                <div className="text-center text-white/60 py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Нема планираних активности за данас</p>
                </div>
              ) : (
                getActivitiesForDate(new Date().toISOString().split('T')[0]).map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Activities */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Предстојеће Активности</span>
              </div>
              <button
                onClick={() => setShowAddActivity(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors text-sm"
              >
                <Plus className="w-3 h-3" />
                Додај
              </button>
            </div>
            
            <div className="space-y-3">
              {getUpcomingActivities().map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Савети за Башту</span>
            </div>
            
            <div className="space-y-3 text-sm text-white/80">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="font-medium text-blue-300 mb-1">Заливање</div>
                <div>Заливајте рано ујутру или увече да избегнете испаравање</div>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <div className="font-medium text-green-300 mb-1">Ђубрење</div>
                <div>Користите органска ђубрива за здравији раст биљака</div>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <div className="font-medium text-yellow-300 mb-1">Заштита</div>
                <div>Редовно проверавајте биљке за знакове болести или штетника</div>
              </div>
            </div>
          </div>

          {/* Weather Integration Placeholder */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Временска Прогноза</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Данас</span>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span className="text-white">22°C</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Сутра</span>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span className="text-white">24°C</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Прекосутра</span>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-white">19°C</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-xs text-blue-200">
                <div className="font-medium mb-1">Препорука:</div>
                <div>Очекује се киша прекосутра - прилагодите заливање</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;