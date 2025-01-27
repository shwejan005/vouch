"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useUserRole } from '@/hooks/useUserRole'

function DashboardButton() {
    const { isCandidate, isInterviewer, isLoading } = useUserRole()
  
    if (isCandidate) return null

    return (
        <Link href='/dashboard'>
            <Button className='gap-2 font-medium' size={'sm'}>
                Dashboard
            </Button>
        </Link>
    )
}

export default DashboardButton