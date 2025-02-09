// src/components/HealthRecommendation.tsx
'use client';

interface HealthRecommendationProps {
  aqi: number;
}

export default function HealthRecommendation({ aqi }: HealthRecommendationProps) {
  const getStatus = () => {
    if (aqi <= 50) {
      return {
        text: 'Good',
        color: 'text-green-400',
        recommendation: 'Air quality is satisfactory. Enjoy outdoor activities!',
        icon: '😊',
      };
    }
    if (aqi <= 100) {
      return {
        text: 'Moderate',
        color: 'text-yellow-400',
        recommendation: 'Sensitive individuals should limit prolonged outdoor exertion.',
        icon: '😐',
      };
    }
    if (aqi <= 150) {
      return {
        text: 'Unhealthy',
        color: 'text-orange-400',
        recommendation: 'Everyone may begin to experience health effects. Limit outdoor activities.',
        icon: '😷',
      };
    }
    if (aqi <= 200){
      return {
        text: 'Unhealthy',
        color: 'text-red-500',
        recommendation: 'Everyone may experience health effects; sensitive groups may experience more serious effects.',
        icon: '🤢',
      }
    }
    if (aqi <= 300) {
      return {
        text: 'Very Unhealthy',
        color: 'text-purple-500',
        recommendation: 'Health alert: Everyone should avoid outdoor activities.',
        icon: '🤮',
      }
    }
    return {
      text: 'Hazardous',
      color: 'text-red-500',
      recommendation: 'Avoid all outdoor activity. Stay indoors with air purifiers.',
      icon: '⚠️',
      }
  }
  const {text,color,recommendation,icon } = getStatus();

  return (
    <div className={`bg-gray-800 rounded-2xl p-6 border-l-4 ${color} border`}>
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`text-4xl ${color}`}>{icon}</div>

        {/* Text Content */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{text} Air Quality</h3>
          <p className="text-gray-400 text-sm mt-1">{recommendation}</p>
        </div>

        {/* AQI Value */}
        <div className={`text-3xl font-bold ${color}`}>{aqi}</div>
      </div>
    </div>
  );
}