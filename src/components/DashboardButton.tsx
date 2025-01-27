"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

function DashboardButton() {
    const isCandidate = false
    const isInterviewer = true
  
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