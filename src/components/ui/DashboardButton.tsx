"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './button'
import { useUserRole } from '@/hooks/useUserRole'

export default function DashboardButton() {
    const { isCandidate, isInterviewer, isLoading } = useUserRole()
  
    if ( isCandidate || isLoading )  return null

    return (
        <Link href='/dashboard'>
            <Button className='gap-2 font-medium' size={'sm'}>
                Dashboard
            </Button>
        </Link>
    )
}
