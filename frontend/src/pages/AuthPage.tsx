import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { signIn, signUp } from '../lib/auth-client';
import MainLayout from '../layouts/MainLayout';

function AuthPage({ isLogin = true }: { isLogin?: boolean }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    identifier: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;

      if (!isLogin) {
        result = await signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.username,
          username: formData.username,
        });
      } else if (formData.identifier.includes('@')) {
        result = await signIn.email({
          email: formData.identifier,
          password: formData.password,
        });
      } else {
        result = await signIn.username({
          username: formData.identifier,
          password: formData.password,
        });
      }

      if (result.error) {
        setError(result.error.message ?? 'Authentication failed');
        return;
      }

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="min-h-full px-4 py-10 sm:px-8 lg:px-16">
        <div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-12 lg:grid-cols-2">

          <section className="hidden lg:block">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#292933] bg-[#19191F] px-4 py-2 text-sm text-zinc-400">
                <span className="h-2 w-2 rounded-full bg-[#9297D3] shadow-[0_0_10px_rgba(146,151,211,0.8)]" />
                Your job search workspace
              </div>

              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-zinc-100 xl:text-6xl">
                Track your job search.
                <span className="block text-[#9297D3]">
                  Stay in control.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
                Keep your applications, interviews and offers organized in one
                simple workspace.
              </p>
            </div>
          </section>

          <section className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-3xl border border-[#292933] bg-[#19191F] p-6 shadow-[0_0_50px_rgba(146,151,211,0.06)] sm:p-8">

              <div className="mb-8">
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">
                  {isLogin ? 'Welcome back' : 'Create an account'}
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {isLogin
                    ? 'Sign in to continue managing your job search.'
                    : 'Create an account to start managing your job search.'}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5">
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="username"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Username
                    </label>

                    <input
                      onChange={handleInputChange}
                      value={formData.username}
                      name="username"
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      className="w-full rounded-xl border border-[#292933] bg-[#111116] px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-[#9297D3]/70 focus:ring-4 focus:ring-[#9297D3]/10"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor={isLogin ? "identifier" : "email"}
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    {isLogin ? 'Username or email' : 'Email'}
                  </label>

                  <input
                    value={isLogin ? formData.identifier : formData.email}
                    onChange={handleInputChange}
                    name={isLogin ? "identifier" : "email"}
                    id={isLogin ? "identifier" : "email"}
                    type="text"
                    placeholder={isLogin ? "Enter your username or email" : "Enter your email"}
                    className="w-full rounded-xl border border-[#292933] bg-[#111116] px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-[#9297D3]/70 focus:ring-4 focus:ring-[#9297D3]/10"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    value={formData.password}
                    name="password"
                    onChange={handleInputChange}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-[#292933] bg-[#111116] px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-[#9297D3]/70 focus:ring-4 focus:ring-[#9297D3]/10"
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-xl bg-[#9297D3] px-4 py-3 text-sm font-semibold text-[#111116] transition hover:bg-[#A3A7DC] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Please wait...' : isLogin ? 'Sign in' : 'Sign up'}
                </button>
              </form>

              {error && (
                <p className="mt-4 text-sm text-red-400">
                  {error}
                </p>
              )}

              <p className="mt-8 text-center text-sm text-zinc-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <Link
                  to={isLogin ? "/register" : "/"}
                  className="font-medium text-[#9297D3] transition hover:text-[#A3A7DC]"
                >
                  {isLogin ? 'Create account' : 'Sign in'}
                </Link>
              </p>
            </div>
          </section>

        </div>
      </div>
    </MainLayout>
  );
}

export default AuthPage;
