import * as React from 'react'
import { redirect } from 'next/navigation'
import { serverAuth } from '@/lib/auth-server'
import { ManagePageClient } from '@/components/manage/manage-page-client'

interface ManagePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const ManagePage = async ({ searchParams: _ }: ManagePageProps) => {
  // Check authentication on server side
  const isAuthenticated = await serverAuth.isAuthenticated()
  const user = await serverAuth.getAuthUser()

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated || !user) {
    const currentPath = '/manage'
    const redirectUrl = `/masuk?redirect=${encodeURIComponent(currentPath)}`
    redirect(redirectUrl)
  }

  // If authenticated, render the client component with user data
  return <ManagePageClient user={user} />
}

export default ManagePage
