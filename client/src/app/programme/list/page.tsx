'use client';

import { useState, useEffect } from 'react'
import DesktopNavBar from '../../../components/DesktopNavBar'
import MobileNavBar from '../../../components/MobileNavBar'
import ProgrammeListRow from '../../../components/ProgrammeListRow'
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

async function getData() {
  const res = await fetch('/api/programme/auth')
  const userData = await fetch('/api/member/auth')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  if (!userData.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  let data = { userData: await userData.json(), data: await res.json(), selectedProgramme: null }

  data.data.forEach(item => {
    if (item.programme_id === data.userData.active_programme_id) {
      data.selectedProgramme = item
    }
  })

  data.data = data.data.filter(item => item.programme_id !== data.userData.active_programme_id)
  
  return data
}

export default function Home() {
  const [isLoading, setLoading] = useState(true)
  const [userData, setuserData] = useState({})
  const [data, setData] = useState([])
  const [selectedProgramme, setselectedProgramme] = useState(null)
  const [newProgrammeName, setnewProgrammeName] = useState("")

  function refreshData() {
    setLoading(true)
    getData().then(data => {
      setData(data.data)
      setuserData(data.userData)
      setselectedProgramme(data.selectedProgramme)
      setLoading(false)
    })
  }

  async function createProgramme() {
    const res = await fetch('/api/programme/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newProgrammeName }),
    })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      alert('Failed to create the new programme: ' + (await res.json()).error)
      throw new Error('Failed to create the new programme')
    } else {
      setnewProgrammeName("")
      refreshData()
    }
  }

  //Call the getData function and assign returned data to the data state
  useEffect(() => {
    getData().then(data => {
      setData(data.data)
      setuserData(data.userData)
      setselectedProgramme(data.selectedProgramme)
      setLoading(false)
    })
  }, [])

  if (isLoading) return (<>
    <DesktopNavBar />
    <MobileNavBar page='programme' />
    <Link href="/programme"><Button variant="ghost" className='mx-1'>
      <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle mr-2" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
      </svg></span>Back
    </Button></Link>

    <div className="block">
      <div className="flex items-center h-[80vh] px-3">
        <Skeleton className="w-[400px] mx-auto">
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded" />
            <div className="h-6 bg-gray-300 rounded" />
            <div className="h-6 bg-gray-300 rounded" />
            <div className="h-6 bg-gray-300 rounded" />
          </div>
        </Skeleton>
      </div>
    </div>

  </>)

  if (!isLoading) return (
    <>
      <DesktopNavBar />
      <MobileNavBar page='programme' />
      <Link href="/programme"><Button variant="ghost" className='mx-1'>
        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle mr-2" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg></span>Back
      </Button></Link>

      <div className='text-3xl font-bold ml-5'>Programmes<div className='float-end mr-6'>

        <Sheet>
          <SheetTrigger asChild>
            <button className='bg-indigo-500 rounded-full p-1 mt-1'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
            </svg></button>
          </SheetTrigger>
          <SheetContent side="bottom" className='rounded-lg h-[95dvh]'>
            <SheetHeader>
              <SheetTitle>Create new programme</SheetTitle>
              <SheetDescription>
                Enter the name of the new programme and click the button below to create it.
              </SheetDescription>
            </SheetHeader>
            <div>
              <Input value={newProgrammeName} onChange={(e) => { setnewProgrammeName(e.target.value) }} className="col-span-3 text-md mt-3" />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={createProgramme} className='mt-3'>Create Programme</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

      </div></div>

      {(selectedProgramme === null) && <div className='mt-3 mx-5'>
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            {(data.length === 0) && ('You currently have no programmes. Click the button above to create a new programme.')}
            {(data.length !== 0) && ('You have yet to select an active programme.')}
          </AlertDescription>
        </Alert>
      </div>}


      {(selectedProgramme !== null) && <><div className='text-lg font-bold ml-5 mt-5'>Currently Selected</div>

        <div className='rounded-xl mx-5 dark:bg-zinc-700 bg-slate-100 p-2 mt-1'>
          <ProgrammeListRow item={selectedProgramme} setLoading={setLoading} setData={setData} setuserData={setuserData} selected={true} setselectedProgramme={setselectedProgramme} />
        </div>
      </>}

      {(selectedProgramme !== null) && <div className='text-lg font-bold ml-5 mt-5'>Others</div>}

      {(data.length !== 0) && <div className={`rounded-xl mx-5 dark:bg-zinc-700 bg-slate-100 p-2 ${(userData.active_programme_id !== null) ? 'mt-1' : 'mt-5'}`}>

        {data.map((item, index) => {
          return (<>
            {<>

              <ProgrammeListRow item={item} setLoading={setLoading} setData={setData} setuserData={setuserData} selected={false} setselectedProgramme={setselectedProgramme} />

              {(index !== data.length - 1) && <Separator className='my-2' />}

            </>}
          </>)
        })}

      </div>}

    </>
  );
}
