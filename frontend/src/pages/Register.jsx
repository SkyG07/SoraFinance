import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success("Account created successfully!");

      // Save token and login automatically
      onRegister(data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data); // ← see real backend message
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <form
        className="bg-base-100 dark:bg-base-200 p-6 rounded-lg shadow w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="input w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="input w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
