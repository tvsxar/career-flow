import { Navigate } from 'react-router-dom';
import { useSession } from '../lib/auth-client';
import MainLayout from '../layouts/MainLayout';

function DashboardPage() {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <MainLayout>
                <p>Loading...</p>
            </MainLayout>
        )
    }

    if (!session) {
        return (
            <Navigate to="/" replace />
        )
    }

    return (
        <MainLayout>Dashboard</MainLayout>
    );
}

export default DashboardPage;
