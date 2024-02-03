// This is for testing purposes.

import { NextRequest, NextResponse } from 'next/server'
import generateAccessToken from '@/utils/generateAccessToken'
import mixpanel from '@/services/mixpanel'

export async function POST(request) {
  try {
    const data = await request.json()
    const token = await generateAccessToken(data)

    return NextResponse.json({
      token,
    })
  } catch (error) {
    mixpanel.track('Error Event', {
      error_message: error.message,
      stack_trace: error.stack,
    })
    console.error('Could not generate token,', error)
    return NextResponse.json(
      {
        err: error,
      },
      { status: 500 },
    )
  }
}
