import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout({ children }: { children: React.ReactNode}) {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex-1">
                {children}
            </div>
            
            <Footer />
        </main>
    )
}

export default MainLayout
