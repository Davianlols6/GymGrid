'use client';

import { useState } from 'react'
import DesktopNavBar from '../../components/DesktopNavBar'
import MobileNavBar from '../../components/MobileNavBar'
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'

export default function Home() {

  return (
    <>
      <DesktopNavBar />
      <MobileNavBar page='programme' />
      <div className='my-5'>
        <span className='text-3xl font-bold px-5'>Today <span className='text-2xl font-semibold text-gray-500'>6 March</span></span>
        <div className='float-end mr-6'><button className='bg-indigo-500 rounded-full p-1 mt-1'><Link href="/programme/list"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></Link></button></div>

      </div>
      <div className='rounded-xl mx-5 dark:bg-zinc-700 bg-slate-100 p-2'>
        <div className='text-md text-gray-500 dark:text-gray-300 font-semibold'>Day 1</div>

        <div className='text-lg font-semibold'>Bench</div>
        <div className='grid grid-cols-12 text-sm'>
          <div className='col-span-2'><span className='font-semibold'>3</span> Sets</div>
          <div className='mx-auto'><Separator orientation="vertical" /></div>
          <div className='col-span-4'>
            <span className='font-semibold'>5+</span> Reps
          </div>
          <div className='mx-auto'><Separator orientation="vertical" /></div>
          <div className='col-span-4'><span className='font-semibold'>easy</span> Weight</div>
        </div>

        <div className='text-lg font-semibold mt-2'>3s Negatives Pullups</div>
        <div className='grid grid-cols-12 text-sm'>
          <div className='col-span-2'><span className='font-semibold'>2</span> Sets</div>
          <div className='mx-auto'><Separator orientation="vertical" /></div>
          <div className='col-span-4'>
            <span className='font-semibold'>AMRAP</span> Reps
          </div>
          <div className='mx-auto'><Separator orientation="vertical" /></div>
          <div className='col-span-4'><span className='font-semibold'>BW</span> Weight</div>
        </div>

        <div className='text-lg font-semibold mt-2'>Incline DB Bench</div>
        <div className='grid grid-cols-12 text-sm'>
          <div className='col-span-2'><span className='font-semibold'>3</span> Sets</div>
          <div className='mx-auto'><Separator orientation="vertical" /></div>
          <div className='col-span-4'>
            <span className='font-semibold'>8-12</span> Reps
          </div>
          <div className='mx-auto'><Separator orientation="vertical" /></div>
          <div className='col-span-4'><span className='font-semibold'>-</span> Weight</div>
        </div>

        <div className='text-lg font-semibold mt-2'>Single Arm Cable Row</div>
        <div className='grid grid-cols-12 text-sm'>
          <div className='col-span-2'><span className='font-semibold'>3</span> Sets</div>
          <div className='mx-auto'><Separator orientation="vertical" /></div>
          <div className='col-span-4'>
            <span className='font-semibold'>10-15</span> Reps
          </div>
          <div className='mx-auto'><Separator orientation="vertical" /></div>
          <div className='col-span-4'><span className='font-semibold'>-</span> Weight</div>
        </div>

        <div className='text-lg font-semibold mt-2'>DB Lat Raises</div>
        <div className='text-xs text-gray-500 dark:text-gray-300'>SUPERSET WITH</div>
        <div className='text-lg font-semibold'>DB Rear Delt Fly</div>
        <div className='grid grid-cols-12 text-sm'>
          <div className='col-span-2'><span className='font-semibold'>3</span> Sets</div>
          <div className='mx-auto'><Separator orientation="vertical" /></div>
          <div className='col-span-4'>
            <span className='font-semibold'>20-25</span> Reps
          </div>
          <div className='mx-auto'><Separator orientation="vertical" /></div>
          <div className='col-span-4'><span className='font-semibold'>-</span> Weight</div>
        </div>
      </div>
      <div className='text-3xl font-bold my-5 mx-5'>Tomorrow</div>
    </>
  );
}
