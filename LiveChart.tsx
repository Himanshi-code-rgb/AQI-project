// src/components/LiveChart.tsx
'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface LiveChartProps {
  data?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

export default function LiveChart({ data }: LiveChartProps) {
  const defaultData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'AQI',
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 300)),
        borderColor: '#4ADE80',
        backgroundColor: '#4ADE8050',
      },
    ],
  };

  return (
    <div className="h-96">
      <Line
        data={data || defaultData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: '#1F2937',
              titleColor: '#F3F4F6',
              bodyColor: '#D1D5DB',
              borderColor: '#374151',
              borderWidth: 1,
            },
          },
          scales: {
            x: {
              grid: {
                color: '#374151',
              },
              ticks: {
                color: '#9CA3AF',
              },
            },
            y: {
              grid: {
                color: '#374151',
              },
              ticks: {
                color: '#9CA3AF',
              },
            },
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
          },
        }}
      />
    </div>
  );
}