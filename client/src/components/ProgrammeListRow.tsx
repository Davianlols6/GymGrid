import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

export default function ProgrammeListRow({ item, setLoading, setData, setuserData, selected, setselectedProgramme }: { item: any, setLoading: any, setData: any, setuserData: any, selected: Boolean, setselectedProgramme: any}) {
    const [dialogState, setdialogState] = useState("")
    const [programmeName, setprogrammeName] = useState(item.name)

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

    function refreshData() {
        setLoading(true)
        getData().then(data => {
            setData(data.data)
            setuserData(data.userData)
            setselectedProgramme(data.selectedProgramme)
            setLoading(false)
          })
    }

    // function to select the programme
    async function selectProgramme() {
        const res = await fetch(`/api/member/auth/active_programme/${item.programme_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            alert('Failed to select the programme: ' + (await res.json()).error)
            throw new Error('Failed to select the programme')
        } else {
            refreshData()
        }
    }

        // function to unselect the programme
        async function unselectProgramme() {
            const res = await fetch(`/api/member/auth/active_programme/null`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    
            if (!res.ok) {
                // This will activate the closest `error.js` Error Boundary
                alert('Failed to unselect the programme: ' + (await res.json()).error)
                throw new Error('Failed to unselect the programme')
            } else {
                refreshData()
            }
        }

    // function to edit the name of the programme
    async function editName() {
        const res = await fetch(`/api/programme/auth/${item.programme_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: programmeName }),
        })

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            alert('Failed to edit the name of the programme: ' + (await res.json()).error)
            throw new Error('Failed to edit the name of the programme')
        } else {
            refreshData()
        }
    }

    // function to delete the programme
    async function deleteProgramme() {
        const res = await fetch(`/api/programme/auth/${item.programme_id}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            alert('Failed to edit the name of the programme: ' + (await res.json()).error)
            throw new Error('Failed to edit the name of the programme')
        } else {
            refreshData()
        }
    }

    if (!selected) return (<>
        <div className='flex align-middle px-2'>
            <div className='content-center text-lg'>{item.name}</div>
            <div className='grow content-center'>
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className='float-end h-6 px-2 mx-1'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                            </svg></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DialogTrigger asChild>
                                <DropdownMenuItem onClick={() => { setdialogState("selectActive") }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-check-circle mr-1" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>Select as active</DropdownMenuItem>
                            </DialogTrigger>

                            <DialogTrigger asChild>
                                <DropdownMenuItem onClick={() => { setdialogState("editName") }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-pencil-square mr-1" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>Edit programme name</DropdownMenuItem>
                            </DialogTrigger>

                            <DialogTrigger asChild>
                                <DropdownMenuItem className='text-red-500' onClick={() => { setdialogState("deleteProgramme") }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-trash mr-1" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>Delete</DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {(dialogState === "editName") && <DialogContent className="max-w-[330px] sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit programme name</DialogTitle>
                        </DialogHeader>
                        <div>
                            <Input id="name" value={programmeName} onChange={(e) => { setprogrammeName(e.target.value) }} className="col-span-3 text-md" />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit" onClick={editName}>Save changes</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>}

                    {(dialogState === "deleteProgramme") && <DialogContent className="max-w-[330px] sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete this programme?</DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose className="mt-2" asChild>
                                <Button type="submit">No</Button>
                            </DialogClose>

                            <DialogClose asChild>
                                <Button type="submit" className="bg-red-500 text-white" onClick={deleteProgramme}>Yes</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>}

                    {(dialogState === "selectActive") && <DialogContent className="max-w-[330px] sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to select this programme as active?</DialogTitle>
                            <DialogDescription>
                                Any currently selected programme will be replaced with this one.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose className="mt-2" asChild>
                                <Button type="submit">No</Button>
                            </DialogClose>

                            <DialogClose asChild>
                                <Button type="submit" className="bg-red-500 text-white" onClick={selectProgramme}>Yes</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>}

                </Dialog>
            </div>
            <div className='content-center'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right-circle float-end" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg></div>
        </div>
    </>)

    if (selected) return (<>
        <div className='flex align-middle px-2'>
            <div className='content-center text-lg'>{item.name}</div>
            <div className='grow content-center'>
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className='float-end h-6 px-2 mx-1'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                            </svg></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                        <DialogTrigger asChild>
                                <DropdownMenuItem onClick={() => { setdialogState("editName") }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-pencil-square mr-1" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>Edit programme name</DropdownMenuItem>
                            </DialogTrigger>

                            <DialogTrigger asChild>
                                <DropdownMenuItem className="text-red-500" onClick={() => { setdialogState("unselectActive") }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-check-circle mr-1" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>Unselect as active</DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {(dialogState === "editName") && <DialogContent className="max-w-[330px] sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit programme name</DialogTitle>
                        </DialogHeader>
                        <div>
                            <Input id="name" value={programmeName} onChange={(e) => { setprogrammeName(e.target.value) }} className="col-span-3 text-md" />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit" onClick={editName}>Save changes</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>}

                    {(dialogState === "unselectActive") && <DialogContent className="max-w-[330px] sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to unselect this programme as active?</DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose className="mt-2" asChild>
                                <Button type="submit">No</Button>
                            </DialogClose>

                            <DialogClose asChild>
                                <Button type="submit" className="bg-red-500 text-white" onClick={unselectProgramme}>Yes</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>}

                </Dialog>
            </div>
            <div className='content-center'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right-circle float-end" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg></div>
        </div>
    </>)
}