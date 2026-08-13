import MainLayout from '../layouts/MainLayout';

function AuthPage({ isLogin = true }: { isLogin?: boolean }) {
  return (
    <MainLayout>
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
    </MainLayout>
  );
}

export default AuthPage;