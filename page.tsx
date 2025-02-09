// src/app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import dynamic from 'next/dynamic';
import AQIMeter from '@/components/AQIMeter';
import SensorCard from '@/components/SensorCard';
import HealthRecommendation from '@/components/HealthRecommendation';

const LiveChart = dynamic(() => import('@/components/LiveChart'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-800 rounded-2xl animate-pulse" />
});

export default function Home() {
  const [data, setData] = useState({
    aqi: 0,
    pm25: 0,
    pm10: 0,
    temp: 0,
    humidity: 0,
    timestamp: Date.now()
  });

  useEffect(() => {
    const deviceRef = ref(rtdb, 'devices/device001');
    return onValue(deviceRef, (snapshot) => {
      setData(snapshot.val());
    });
  }, []);
  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main AQI Visualization */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl">
          <AQIMeter value={data.aqi} />
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <SensorCard
              label="PM2.5"
              value={data.pm25}
              unit="μg/m³"
              gradient={['#4ADE80', '#FACC15', '#EF4444']}
              max={100}
            />
            <SensorCard
              label="PM10"
              value={data.pm10}
              unit="μg/m³"
              gradient={['#4ADE80', '#FACC15', '#EF4444']}
              max={200}
            />
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-8">
          <HealthRecommendation aqi={data.aqi} />
          
          <div className="bg-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Weather Conditions</h3>
            <div className="grid grid-cols-2 gap-4">
              <SensorCard
                label="Temperature"
                value={data.temp}
                unit="°C"
                gradient={['#60A5FA', '#818CF8']}
                max={50}
              />
              <SensorCard
                label="Humidity"
                value={data.humidity}
                unit="%"
                gradient={['#60A5FA', '#818CF8']}
                max={100}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Data Chart */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">24 Hour Trend</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600">
              AQI
            </button>
            <button className="px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600">
              Temperature
            </button>
          </div>
        </div>
        <LiveChart />
      </div>

      {/* City Ranking */}
      <div className="bg-gradient-to-r from-gray-800 to-blue-900/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">City Ranking</h3>
            <p className="text-gray-400">Current rank: 11th most polluted</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">1.4x</p>
            <p className="text-sm text-gray-400">Above national average</p>
          </div>
        </div>
      </div>
    </div>
  );
}