import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducers/store";
import { registerUser } from "../reducers/authReducer";
import { UserRound, UserRoundPlus, Mail, LockKeyhole, Lock, Phone, HardHat } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const userData = {
      email: formData.email,
      password: formData.password,
      re_enter_password: formData.confirmPassword, // API expects this field
      first_name: formData.firstName,
      last_name: formData.lastName,
      role: formData.role.toLowerCase().replace(/\s+/g, "-"), // Convert to API format
      phone_number: formData.phone,
    };
  
    const result = await dispatch(registerUser(userData));
  
    if (registerUser.fulfilled.match(result)) {
      navigate("/home"); // Redirect after successful signup
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1D3557] to-[#1D3557]/90 flex flex-col items-center justify-center">
      <div className="w-[300px] md:w-[400px] bg-white p-6 md:p-8 rounded-lg shadow-2xl border-2 border-[#2ECC71]">
        <div className="flex flex-col gap-1 items-center mb-8">
          <UserRoundPlus className="text-blue mb-2" size={30} />
          <h2 className="text-2xl md:text-3xl font-bold text-blue">Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="relative">
              <UserRound className="absolute left-3 top-3 opacity-50" size={20} />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="sign-up-input"
                required
              />
            </div>

            <div className="relative">
              <UserRound className="absolute left-3 top-3 opacity-50" size={20} />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="sign-up-input"
                required
              />
            </div>
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 opacity-50" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="sign-up-input"
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 opacity-50" size={21} />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="sign-up-input"
              required
            />
          </div>
          <div className="relative">
            <HardHat className="absolute left-3 top-3 opacity-50" size={21} />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="sign-up-input pr-2"
              required
            >
              <option value="">Select Role</option>
              <option value="Main Contractor">Main Contractor</option>
              <option value="Supervisor Contractor">Supervisor Contractor</option>
              <option value="Supervisor Consultant">Supervisor Consultant</option>
              <option value="Subcontractor">Subcontractor</option>
            </select>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 opacity-50" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="sign-up-input"
              required
            />
          </div>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-3 opacity-50" size={20} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="sign-up-input"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#2ECC71] text-white p-2 rounded-lg hover:bg-green-800 transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="flex justify-center mt-4 text-sm text-blue">
          <p className="mr-1">Already have an account?</p>
          <Link to="/login" className="text-green">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
