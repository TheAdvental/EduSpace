const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// eslint-disable-next-line no-unused-vars
export const fakeLogin = async ({ email, password }) => {
    await delay(500);

    if (email === "teacher@test.com") {
        return {
            token: "fake-teacher-token",
            user: { email, role: "teacher" },
        };
    }

    if (email === "student@test.com") {
        return {
            token: "fake-student-token",
            user: { email, role: "student" },
        };
    }

    throw new Error("Invalid credentials");
};