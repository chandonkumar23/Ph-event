
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { FaUser, FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';
const Login = ({ handleClose, open }) => {
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        if (open) {
            setTimeout(() => setShow(true), 10); // Slight delay to trigger animation
        } else {
            setShow(false);
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">

            <div
                className={`bg-white text-white rounded-lg shadow-lg p-6 w-full max-w-[700px] transform transition-all duration-500 ${show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
                    }`}
            >
                <div>
                    <div className='flex justify-between items-center border-b-2 p-2 mb-10'>
                        <h2 className='text-black'>Login</h2>
                        <CloseIcon onClick={handleClose} className='text-black' />
                    </div>
                    <div>
                        <div className="w-full max-w-full bg-white p-6 rounded-lg  space-y-4">

                            {/* Username Input */}
                            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="bg-transparent w-full outline-none text-gray-700"
                                />
                                <FaUser className="text-gray-400" />
                            </div>

                            {/* Password Input */}
                            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="bg-transparent w-full outline-none text-gray-700"
                                />
                                <button onClick={() => setShowPassword(!showPassword)} type="button">
                                    {showPassword ? (
                                        <FaEyeSlash className="text-gray-400" />
                                    ) : (
                                        <FaEye className="text-gray-400" />
                                    )}
                                </button>
                            </div>

                            {/* Log In */}
                            <button className="w-full py-3 rounded-md text-white font-semibold bg-gradient-to-br  hover:opacity-90" style={{
                                background: "linear-gradient(to right, #833ab4, #5851db, #1e90ff)",
                            }}>
                                Log In
                            </button>

                            {/* Bottom Links */}
                            <div className="flex justify-between items-start text-xs text-gray-600">
                                <div>
                                    <label className="inline-flex items-center gap-1">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span>Remember Me</span>
                                    </label>
                                    <div>
                                        <a href="#" className="hover:underline block">Create An Account</a>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <a href="#" className="hover:underline block">Forgot Your Password?</a>
                                    <a href="#" className="hover:underline block">Forgot Your Username?</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>





            </div>

        </div>
    );
};

export default Login;
