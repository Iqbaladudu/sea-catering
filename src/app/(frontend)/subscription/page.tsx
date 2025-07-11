import * as React from 'react'
import { redirect } from 'next/navigation'
import { serverAuth } from '@/lib/auth-server'
import { SubscriptionPageClient } from '@/components/subscription/subscription-page-client'

interface SubscriptionPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const SubscriptionPage = async ({ searchParams: _ }: SubscriptionPageProps) => {
  // Check authentication on server side
  const isAuthenticated = await serverAuth.isAuthenticated()
  const user = await serverAuth.getAuthUser()

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated || !user) {
    const currentPath = '/subscription'
    const redirectUrl = `/masuk?redirect=${encodeURIComponent(currentPath)}`
    redirect(redirectUrl)
  }

  // If authenticated, render the client component with user data
  return <SubscriptionPageClient user={user} />
}

export default SubscriptionPage
