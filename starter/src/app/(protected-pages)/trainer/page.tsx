'use client'

import { useSession, signOut } from 'next-auth/react'

export default function TrainerDashboard() {
    const { data: session } = useSession()

    return (
        <div className="min-h-screen bg-emerald-950 text-white p-8 dir-rtl">
            <header className="flex justify-between items-center pb-6 border-b border-emerald-900 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-emerald-400">🏋️‍♂️ داشبورد مربیان</h1>
                    <p className="text-sm text-emerald-200/60 mt-1">
                        خوش آمدید، {session?.user?.name || 'استاد عزیز'}
                    </p>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: '/sign-in' })}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-sm rounded-xl transition-colors"
                >
                    خروج از حساب
                </button>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-900/40 border border-emerald-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-emerald-300 text-sm font-medium">شاگردان فعال شما</h3>
                    <p className="text-3xl font-bold mt-2 text-white">۱۵ نفر</p>
                </div>
                <div className="bg-emerald-900/40 border border-emerald-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-emerald-300 text-sm font-medium">برنامه‌های نیازمند تایید</h3>
                    <p className="text-3xl font-bold mt-2 text-amber-400">۴ برنامه</p>
                </div>
            </main>
        </div>
    )
}