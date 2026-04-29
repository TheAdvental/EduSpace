/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useAuthStore } from "../components/tempStorage.jsx";

export default function Dashboard() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    if (!user) return <div>Loading...</div>;

    const [showCourses, setShowCourses] = useState(false);

    const courses = [
        { id: 1, name: "Math" },
        { id: 2, name: "Physics" },
        { id: 3, name: "Programming" },
    ];

    return (
        <div>
            <h1>Hello, {user.name}!</h1>

            <h3>Welcome, {user.firstName} {user.lastName}</h3>

            <p><b>Email:</b> {user.email}</p>
            <p><b>Role:</b> {user.role}</p>
            <p><b>Birth date:</b> {user.birthDate}</p>

            {user.role === "student" && (
                <p><b>Group:</b> {user.group}</p>
            )}

            {user.role === "teacher" && (
                <p><b>Department:</b> {user.department}</p>
            )}

            {user.role === "teacher" && (
                <div>
                    <h2>Teacher Panel</h2>
                    <button>Create Course</button>
                </div>
            )}

            {user.role === "student" && (
                <div>
                    <h2>Student Panel</h2>
                    {/* КНОПКА */}
                    <button onClick={() => setShowCourses(!showCourses)}>
                        {showCourses ? "Hide Courses" : "Show Courses"}
                    </button>

                    {/* СПИСОК (умовний рендеринг) */}
                    {showCourses && (
                        <ul>
                            {courses.map((course) => (
                                <li key={course.id}>{course.name}</li>
                            ))}
                        </ul>
                    )}

                </div>
            )}

            <button onClick={logout}>Logout</button>
        </div>
    );
}