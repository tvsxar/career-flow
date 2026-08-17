import { Link } from 'react-router-dom';

const baseClass = 'font-semibold text-md rounded-md h-8 px-3 flex items-center justify-center drop-shadow-[0_0_4px_rgba(146,151,211,0.8)] cursor-pointer duration-200';

export default function AuthButtons() {
    return (
        <div className="flex gap-2 sm:gap-3">
            <Link
                to="/"
                className={`${baseClass} border border-[#9297D3] text-[#9297D3] hover:bg-[#9297D3] hover:text-black`}
            >
                Sign In
            </Link>

            <Link
                to="/register"
                className={`${baseClass} bg-[#9297D3] text-black hover:bg-[#9297D3]/70`}
            >
                Sign Up
            </Link>
        </div>
    )
}