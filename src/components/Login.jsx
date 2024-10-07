import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({
        userName: "",
        password: ""
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

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data);
            console.log(response)
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token); // Save token to local storage
                localStorage.setItem("userId", response.data.userId);
                alert("You are successfully logged in!")
                navigate("/blogs")
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    }
    return <div className="flex flex-col gap-2 max-w-[500px] m-auto mt-[100px]">
        <h3 className="text-lg font-bold">Please Login</h3>
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
        <button onClick={handleLogin} className="bg-black text-white p-2">Login</button>
    </div>
}

export default Login