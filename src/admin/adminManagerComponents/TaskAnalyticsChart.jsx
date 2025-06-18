import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

export default function TaskAnalyticsChart({ tasks }) {
    const chartData = tasks.map(task => ({
        name: task.title.length > 10 ? task.title.slice(0, 10) + "…" : task.title,
        clicks: task.clicks || Math.floor(Math.random() * 200),
        submissions: task.submissions || Math.floor(Math.random() * 100)
    }));

    return (
        <div className="mt-8 w-full max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 transition-all">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
                    📊 Task Performance Overview
                </h2>

                <div className="w-full overflow-x-auto">
                    <div className="min-w-[500px] h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="clicks" fill="#6366F1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="submissions" fill="#10B981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
