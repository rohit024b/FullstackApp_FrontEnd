import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [data, setData] = useState({
        userName: "",
        password: "",
        role: ""
    });

    const handleSignup = (e) => {
        const { value, name } = e.target;

        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    };

    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, data);
            if (response.status === 201) {
                alert("You are successfully registered. Please login!")
                navigate("/login")
            }
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    }

    return (
        <div className="flex flex-col gap-2 max-w-[500px] m-auto mt-[100px]">
            <h3 className="text-lg font-bold">Please Register</h3>
            {error && <p className="text-red-500">{error}</p>}
            <input
                name="userName"
                onChange={(e) => handleSignup(e)}
                value={data.userName}
                className="border-black border rounded-sm"
                type="text"
                id="userName"
                placeholder="ENTER USERNAME"
            />
            <input
                name="password"
                onChange={(e) => handleSignup(e)}
                value={data.password}
                className="border-black border rounded-sm"
                type="password"
                id="password"
                placeholder="ENTER PASSWORD"
            />
            <select
                value={data.role}
                onChange={(e) => handleSignup(e)}
                className="border-black border rounded-sm"
                name="role"
                id="role"
            >
                <option value="">Select User Type</option>
                <option value="reader">Reader</option>
                <option value="author">Author</option>
                <option value="admin">Admin</option>
            </select>
            <button onClick={handleRegister} className="bg-black text-white p-2">Register</button>
        </div>
    );
};

export default Signup;
