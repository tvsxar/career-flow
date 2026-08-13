import { Link } from 'react-router-dom';

const baseClass = 'font-semibold text-md rounded-md h-8 px-3 flex items-center justify-center drop-shadow-[0_0_4px_rgba(158,188,158,0.6)] cursor-pointer duration-200';

export default function AuthButtons() {
    return (
        <div className="flex gap-2 sm:gap-3">
            <Link
                to="/"
                className={`${baseClass} border border-[#A78BBD] text-[#A78BBD] hover:bg-[#A78BBD] hover:text-white`}
            >
                Sign In
            </Link>

            <Link
                to="/register"
                className={`${baseClass} bg-[#A78BBD] text-white hover:bg-[#A78BBD]/70`}
            >
                Sign Up
            </Link>
        </div>
    )
}