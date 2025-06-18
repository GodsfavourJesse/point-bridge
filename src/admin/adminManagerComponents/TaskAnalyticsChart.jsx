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
        name: task.title.slice(0, 10),
        clicks: task.clicks || Math.floor(Math.random() * 200), // fallback for testing
        submissions: task.submissions || Math.floor(Math.random() * 100)
    }));

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Task Performance Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="clicks" fill="#8884d8" />
                    <Bar dataKey="submissions" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}