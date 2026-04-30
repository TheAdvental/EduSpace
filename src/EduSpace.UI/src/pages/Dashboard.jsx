/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useAuthStore } from "../components/tempStorage.jsx";

export default function Dashboard() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const [activeTab, setActiveTab] = useState('main');
    const [showCourses, setShowCourses] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(user?.group || "Група");

    if (!user) return <div style={{ padding: '20px' }}>Loading...</div>;

    const courses = [
        { id: 1, name: "Math" },
        { id: 2, name: "Physics" },
        { id: 3, name: "Programming" },
    ];

    return (
        <div style={{ backgroundColor: '#f0fdf4', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>

            {/* button on top */}
            <div style={{ display: 'flex',justifyContent: 'center' ,gap: '10px', marginBottom: '20px' }}>
                <button
                    onClick={() => setActiveTab('main')}
                    style={{
                        padding: '14px 28px',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '16px',
                        background: activeTab === 'main' ? '#10b981' : '#e5e7eb',
                        color: activeTab === 'main' ? 'white' : '#374151',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Main
                </button>
                <button
                    onClick={() => setActiveTab('diary')}
                    style={{
                        padding: '14px 28px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '16px',
                        background: activeTab === 'diary' ? '#10b981' : '#e5e7eb',
                        color: activeTab === 'diary' ? 'white' : '#374151',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Grade control
                </button>
            </div>

            <div style={{ background: 'white', padding: '20px', borderRadius: '15px', border: '1px solid #d1fae5' }}>

                {/* main */}
                {activeTab === 'main' && (
                    <div>
                        <h1>Hello, {user.name}!</h1>
                        <h3>Welcome, {user.firstName} {user.lastName}</h3>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Role:</b> {user.role}</p>
                        <p><b>Birth date:</b> {user.birthDate}</p>

                        {user.role === "student" && <p><b>Group:</b> {user.group}</p>}
                        {user.role === "teacher" && <p><b>Department:</b> {user.department}</p>}

                        <hr style={{ border: '0.5px solid #eee', margin: '20px 0' }} />

                        {/* розклад */}
                        <h3 style={{ color: '#065f46' }}>Weekly Schedule</h3>
                        <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingBottom: '10px' }}>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                                <div key={day} style={{ minWidth: '100px', border: '1px solid #10b981', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                                    <div style={{ fontWeight: 'bold', color: '#059669' }}>{day}</div>
                                    <div style={{ fontSize: '12px' }}>8:30 - Math</div>
                                </div>
                            ))}
                        </div>

                        {/* courses */}
                        {user.role === "student" && (
                            <div style={{ marginTop: '20px' }}>
                                <h3>My Courses</h3>
                                <button onClick={() => setShowCourses(!showCourses)} style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                                    {showCourses ? "Hide Courses" : "Show Courses"}
                                </button>
                                {showCourses && (
                                    <ul>
                                        {courses.map((course) => <li key={course.id}>{course.name}</li>)}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* diary */}
                {activeTab === 'diary' && (
                    <div>
                        <h2 style={{ color: '#065f46' }}>List of Ratings</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #10b981', textAlign: 'left' }}>
                                    <th style={{ padding: '10px' }}>Subject</th>
                                    <th style={{ padding: '10px' }}>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '10px' }}>Software Engineering</td>
                                    <td style={{ padding: '10px' }}>-95/100</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px' }}>Mathematics</td>
                                    <td style={{ padding: '10px' }}>0/100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                <br />
                <button onClick={logout} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
        </div>
    );
}