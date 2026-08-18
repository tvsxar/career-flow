export default function Footer() {
    const linkClasses = "hover:text-[#9297D3] transition hover:drop-shadow-[0_0_4px_rgba(146,151,211,0.8)]";

    return (
        <footer className="border-t border-gray-100/30 py-8 px-6 text-gray-400">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Brand */}
                <div className="flex flex-col items-center sm:items-start">
                    <h3 className="font-bold text-lg text-[#F4F4F5] tracking-wide">
                        Hire
                        <span className="text-[#9297D3] drop-shadow-[0_0_4px_rgba(146,151,211,0.8)]">
                            path
                        </span>
                    </h3>

                    <p className="text-gray-500 text-xs mt-1">
                        © {new Date().getFullYear()} All Rights Reserved
                    </p>
                </div>

                {/* Links */}
                <div className="flex gap-6 text-sm">
                    <a
                        href="https://github.com/tvsxar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClasses}
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/poiatsyka/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClasses}
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
