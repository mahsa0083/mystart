'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function AuthPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

    // استیت‌های ورود (Login)
    const [loginStep, setLoginStep] = useState<1 | 2>(1)
    const [nationalId, setNationalId] = useState('')
    const [otpCode, setOtpCode] = useState('')
    const [loginError, setLoginError] = useState('')
    const [loading, setLoading] = useState(false)

    // استیت‌های ثبت‌نام (Register)
    const [registerForm, setRegisterForm] = useState({
        firstName: '',
        lastName: '',
        nationalId: '',
        phoneNumber: '',
    })
    const [registerSuccess, setRegisterSuccess] = useState('')

    // ------------------------------------------------------------------
    // مرحله ۱: ارسال کد ملی و درخواست کد OTP
    // ------------------------------------------------------------------
    const handleRequestOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError('')

        if (nationalId.length !== 10) {
            setLoginError('کد ملی باید ۱۰ رقم باشد.')
            return
        }

        setLoading(true)
        
        // در اپلیکیشن واقعی: فراخوانی API ارسال پیامک
        setTimeout(() => {
            setLoading(false)
            setLoginStep(2)
        }, 800)
    }

    // ------------------------------------------------------------------
    // مرحله ۲: تأیید کد OTP و ورود به سیستم با NextAuth JWT
    // ------------------------------------------------------------------
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError('')
        setLoading(true)

        try {
            /**
             * اتصال به Provider مربوط به Credentials در auth.config.ts
             * اطلاعات ورود برای validateCredential ارسال می‌شوند.
             */
            const res = await signIn('credentials', {
                nationalId,
                otpCode,
                redirect: false,
            })

            if (res?.error) {
                setLoginError('کد وارد شده یا اطلاعات کاربری نامعتبر است.')
                setLoading(false)
                return
            }

            /** 
             * پس از لاگین موفق، NextAuth کوکی JWT را ست می‌کند.
             * با رفرش یا push، میدل‌ور پروژه کاربر را بر اساس authority به پنل خودش هدایت می‌کند.
             */
            router.refresh()
            router.push('/')
        } catch (error) {
            setLoginError('خطایی در برقراری ارتباط با سرور رخ داد.')
            setLoading(false)
        }
    }

    // ------------------------------------------------------------------
    // ثبت‌نام اعضا
    // ------------------------------------------------------------------
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        const { firstName, lastName, nationalId, phoneNumber } = registerForm

        if (!firstName || !lastName || nationalId.length !== 10 || phoneNumber.length !== 11) {
            alert('لطفاً تمامی فیلدها را به درستی وارد کنید.')
            return
        }

        setLoading(true)

        // ارسال اطلاعات ثبت‌نام به اکشن سرور یا API ثبت‌نام
        setTimeout(() => {
            setLoading(false)
            setRegisterSuccess('ثبت‌نام شما با موفقیت انجام شد! اکنون می‌توانید وارد شوید.')
            setNationalId(nationalId)
            setTimeout(() => {
                setActiveTab('login')
                setLoginStep(1)
                setRegisterSuccess('')
            }, 1500)
        }, 1000)
    }

    return (
        <div className=" border border-gray-300 p-10 w-full dir-rtl rounded-3xl shadow-md">
            {/* تب‌ها */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => {
                        setActiveTab('login')
                        setLoginError('')
                    }}
                    className={`flex-1 py-4 text-center text-sm font-semibold transition-colors ${
                        activeTab === 'login'
                            ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                    }`}
                >
                    ورود
                </button>
                <button
                    onClick={() => {
                        setActiveTab('register')
                        setLoginError('')
                    }}
                    className={`flex-1 py-4 text-center text-sm font-semibold transition-colors ${
                        activeTab === 'register'
                            ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                    }`}
                >
                    ثبت‌نام اعضا
                </button>
            </div>

            <div className="py-4">
                {/* تب ورود */}
                {activeTab === 'login' && (
                    <div>
                        <div className="mb-6 text-center">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                {loginStep === 1 ? 'ورود با کد ملی' : 'تأیید کد ورود'}
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {loginStep === 1
                                    ? 'کد ملی خود را وارد کنید'
                                    : `کد پیامک شده به شماره همراه مربوط به کد ملی ${nationalId} را وارد کنید`}
                            </p>
                        </div>

                        {loginError && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-xs font-medium">
                                {loginError}
                            </div>
                        )}

                        {loginStep === 1 && (
                            <form onSubmit={handleRequestOtp} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        کد ملی
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={10}
                                        placeholder="مثلاً ۱۲۳۴۵۶۷۸۹۰"
                                        value={nationalId}
                                        onChange={(e) => setNationalId(e.target.value)}
                                        className="w-full px-4 py-2.5 text-center text-base tracking-widest rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'در حال ارسال...' : 'ارسال کد تأیید'}
                                </button>
                            </form>
                        )}

                        {loginStep === 2 && (
                            <form onSubmit={handleVerifyOtp} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        کد یک‌بار مصرف (OTP)
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={6}
                                        placeholder="کد ۶ رقمی"
                                        value={otpCode}
                                        onChange={(e) => setOtpCode(e.target.value)}
                                        className="w-full px-4 py-2.5 text-center text-lg tracking-widest font-mono rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'در حال بررسی...' : 'تأیید و ورود'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setLoginStep(1)
                                        setOtpCode('')
                                    }}
                                    className="w-full py-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400"
                                >
                                    تغییر کد ملی
                                </button>
                            </form>
                        )}
                    </div>
                )}

                {/* تب ثبت‌نام */}
                {activeTab === 'register' && (
                    <div>
                        <div className="mb-4 text-center">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                عضویت جدید در باشگاه
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                اطلاعات خود را جهت ثبت‌نام وارد کنید
                            </p>
                        </div>

                        {registerSuccess && (
                            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-xs font-medium text-center">
                                {registerSuccess}
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        نام
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="نام"
                                        value={registerForm.firstName}
                                        onChange={(e) =>
                                            setRegisterForm({ ...registerForm, firstName: e.target.value })
                                        }
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        نام خانوادگی
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="نام خانوادگی"
                                        value={registerForm.lastName}
                                        onChange={(e) =>
                                            setRegisterForm({ ...registerForm, lastName: e.target.value })
                                        }
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    کد ملی
                                </label>
                                <input
                                    type="text"
                                    maxLength={10}
                                    placeholder="۱۰ رقم بدون خط تیره"
                                    value={registerForm.nationalId}
                                    onChange={(e) =>
                                        setRegisterForm({ ...registerForm, nationalId: e.target.value })
                                    }
                                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    شماره همراه
                                </label>
                                <input
                                    type="tel"
                                    maxLength={11}
                                    placeholder="۰۹۱۲..."
                                    value={registerForm.phoneNumber}
                                    onChange={(e) =>
                                        setRegisterForm({ ...registerForm, phoneNumber: e.target.value })
                                    }
                                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                            >
                                {loading ? 'در حال ثبت اطلاعات...' : 'ثبت نام و دریافت حساب'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}