'use client';

import { useState } from 'react'
import DesktopNavBar from '../../../components/DesktopNavBar'
import MobileNavBar from '../../../components/MobileNavBar'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Home() {

  return (
    <>
      <DesktopNavBar />
      <MobileNavBar page='programme' />
      <Link href="/programme"><Button variant="ghost" className='mx-1'>
        
          <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg></span> Back
      </Button></Link>
      <div className='text-3xl font-bold mx-5'>Programmes</div>

    </>
  );
}
