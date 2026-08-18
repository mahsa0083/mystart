'use client'

import React, { useState, useTransition } from 'react'
import {
    HiOutlineUserAdd as UserPlus,
    HiOutlinePencilAlt as Edit3,
    HiOutlineTrash as Trash2,
    HiOutlineClock as Clock,
    HiOutlineUser as User,
    HiOutlineX as X,
    HiOutlineCheckCircle as CheckCircle2,
    HiOutlineExclamationCircle as AlertCircle,
    HiOutlineEye as Eye,
    HiOutlinePhone as Phone,
} from 'react-icons/hi'
import { FaDumbbell as Dumbbell } from 'react-icons/fa'
import { TbUser } from 'react-icons/tb'

// Import UI Components from Design System
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Avatar from '@/components/ui/Avatar'
import Select from '@/components/ui/Select'

interface Member {
    id: string
    firstName: string
    lastName: string
    fullName: string
    phoneNumber: string
    nationalCode: string
    gender: 'Male' | 'Female'
    birthDate: string
    emergencyPhone?: string
    medicalNotes?: string
    isActive?: boolean
    className: string
    sportType: string
    trainerName: string
    startTimeHour: string
    startTimeMinute: string
    endTimeHour: string
    endTimeMinute: string
    paymentStatus: 'PAID' | 'UNPAID' | 'PENDING'
    joinDate?: string
    remainingSessions?: number
}

// ساختار فرم مطابق با DTOهای شما
interface MemberFormData {
    firstName: string
    lastName: string
    phoneNumber: string
    nationalCode: string
    gender: 'Male' | 'Female'
    birthDate: string
    emergencyPhone: string
    medicalNotes: string
    isActive: boolean
    className: string
    sportType: string
    trainerName: string
    startTimeHour: string
    startTimeMinute: string
    endTimeHour: string
    endTimeMinute: string
    paymentStatus: 'PAID' | 'UNPAID' | 'PENDING'
    joinDate: string
    remainingSessions: number
}

interface SelectOption {
    value: string
    label: string
}

const SPORT_OPTIONS: SelectOption[] = [
    { value: 'ALL', label: 'همه رشته‌ها' },
    { value: 'بدنسازی', label: 'بدنسازی' },
    { value: 'فیتنس', label: 'فیتنس' },
    { value: 'یوگا', label: 'یوگا' },
    { value: 'CrossFit', label: 'کراس‌فیت' },
]

const FORM_SPORT_OPTIONS: SelectOption[] = [
    { value: 'بدنسازی', label: 'بدنسازی' },
    { value: 'فیتنس', label: 'فیتنس' },
    { value: 'یوگا', label: 'یوگا' },
    { value: 'CrossFit', label: 'کراس‌فیت' },
]

