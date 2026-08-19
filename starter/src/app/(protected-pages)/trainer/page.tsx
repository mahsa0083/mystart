'use client'

import React, { useState } from 'react'
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineChartPie,
  HiOutlineTrendingUp,
  HiOutlineEye,
  HiOutlineBriefcase
} from 'react-icons/hi'
import Collapsible from '@/components/ui/Collapsible'

interface CoachClassItem {
  id: number
  title: string
  sportField: string
  time: string
  studentCount: number
  students: string[]
}

const initialClasses: CoachClassItem[] = [
  {
    id: 1,
    title: 'کلاس بدنسازی و پرورش اندام (گروه الف)',
    sportField: 'بدنسازی',
    time: '۱۵:۰۰ الی ۱۶:۳۰',
    studentCount: 3,
    students: ['علی رضایی', 'محمد مهدی‌زاده', 'رضا کریمی']
  },
  {
    id: 2,
    title: 'تمرین تخصصی فیتنس و هوازی',
    sportField: 'فیتنس',
    time: '۱۷:۰۰ الی ۱۸:۰۰',
    studentCount: 1,
    students: ['سهراب مرادی']
  },
]

export default function CoachDashboardPage() {
  const [classes] = useState<CoachClassItem[]>(initialClasses)

  return (
    <div className="p-4 sm:p-6 min-h-screen text-[#161E54] dir-rtl font-semibold max-w-7xl mx-auto space-y-6">
      
      {/* بخش اول: کارت‌های آماری و نمودار دایره‌ای با پالت رنگی جدید */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold">
        
        {/* کادر اول: تعداد کل شاگردان */}
        <div className="bg-white p-6 rounded-2xl border border-[#BBE0EF] shadow-sm flex flex-col justify-between font-semibold">
          <div className="flex items-center justify-between font-semibold">
            <h3 className="text-sm font-bold text-[#161E54] font-semibold">تعداد کل شاگردان</h3>
            <div className="w-10 h-10 rounded-xl bg-[#BBE0EF]/30 border border-[#BBE0EF] flex items-center justify-center text-[#161E54] font-semibold">
              <HiOutlineUsers className="w-5 h-5 text-[#F16D34]" />
            </div>
          </div>
          <div className="my-4 font-semibold">
            <span className="text-3xl font-extrabold text-[#161E54] font-semibold">۴</span>
            <span className="text-xs text-[#161E54]/70 mr-2 font-semibold">نفر شاگرد فعال</span>
          </div>
          <div className="text-[11px] text-[#F16D34] font-semibold flex items-center gap-1 font-semibold">
            <HiOutlineTrendingUp className="w-4 h-4 text-[#F16D34]" />
            <span className="font-semibold">روند رو به رشد</span>
          </div>
        </div>

        {/* کادر دوم: نمودار رشد شاگردان (دایره‌ای) */}
        <div className="bg-white p-6 rounded-2xl border border-[#BBE0EF] shadow-sm flex flex-col justify-between font-semibold">
          <div className="flex items-center justify-between font-semibold">
            <h3 className="text-sm font-bold text-[#161E54] font-semibold">روند رشد شاگردان</h3>
            <div className="w-10 h-10 rounded-xl bg-[#BBE0EF]/30 border border-[#BBE0EF] flex items-center justify-center text-[#161E54] font-semibold">
              <HiOutlineChartPie className="w-5 h-5 text-[#FF986A]" />
            </div>
          </div>
          <div className="my-4 flex items-center justify-between font-semibold">
            <div>
              <span className="text-lg font-bold text-[#161E54] font-semibold">شاخص عملکرد</span>
              <p className="text-xs text-[#161E54]/70 mt-0.5 font-semibold">درصد حضور و فعالیت</p>
            </div>
            {/* نمودار دایره‌ای با رنگ‌های جدید */}
            <div className="w-14 h-14 rounded-full border-4 border-[#BBE0EF] border-t-[#F16D34] flex items-center justify-center text-xs font-bold text-[#161E54] bg-[#BBE0EF]/20 font-semibold">
              ۸۵٪
            </div>
          </div>
          <div className="text-[11px] text-[#161E54]/70 font-semibold">
            وضعیت جذب و حضور در کلاس‌ها مطلوب است.
          </div>
        </div>

        {/* کادر سوم: اطلاعات امروز با تم رنگی هماهنگ */}
        <div className="bg-[#161E54] text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between border border-[#161E54] font-semibold">
          <div className="flex items-center justify-between font-semibold">
            <h3 className="text-sm font-bold text-[#BBE0EF] font-semibold">امروز</h3>
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#BBE0EF]/30 flex items-center justify-center text-white font-semibold">
              <HiOutlineCalendar className="w-5 h-5 text-[#FF986A]" />
            </div>
          </div>
          <div className="my-4 font-semibold">
            <span className="text-xl font-bold font-semibold">سه‌شنبه، ۲۸ مرداد</span>
            <p className="text-xs text-[#BBE0EF] mt-1 font-semibold">تعداد کلاس‌های امروز: ۲ سانس</p>
          </div>
          <div className="text-[11px] text-[#BBE0EF] font-semibold">
            آماده مدیریت کلاس‌ها و برنامه‌ها
          </div>
        </div>

      </div>

      {/* بخش دوم: لیست کلاس‌های امروز */}
      <div className="space-y-4 font-semibold">
        <h2 className="text-lg font-bold text-[#161E54] flex items-center gap-2 font-semibold">
          <HiOutlineClock className="w-5 h-5 text-[#F16D34]" />
          <span className="font-semibold">لیست کلاس‌های امروز</span>
        </h2>

        {classes.length > 0 ? (
          <div className="space-y-3 font-semibold">
            {classes.map((cls) => (
              <Collapsible 
                key={cls.id} 
                className="bg-white border border-[#BBE0EF] rounded-2xl shadow-sm overflow-hidden font-semibold"
              >
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-semibold">
                  
                  {/* اطلاعات اصلی کلاس */}
                  <div className="space-y-1 font-semibold">
                    <div className="flex items-center gap-2 font-semibold">
                      <h3 className="text-base font-bold text-[#161E54] font-semibold">{cls.title}</h3>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold bg-[#BBE0EF]/30 text-[#161E54] border border-[#BBE0EF] font-semibold">
                        {cls.sportField}
                      </span>
                    </div>
                    <p className="text-xs text-[#161E54]/70 flex items-center gap-3 pt-1 font-semibold">
                      <span className="flex items-center gap-1 font-semibold">
                        <HiOutlineClock className="w-4 h-4 text-[#F16D34]" />
                        <span className="font-semibold">ساعت: {cls.time}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-semibold">
                        <HiOutlineUsers className="w-4 h-4 text-[#F16D34]" />
                        <span className="font-semibold">تعداد شاگردها: {cls.studentCount} نفر</span>
                      </span>
                    </p>
                  </div>

                  {/* دکمه تریگر آکاردئون برای نمایش اعضای کلاس */}
                  <Collapsible.Trigger className="w-full sm:w-auto font-semibold">
                    <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#161E54] text-white hover:bg-[#161E54]/90 transition-colors cursor-pointer shadow-sm w-full sm:w-auto font-semibold">
                      <HiOutlineEye className="w-4 h-4 text-[#FF986A]" />
                      <span className="font-semibold">نمایش اعضای کلاس</span>
                    </span>
                  </Collapsible.Trigger>

                </div>

                {/* محتوای بازشونده آکاردئون (لیست اعضای کلاس) */}
                <Collapsible.Content className="px-5 pb-5 pt-2 border-t border-[#BBE0EF]/40 bg-[#BBE0EF]/10 font-semibold">
                  <div className="space-y-2 mt-2 font-semibold">
                    <p className="text-xs font-bold text-[#161E54] flex items-center gap-1.5 mb-3 font-semibold">
                      <HiOutlineBriefcase className="w-4 h-4 text-[#F16D34]" />
                      <span className="font-semibold">لیست ورزشکاران ثبت‌نام شده در این سانس:</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 font-semibold">
                      {cls.students.map((studentName, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-[#BBE0EF] flex items-center gap-2.5 font-semibold">
                          <div className="w-8 h-8 rounded-full bg-[#BBE0EF]/30 border border-[#BBE0EF] flex items-center justify-center text-[#161E54] font-bold text-xs font-semibold">
                            {studentName.charAt(0)}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-[#161E54] block font-semibold">{studentName}</span>
                            <span className="text-[10px] text-[#161E54]/70 font-semibold">عضو فعال باشگاه</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Collapsible.Content>
              </Collapsible>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-[#BBE0EF] shadow-sm text-center font-semibold">
            <p className="text-[#161E54] font-bold font-semibold">امروز کلاسی ثبت نشده است.</p>
          </div>
        )}
      </div>
    </div>
  )
}