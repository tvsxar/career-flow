import AuthButtons from './AuthButtons';

export default function Navbar() {

    return (
        <nav
            className="flex select-none items-center justify-between 
            border-b border-gray-100/30 py-4 px-4 sm:px-12 lg:px-25">

            <div className='font-bold text-lg sm:text-2xl flex items-center justify-center'>
                Hire<span className="text-[#9297D3] drop-shadow-[0_0_4px_rgba(146,151,211,0.8)]">path</span>
            </div>

            {false
                ? <div className="h-8 w-32 bg-zinc-300 rounded animate-pulse" />
                : <AuthButtons />}
        </nav>
    )
}