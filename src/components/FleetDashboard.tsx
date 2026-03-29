import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface RobotTelemetry {
  id: string;
  status: 'online' | 'charging' | 'tasking' | 'error';
  battery: number;
  current_task: string;
  uptime_hours: number;
}

export const FleetDashboard: React.FC = () => {
  const [robots, setRobots] = useState<RobotTelemetry[]>([]);
  const [humanToRobotRatio, setHumanToRobotRatio] = useState(1 / 5); // 1 human per 5 robots

  useEffect(() => {
    // Mock telemetry data for demonstration
    setRobots([
      { id: 'UR10e-01', status: 'tasking', battery: 85, current_task: 'Restocking Aisle 4', uptime_hours: 120 },
      { id: 'Jiaxin-01', status: 'online', battery: 92, current_task: 'Idle', uptime_hours: 45 },
      { id: 'Pepper-01', status: 'tasking', battery: 60, current_task: 'Customer Greeting', uptime_hours: 200 },
    ]);
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6">RaaS Fleet Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-900 p-4 rounded-lg">
          <h3 className="text-sm">Active Robots</h3>
          <p className="text-3xl font-bold">{robots.filter(r => r.status === 'tasking').length}</p>
        </div>
        <div className="bg-green-900 p-4 rounded-lg">
          <h3 className="text-sm">Human:Robot Ratio</h3>
          <p className="text-3xl font-bold">1:{Math.round(1 / humanToRobotRatio)}</p>
        </div>
        <div className="bg-purple-900 p-4 rounded-lg">
          <h3 className="text-sm">MRR (Monthly)</h3>
          <p className="text-3xl font-bold">${(robots.length * 1500).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl mb-4">Robot Status</h2>
        <div className="space-y-2">
          {robots.map(robot => (
            <div key={robot.id} className="flex justify-between items-center p-2 bg-gray-700 rounded">
              <span>{robot.id}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                robot.status === 'tasking' ? 'bg-green-600' :
                robot.status === 'charging' ? 'bg-yellow-600' :
                robot.status === 'error' ? 'bg-red-600' : 'bg-gray-600'
              }`}>{robot.status}</span>
              <span>🔋 {robot.battery}%</span>
              <span>📋 {robot.current_task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
