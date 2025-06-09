import React, { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Wifi,
  Settings,
  Droplets,
  Thermometer,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Monitor,
  Smartphone,
  Router,
  Database,
  Code,
  Wrench,
  HelpCircle,
  ExternalLink,
  FileText,
  Video,
  Image,
  Globe
} from 'lucide-react';

interface InstructionSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: InstructionContent[];
}

interface InstructionContent {
  type: 'text' | 'list' | 'warning' | 'info' | 'code' | 'image' | 'video';
  content: string | string[];
  title?: string;
}

const InstructionsPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const instructionSections: InstructionSection[] = [
    {
      id: 'getting-started',
      title: 'Почетак Рада',
      icon: <Play className="w-5 h-5" />,
      content: [
        {
          type: 'text',
          content: 'Добродошли у систем за управљање баштом! Овај водич ће вам помоћи да се упознате са свим функцијама система.'
        },
        {
          type: 'list',
          title: 'Први кораци:',
          content: [
            'Повежите ESP32 уређај на струју',
            'Повежите се на WiFi мрежу (видети секцију WiFi)',
            'Проверите статус сензора на контролној табли',
            'Подесите режим рада (ручни или аутоматски)',
            'Конфигуришите распоред наводњавања'
          ]
        },
        {
          type: 'info',
          title: 'Важна напомена:',
          content: 'Пре првог коришћења, проверите да ли су сви сензори правилно повезани и калибрисани.'
        }
      ]
    },
    {
      id: 'wifi-setup',
      title: 'Подешавање WiFi Везе',
      icon: <Wifi className="w-5 h-5" />,
      content: [
        {
          type: 'text',
          content: 'Правилно подешавање WiFi везе је кључно за функционисање система.'
        },
        {
          type: 'list',
          title: 'Корак по корак:',
          content: [
            'Идите на страницу "Управљање WiFi"',
            'Кликните на "Скенирај" да пронађете доступне мреже',
            'Изаберите вашу WiFi мрежу из листе',
            'Унесите лозинку и кликните "Повежи се"',
            'Сачекајте потврду успешног повезивања'
          ]
        },
        {
          type: 'warning',
          title: 'Упозорење:',
          content: 'Уверите се да је WiFi мрежа стабилна. Нестабилна веза може утицати на рад система.'
        },
        {
          type: 'info',
          title: 'Савет:',
          content: 'За најбоље перформансе, користите 2.4GHz мрежу која има бољи домет од 5GHz.'
        }
      ]
    },
    {
      id: 'sensor-monitoring',
      title: 'Праћење Сензора',
      icon: <Monitor className="w-5 h-5" />,
      content: [
        {
          type: 'text',
          content: 'Систем користи различите сензоре за праћење услова у башти.'
        },
        {
          type: 'list',
          title: 'Доступни сензори:',
          content: [
            'Температура пластеника - оптимални опсег: 18-28°C',
            'Спољашња температура - за поређење са унутрашњом',
            'Температура инкубатора - за расад: 20-30°C',
            'Притисак воде - минимум 0.5 бара за рад',
            'Влажност земљишта - оптимално: 50-80%',
            'Брзина ветра - упозорење при >15 km/h',
            'Јачина светлости - за фотосинтезу',
            'CO₂ засићење - оптимално: 350-500 ppm'
          ]
        },
        {
          type: 'warning',
          title: 'Критичне вредности:',
          content: 'Црвене вредности указују на проблеме који захтевају хитну пажњу!'
        }
      ]
    },
    {
      id: 'irrigation-control',
      title: 'Контрола Наводњавања',
      icon: <Droplets className="w-5 h-5" />,
      content: [
        {
          type: 'text',
          content: 'Систем подржава и ручну и аутоматску контролу наводњавања.'
        },
        {
          type: 'list',
          title: 'Ручни режим:',
          content: [
            'Директна контрола вентила',
            'Тренутно укључивање/искључивање',
            'Потребно је стално праћење',
            'Користите када желите потпуну контролу'
          ]
        },
        {
          type: 'list',
          title: 'Аутоматски режим:',
          content: [
            'Заснован на распореду и сензорима',
            'Аутоматско прилагођавање условима',
            'Штеди воду и време',
            'Препоручено за свакодневну употребу'
          ]
        },
        {
          type: 'info',
          title: 'Распоред наводњавања:',
          content: 'У аутоматском режиму можете креирати распореде за различите дане и времена.'
        }
      ]
    },
    {
      id: 'temperature-control',
      title: 'Контрола Температуре',
      icon: <Thermometer className="w-5 h-5" />,
      content: [
        {
          type: 'text',
          content: 'Систем аутоматски регулише температуру помоћу вентилатора и других механизама.'
        },
        {
          type: 'list',
          title: 'Функције:',
          content: [
            'Подешавање циљане температуре пластеника',
            'Контрола температуре инкубатора за расад',
            'Аутоматска регулација брзине вентилатора',
            'Заштита од прегревања',
            'Оптимизација за различите биљке'
          ]
        },
        {
          type: 'warning',
          title: 'Пажња:',
          content: 'Нагле промене температуре могу штетити биљкама. Систем постепено прилагођава услове.'
        }
      ]
    },
    {
      id: 'plant-management',
      title: 'Управљање Биљкама',
      icon: <Database className="w-5 h-5" />,
      content: [
        {
          type: 'text',
          content: 'Календар биљака помаже вам да пратите све ваше биљке и активности.'
        },
        {
          type: 'list',
          title: 'Могућности:',
          content: [
            'Додавање нових биљака са детаљима',
            'Праћење статуса здравља биљака',
            'Планирање активности (заливање, ђубрење, берба)',
            'Вођење белешки о раду',
            'Фотографисање напретка'
          ]
        },
        {
          type: 'info',
          title: 'Савети:',
          content: 'Редовно ажурирајте статус биљака за боље планирање и праћење.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Решавање Проблема',
      icon: <Wrench className="w-5 h-5" />,
      content: [
        {
          type: 'text',
          content: 'Најчешћи проблеми и њихова решења:'
        },
        {
          type: 'list',
          title: 'WiFi проблеми:',
          content: [
            'Проверите да ли је лозинка тачна',
            'Рестартујте ESP32 уређај',
            'Проверите јачину сигнала',
            'Покушајте са другом мрежом'
          ]
        },
        {
          type: 'list',
          title: 'Сензори не раде:',
          content: [
            'Проверите физичке везе',
            'Рестартујте систем',
            'Калибрирајте сензоре',
            'Замените неисправне сензоре'
          ]
        },
        {
          type: 'list',
          title: 'Вентили се не отварају:',
          content: [
            'Проверите притисак воде',
            'Очистите вентиле од нечистоћа',
            'Проверите електричне везе',
            'Тестирајте у ручном режиму'
          ]
        },
        {
          type: 'warning',
          title: 'Када контактирати подршку:',
          content: 'Ако проблем и даље постоји након покушаја решавања, контактирајте техничку подршку.'
        }
      ]
    },
    {
      id: 'maintenance',
      title: 'Одржавање Система',
      icon: <Settings className="w-5 h-5" />,
      content: [
        {
          type: 'text',
          content: 'Редовно одржавање обезбеђује дуготрајан и поуздан рад система.'
        },
        {
          type: 'list',
          title: 'Недељно одржавање:',
          content: [
            'Очистите сензоре од прашине и нечистоћа',
            'Проверите ниво воде у резервоару',
            'Тестирајте рад вентила',
            'Проверите WiFi везу'
          ]
        },
        {
          type: 'list',
          title: 'Месечно одржавање:',
          content: [
            'Калибрирајте сензоре',
            'Очистите филтере за воду',
            'Проверите све електричне везе',
            'Ажурирајте софтвер ако је потребно'
          ]
        },
        {
          type: 'list',
          title: 'Сезонско одржавање:',
          content: [
            'Замените батерије у бежичним сензорима',
            'Проверите изолацију каблова',
            'Очистите и подмажите покретне делове',
            'Направите резервну копију подешавања'
          ]
        }
      ]
    },
    {
      id: 'safety',
      title: 'Безбедност и Сигурност',
      icon: <Shield className="w-5 h-5" />,
      content: [
        {
          type: 'text',
          content: 'Важне безбедносне мере за сигуран рад система.'
        },
        {
          type: 'warning',
          title: 'Електрична безбедност:',
          content: 'Никада не радите на систему док је под напоном. Искључите струју пре било каквих интервенција.'
        },
        {
          type: 'list',
          title: 'Безбедносне мере:',
          content: [
            'Користите заштитну опрему при раду',
            'Држите електричне компоненте сувим',
            'Не излажите уређаје директној киши',
            'Редовно проверавајте стање каблова',
            'Користите УПС за заштиту од нестанка струје'
          ]
        },
        {
          type: 'info',
          title: 'Заштита података:',
          content: 'Редовно правите резервне копије подешавања и података о биљкама.'
        }
      ]
    },
    {
      id: 'advanced-features',
      title: 'Напредне Функције',
      icon: <Code className="w-5 h-5" />,
      content: [
        {
          type: 'text',
          content: 'Напредне функције за искусне кориснике.'
        },
        {
          type: 'list',
          title: 'MQTT интеграција:',
          content: [
            'Повежите са Home Assistant',
            'Интегришите са другим IoT уређајима',
            'Креирајте сложене аутоматизације',
            'Удаљено праћење преко интернета'
          ]
        },
        {
          type: 'list',
          title: 'API приступ:',
          content: [
            'REST API за спољне апликације',
            'WebSocket за реално време',
            'JSON формат података',
            'Аутентификација и безбедност'
          ]
        },
        {
          type: 'code',
          title: 'Пример API позива:',
          content: 'GET /api/sensors\nPOST /api/irrigation/start\nWS /ws/realtime'
        }
      ]
    }
  ];

  const renderContent = (content: InstructionContent) => {
    switch (content.type) {
      case 'text':
        return (
          <p className="text-white/80 leading-relaxed">
            {content.content as string}
          </p>
        );
      
      case 'list':
        return (
          <div>
            {content.title && (
              <h4 className="text-white font-medium mb-2">{content.title}</h4>
            )}
            <ul className="space-y-2">
              {(content.content as string[]).map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'warning':
        return (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                {content.title && (
                  <h4 className="text-red-300 font-medium mb-1">{content.title}</h4>
                )}
                <p className="text-red-200 text-sm">{content.content as string}</p>
              </div>
            </div>
          </div>
        );
      
      case 'info':
        return (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                {content.title && (
                  <h4 className="text-blue-300 font-medium mb-1">{content.title}</h4>
                )}
                <p className="text-blue-200 text-sm">{content.content as string}</p>
              </div>
            </div>
          </div>
        );
      
      case 'code':
        return (
          <div>
            {content.title && (
              <h4 className="text-white font-medium mb-2">{content.title}</h4>
            )}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <pre className="text-green-300 text-sm font-mono whitespace-pre-wrap">
                {content.content as string}
              </pre>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-white" />
          <h1 className="text-2xl font-bold text-white">Упутства за Коришћење</h1>
        </div>
        <p className="text-white/70">
          Детаљан водич за коришћење система за управљање баштом. 
          Кликните на секције испод да бисте проширили садржај.
        </p>
      </div>

      {/* Quick Links */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-white font-semibold mb-4">Брзе Везе</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => toggleSection('getting-started')}
            className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 px-3 py-2 rounded-lg transition-colors text-sm"
          >
            <Play className="w-4 h-4" />
            Почетак
          </button>
          <button
            onClick={() => toggleSection('wifi-setup')}
            className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-3 py-2 rounded-lg transition-colors text-sm"
          >
            <Wifi className="w-4 h-4" />
            WiFi
          </button>
          <button
            onClick={() => toggleSection('troubleshooting')}
            className="flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 px-3 py-2 rounded-lg transition-colors text-sm"
          >
            <Wrench className="w-4 h-4" />
            Проблеми
          </button>
          <button
            onClick={() => toggleSection('safety')}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-2 rounded-lg transition-colors text-sm"
          >
            <Shield className="w-4 h-4" />
            Безбедност
          </button>
        </div>
      </div>

      {/* Instruction Sections */}
      <div className="space-y-4">
        {instructionSections.map((section) => (
          <div
            key={section.id}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-white">{section.icon}</div>
                <h2 className="text-white font-semibold text-left">{section.title}</h2>
              </div>
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="w-5 h-5 text-white/60" />
              ) : (
                <ChevronRight className="w-5 h-5 text-white/60" />
              )}
            </button>
            
            {expandedSections.includes(section.id) && (
              <div className="px-6 pb-6 space-y-4 border-t border-white/10">
                {section.content.map((content, index) => (
                  <div key={index}>
                    {renderContent(content)}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Support Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-white" />
          <h2 className="text-white font-semibold">Додатна Помоћ</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-white font-medium">Документација</span>
            </div>
            <p className="text-white/60 text-sm mb-3">
              Детаљна техничка документација
            </p>
            <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm">
              <ExternalLink className="w-3 h-3" />
              Отвори
            </button>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-4 h-4 text-green-400" />
              <span className="text-white font-medium">Видео Туторијали</span>
            </div>
            <p className="text-white/60 text-sm mb-3">
              Корак по корак видео упутства
            </p>
            <button className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm">
              <ExternalLink className="w-3 h-3" />
              Погледај
            </button>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-purple-400" />
              <span className="text-white font-medium">Заједница</span>
            </div>
            <p className="text-white/60 text-sm mb-3">
              Форум корисника и подршка
            </p>
            <button className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm">
              <ExternalLink className="w-3 h-3" />
              Приступи
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;