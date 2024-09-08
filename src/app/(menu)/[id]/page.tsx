'use client'

import { useParams } from 'next/navigation'
import React from 'react'

export default function MovieDetailsPage() {
  const { id } = useParams()
  return (
    <div>
      MovieDetailsPage
      {id}
    </div>

  )
}