export default function MembersManagement() {
    const [members, setMembers] = useState<Member[]>([
        {
            id: '1',
            firstName: 'علی',
            lastName: 'محمدی',
            fullName: 'علی محمدی',
            phoneNumber: '09123456789',
            nationalCode: '0012345678',
            gender: 'Male',
            birthDate: '1375-01-01',
            emergencyPhone: '09129876543',
            medicalNotes: 'ندارد',
            isActive: true,
            className: 'بدنسازی سانس A',
            sportType: 'بدنسازی',
            trainerName: 'استاد رضایی',
            startTimeHour: '18',
            startTimeMinute: '00',
            endTimeHour: '19',
            endTimeMinute: '30',
            paymentStatus: 'PAID',
            joinDate: '1402/10/12',
            remainingSessions: 8,
        },
        {
            id: '2',
            firstName: 'سارا',
            lastName: 'احمدی',
            fullName: 'سارا احمدی',
            phoneNumber: '09198765432',
            nationalCode: '0098765432',
            gender: 'Female',
            birthDate: '1378-05-12',
            emergencyPhone: '',
            medicalNotes: '',
            isActive: true,
            className: 'یوگا پیشرفته',
            sportType: 'یوگا',
            trainerName: 'خانم کاظمی',
            startTimeHour: '10',
            startTimeMinute: '00',
            endTimeHour: '11',
            endTimeMinute: '30',
            paymentStatus: 'UNPAID',
            joinDate: '1402/11/05',
            remainingSessions: 2,
        },
    ])

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSport, setSelectedSport] = useState<SelectOption | null>(SPORT_OPTIONS[0])

    const [searchOptions, setSearchOptions] = useState<SelectOption[]>([])
    const [isPending, startTransition] = useTransition()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingMember, setEditingMember] = useState<Member | null>(null)

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [selectedMemberDetails, setSelectedMemberDetails] = useState<Member | null>(null)

    const [deleteDialog, setDeleteDialog] = useState<{
        isOpen: boolean
        memberId: string | null
    }>({
        isOpen: false,
        memberId: null,
    })

    const [formData, setFormData] = useState<MemberFormData>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        nationalCode: '',
        gender: 'Male',
        birthDate: '2000-01-01',
        emergencyPhone: '',
        medicalNotes: '',
        isActive: true,
        className: '',
        sportType: 'بدنسازی',
        trainerName: '',
        startTimeHour: '18',
        startTimeMinute: '00',
        endTimeHour: '19',
        endTimeMinute: '30',
        paymentStatus: 'PAID',
        joinDate: '1402/12/01',
        remainingSessions: 10,
    })

    const handleSearchInputChange = (value: string) => {
        const trimmed = value.trim().toLowerCase()
        setSearchTerm(value)

        if (!trimmed) {
            setSearchOptions([])
            return
        }

        startTransition(() => {
            const matches = members
                .filter(
                    (m) =>
                        m.fullName.toLowerCase().includes(trimmed) ||
                        m.className.toLowerCase().includes(trimmed),
                )
                .map((m) => ({
                    value: m.fullName,
                    label: `${m.fullName} (${m.className})`,
                }))
            setSearchOptions(matches)
        })
    }

    const filteredMembers = members.filter((member) => {
        const matchesSearch =
            !searchTerm ||
            member.fullName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
            member.className.toLowerCase().includes(searchTerm.toLowerCase().trim())
        const matchesSport =
            !selectedSport ||
            selectedSport.value === 'ALL' ||
            member.sportType === selectedSport.value
        return matchesSearch && matchesSport
    })

    const handleOpenCreateModal = () => {
        setEditingMember(null)
        setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            nationalCode: '',
            gender: 'Male',
            birthDate: '2000-01-01',
            emergencyPhone: '',
            medicalNotes: '',
            isActive: true,
            className: '',
            sportType: 'بدنسازی',
            trainerName: '',
            startTimeHour: '18',
            startTimeMinute: '00',
            endTimeHour: '19',
            endTimeMinute: '30',
            paymentStatus: 'PAID',
            joinDate: '1402/12/01',
            remainingSessions: 10,
        })
        setIsModalOpen(true)
    }

    const handleOpenEditModal = (member: Member) => {
        setEditingMember(member)
        setFormData({
            firstName: member.firstName || member.fullName.split(' ')[0] || '',
            lastName: member.lastName || member.fullName.split(' ').slice(1).join(' ') || '',
            phoneNumber: member.phoneNumber || member.phoneNumber || '',
            nationalCode: member.nationalCode || '',
            gender: member.gender || 'Male',
            birthDate: member.birthDate || '2000-01-01',
            emergencyPhone: member.emergencyPhone || '',
            medicalNotes: member.medicalNotes || '',
            isActive: member.isActive ?? true,
            className: member.className,
            sportType: member.sportType,
            trainerName: member.trainerName,
            startTimeHour: member.startTimeHour || '18',
            startTimeMinute: member.startTimeMinute || '00',
            endTimeHour: member.endTimeHour || '19',
            endTimeMinute: member.endTimeMinute || '30',
            paymentStatus: member.paymentStatus,
            joinDate: member.joinDate || '',
            remainingSessions: member.remainingSessions || 10,
        })
        setIsModalOpen(true)
    }

    const handleOpenDetailsModal = (member: Member) => {
        setSelectedMemberDetails(member)
        setIsDetailsModalOpen(true)
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        const fullN = `${formData.firstName} ${formData.lastName}`
        if (editingMember) {
            setMembers(
                members.map((m) =>
                    m.id === editingMember.id
                        ? { ...m, ...formData, fullName: fullN, phone: formData.phoneNumber }
                        : m,
                ),
            )
        } else {
            const newMember: Member = {
                ...formData,
                id: Date.now().toString(),
                fullName: fullN,
                phoneNumber: formData.phoneNumber,
            }
            setMembers([...members, newMember])
        }
        setIsModalOpen(false)
    }

    const handleOpenDeleteDialog = (id: string) => {
        setDeleteDialog({ isOpen: true, memberId: id })
    }

    const handleConfirmDelete = () => {
        if (deleteDialog.memberId) {
            setMembers(members.filter((m) => m.id !== deleteDialog.memberId))
        }
        setDeleteDialog({ isOpen: false, memberId: null })
    }

    const renderPaymentBadge = (status: Member['paymentStatus']) => {
        switch (status) {
            case 'PAID':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                        <span>تسویه شده</span>
                    </span>
                )
            case 'UNPAID':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 shadow-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                        <span>بدهکار</span>
                    </span>
                )
            case 'PENDING':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        <Clock className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                        <span>در انتظار بررسی</span>
                    </span>
                )
        }
    }

    return (
        <div
            className="p-6 md:p-8 min-h-screen from-slate-50 via-white to-indigo-50/30 font-semibold dir-rtl text-slate-800"
            data-role="ADMIN"
            style={{ fontFamily: 'var(--font-family, inherit)' }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-[var(--primary-mild)]/30 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-semibold">
                        مدیریت ورزشکاران
                    </h1>
                    <p className="text-sm text-slate-500 mt-1.5 font-normal font-semibold">
                        مدیریت پیشرفته اعضا، بررسی وضعیت شهریه، کلاس‌ها و مربیان مجموعه
                    </p>
                </div>

                <Button
                    variant="solid"
                    onClick={handleOpenCreateModal}
                    className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-5 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35 active:scale-[0.98] font-semibold shrink-0"
                >
                    <UserPlus className="w-5 h-5" />
                    <span className="font-semibold">افزودن ورزشکار جدید</span>
                </Button>
            </div>

            {/* نوار فیلتر و جستجو */}
            <div className="bg-white/80 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center font-semibold relative z-40">
                <div className="w-full md:w-96 font-semibold relative z-50">
                    <Select<SelectOption>
                        isSearchable
                        isLoading={isPending}
                        placeholder="جستجوی سریع نام یا عنوان کلاس..."
                        noOptionsMessage={() => (isPending ? 'در حال جستجو...' : 'ورزشکاری یافت نشد')}
                        options={searchOptions}
                        onInputChange={handleSearchInputChange}
                        onChange={(opt) => setSearchTerm(opt?.value || '')}
                        className="w-full font-semibold"
                    />
                </div>

                <div className="w-full md:w-72 font-semibold relative z-50">
                    <Select<SelectOption>
                        placeholder="فیلتر بر اساس رشته ورزشی"
                        options={SPORT_OPTIONS}
                        value={selectedSport}
                        onChange={(option) => setSelectedSport(option as SelectOption)}
                        className="w-full font-semibold"
                    />
                </div>
            </div>

            {/* لیست اعضا */}
            <div className="space-y-4 font-semibold">
                {filteredMembers.map((member) => (
                    <div
                        key={member.id}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:border-indigo-200/60 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-5 group font-semibold"
                    >
                        <div className="flex items-center gap-4 min-w-[260px] font-semibold">
                            <Avatar
                                shape="round"
                                icon={<TbUser className="w-6 h-6 text-indigo-600" />}
                                className="bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-inner w-12 h-12 flex items-center justify-center rounded-2xl transition-transform group-hover:scale-105 font-semibold"
                            />
                            <div className="font-semibold space-y-1.5">
                                <div>{renderPaymentBadge(member.paymentStatus)}</div>
                                <button
                                    onClick={() => handleOpenDetailsModal(member)}
                                    className="font-bold text-slate-900 text-base hover:text-indigo-600 transition-colors text-right block font-semibold"
                                >
                                    {member.fullName}
                                </button>
                                <div className="flex items-center gap-2 font-semibold">
                                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium font-semibold">
                                        {member.sportType}
                                    </span>
                                    {(member.phoneNumber || member.phoneNumber) && (
                                        <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold" dir="ltr">
                                            <Phone className="w-3 h-3 text-slate-400" />
                                            {member.phoneNumber || member.phoneNumber}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 max-w-2xl font-semibold">
                            <div className="flex items-center gap-2 bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-100/80 font-semibold shadow-2xs">
                                <div className="p-1 rounded-md bg-white text-indigo-600 shrink-0 font-semibold">
                                    <Dumbbell className="w-3 h-3" />
                                </div>
                                <div className="min-w-0 font-semibold leading-tight">
                                    <span className="text-slate-400 block text-[10px] font-medium font-semibold">کلاس ثبت‌نامی</span>
                                    <span className="font-bold text-slate-800 text-xs truncate block font-semibold">{member.className}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-100/80 font-semibold shadow-2xs">
                                <div className="p-1 rounded-md bg-white text-indigo-600 shrink-0 font-semibold">
                                    <User className="w-3 h-3" />
                                </div>
                                <div className="min-w-0 font-semibold leading-tight">
                                    <span className="text-slate-400 block text-[10px] font-medium font-semibold">مربی</span>
                                    <span className="font-bold text-slate-800 text-xs truncate block font-semibold">{member.trainerName}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-100/80 font-semibold shadow-2xs">
                                <div className="p-1 rounded-md bg-white text-indigo-600 shrink-0 font-semibold">
                                    <Clock className="w-3 h-3" />
                                </div>
                                <div className="min-w-0 font-semibold leading-tight">
                                    <span className="text-slate-400 block text-[10px] font-medium font-semibold">ساعت سانس</span>
                                    <span className="font-bold text-slate-800 text-[11px] truncate block font-semibold" dir="ltr">
                                        {member.startTimeHour}:{member.startTimeMinute} تا {member.endTimeHour}:{member.endTimeMinute}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 shrink-0 bg-slate-50/60 p-1.5 rounded-xl border border-slate-100 font-semibold">
                            <button
                                onClick={() => handleOpenDetailsModal(member)}
                                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-lg transition-all font-semibold"
                                title="مشاهده جزئیات کامل"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleOpenEditModal(member)}
                                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all font-semibold"
                                title="ویرایش اطلاعات"
                            >
                                <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleOpenDeleteDialog(member.id)}
                                className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all font-semibold"
                                title="حذف ورزشکار"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredMembers.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 text-slate-400 font-semibold shadow-xs">
                        <p className="text-base font-medium font-semibold">هیچ ورزشکاری با مشخصات وارد شده یافت نشد.</p>
                        <p className="text-xs text-slate-400 mt-1 font-semibold">لطفاً فیلتر جستجو یا رشته ورزشی را تغییر دهید.</p>
                    </div>
                )}
            </div>

            {/* دیالوگ حذف ورزشکار */}
            <Dialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, memberId: null })}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                className="font-semibold"
            >
                <div className="p-2 font-semibold">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 font-semibold shadow-xs">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2 font-semibold">تأیید حذف ورزشکار</h3>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed font-semibold">
                        آیا از حذف این ورزشکار از لیست باشگاه اطمینان دارید؟ تمام سوابق و وضعیت مالی مرتبط با این حساب پاک خواهند شد و این عملیات غیرقابل بازگشت است.
                    </p>
                    <div className="flex justify-end gap-3 font-semibold">
                        <Button
                            variant="subtle"
                            onClick={() => setDeleteDialog({ isOpen: false, memberId: null })}
                            className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 font-semibold"
                        >
                            انصراف
                        </Button>
                        <Button
                            variant="solid"
                            className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md font-semibold"
                            onClick={handleConfirmDelete}
                        >
                            تأیید و حذف
                        </Button>
                    </div>
                </div>
            </Dialog>

            {/* مودال جزئیات کامل ورزشکار */}
            {isDetailsModalOpen && selectedMemberDetails && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-semibold">
                    <div className="bg-white rounded-3xl w-full max-w-lg border border-slate-100 shadow-2xl overflow-hidden font-semibold">
                        <div className="bg-slate-900 text-white p-6 flex items-center justify-between font-semibold">
                            <div className="flex items-center gap-3 font-semibold">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-400 font-bold font-semibold">
                                    {selectedMemberDetails.fullName.charAt(0)}
                                </div>
                                <div className="font-semibold">
                                    <h3 className="font-bold text-lg text-white font-semibold">{selectedMemberDetails.fullName}</h3>
                                    <p className="text-xs text-slate-400 font-semibold">کارت عضویت فعال باشگاه</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsDetailsModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors font-semibold"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 font-semibold">
                            <div className="grid grid-cols-2 gap-4 font-semibold">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 font-semibold">
                                    <span className="text-xs text-slate-400 block mb-1 font-semibold">رشته ورزشی</span>
                                    <span className="font-bold text-slate-800 text-sm font-semibold">{selectedMemberDetails.sportType}</span>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 font-semibold">
                                    <span className="text-xs text-slate-400 block mb-1 font-semibold">شماره تماس</span>
                                    <span className="font-bold text-slate-800 text-sm font-semibold" dir="ltr">
                                        {selectedMemberDetails.phoneNumber || selectedMemberDetails.phoneNumber || 'ثبت نشده'}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3 font-semibold">
                                <div className="flex justify-between items-center text-sm font-semibold">
                                    <span className="text-slate-500 font-semibold">کد ملی:</span>
                                    <span className="font-semibold text-slate-900 font-semibold" dir="ltr">{selectedMemberDetails.nationalCode || 'ثبت نشده'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-semibold">
                                    <span className="text-slate-500 font-semibold">عنوان کلاس:</span>
                                    <span className="font-semibold text-slate-900 font-semibold">{selectedMemberDetails.className}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-semibold">
                                    <span className="text-slate-500 font-semibold">مربی مسئول:</span>
                                    <span className="font-semibold text-slate-900 font-semibold">{selectedMemberDetails.trainerName}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-semibold">
                                    <span className="text-slate-500 font-semibold">تلفن اضطراری:</span>
                                    <span className="font-semibold text-slate-900 font-semibold" dir="ltr">{selectedMemberDetails.emergencyPhone || 'ندارد'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-semibold">
                                    <span className="text-slate-500 font-semibold">نکات پزشکی:</span>
                                    <span className="font-semibold text-slate-900 font-semibold">{selectedMemberDetails.medicalNotes || 'ندارد'}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 font-semibold">
                                <div className="font-semibold">
                                    <span className="text-xs text-slate-400 block mb-1 font-semibold">وضعیت حساب مالی</span>
                                    {renderPaymentBadge(selectedMemberDetails.paymentStatus)}
                                </div>
                                <Button
                                    variant="solid"
                                    onClick={() => {
                                        setIsDetailsModalOpen(false)
                                        handleOpenEditModal(selectedMemberDetails)
                                    }}
                                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium text-sm font-semibold"
                                >
                                    ویرایش اطلاعات
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* مودال افزودن / ویرایش بر اساس DTO */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-semibold dir-rtl">
                    <div className="bg-white rounded-2xl w-full max-w-lg border border-[var(--primary-mild)]/30 shadow-xl overflow-hidden font-semibold max-h-[90vh] overflow-y-auto">
                        <div className="bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] p-4 flex items-center justify-between font-semibold">
                            <h2 className="font-bold text-base font-semibold">
                                {editingMember ? 'ویرایش اطلاعات ورزشکار' : 'افزودن ورزشکار جدید'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white font-semibold">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-5 space-y-4 font-semibold text-xs">
                            {/* نام و نام خانوادگی */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[var(--sidebar-bg)] mb-1">نام</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full px-3 py-2 border border-[var(--primary-mild)]/40 rounded-xl text-sm text-[var(--sidebar-bg)] focus:outline-none focus:border-[var(--sidebar-bg)]"
                                        placeholder="مثال: علی"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[var(--sidebar-bg)] mb-1">نام خانوادگی</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full px-3 py-2 border border-[var(--primary-mild)]/40 rounded-xl text-sm text-[var(--sidebar-bg)] focus:outline-none focus:border-[var(--sidebar-bg)]"
                                        placeholder="مثال: رضایی"
                                    />
                                </div>
                            </div>

                            {/* شماره تماس و کد ملی */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[var(--sidebar-bg)] mb-1">شماره تماس</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={11}
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '') })}
                                        className="w-full px-3 py-2 border border-[var(--primary-mild)]/40 rounded-xl text-sm text-[var(--sidebar-bg)] focus:outline-none focus:border-[var(--sidebar-bg)]"
                                        placeholder="09123456789"
                                        dir="ltr"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-[var(--sidebar-bg)] mb-1">کد ملی</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={10}
                                        value={formData.nationalCode}
                                        onChange={(e) => setFormData({ ...formData, nationalCode: e.target.value.replace(/\D/g, '') })}
                                        className="w-full px-3 py-2 border border-[var(--primary-mild)]/40 rounded-xl text-sm text-[var(--sidebar-bg)] focus:outline-none focus:border-[var(--sidebar-bg)]"
                                        placeholder="0012345678"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            {/* جنسیت و تاریخ تولد */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-[var(--sidebar-bg)] mb-1">جنسیت</label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' })}
                                        className="w-full px-3 py-2 border border-[var(--primary-mild)]/40 rounded-xl text-sm text-[var(--sidebar-bg)] bg-white focus:outline-none focus:border-[var(--sidebar-bg)]"
                                    >
                                        <option value="Male">مرد</option>
                                        <option value="Female">زن</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-semibold text-[var(--sidebar-bg)] mb-1">تاریخ تولد</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.birthDate}
                                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-[var(--primary-mild)]/40 rounded-xl text-sm text-[var(--sidebar-bg)] focus:outline-none focus:border-[var(--sidebar-bg)]"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            {/* تلفن اضطراری */}
                            <div>
                                <label className="block font-semibold text-[var(--sidebar-bg)] mb-1">تلفن اضطراری (اختیاری)</label>
                                <input
                                    type="text"
                                    maxLength={11}
                                    value={formData.emergencyPhone}
                                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value.replace(/\D/g, '') })}
                                    className="w-full px-3 py-2 border border-[var(--primary-mild)]/40 rounded-xl text-sm text-[var(--sidebar-bg)] focus:outline-none focus:border-[var(--sidebar-bg)]"
                                    placeholder="0912... یا شماره ثابت"
                                    dir="ltr"
                                />
                            </div>

                            {/* نکات پزشکی */}
                            <div>
                                <label className="block font-semibold text-[var(--sidebar-bg)] mb-1">نکات پزشکی و سلامتی (اختیاری)</label>
                                <textarea
                                    rows={2}
                                    value={formData.medicalNotes}
                                    onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                                    className="w-full px-3 py-2 border border-[var(--primary-mild)]/40 rounded-xl text-sm text-[var(--sidebar-bg)] focus:outline-none focus:border-[var(--sidebar-bg)] resize-none"
                                    placeholder="سوابق بیماری، حساسیت دارویی یا آسیب‌دیدگی خاص..."
                                />
                            </div>

                            {/* وضعیت فعال بودن (مختص UpdateMemberByAdminDto) */}
                            {editingMember && (
                                <div className="flex items-center gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="isActiveCheck"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4 text-[var(--sidebar-bg)] rounded border-gray-300 focus:ring-[var(--sidebar-bg)]"
                                    />
                                    <label htmlFor="isActiveCheck" className="font-semibold text-[var(--sidebar-bg)] cursor-pointer">
                                        حساب کاربری فعال باشد
                                    </label>
                                </div>
                            )}

                            {/* دکمه‌های ثبت / انصراف */}
                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-medium transition-colors"
                                >
                                    انصراف
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-[var(--sidebar-bg)] hover:bg-[var(--sidebar-bg)]/90 text-white rounded-xl font-medium transition-all shadow-sm"
                                >
                                    {editingMember ? 'ذخیره تغییرات' : 'ثبت نام ورزشکار'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}