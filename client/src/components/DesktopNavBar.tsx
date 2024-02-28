"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function DesktopNavBar() {
    const { push } = useRouter();
    useEffect(() => {
        // Get user data and if no errors, redirect user to home page else stick to this page
        fetch("/api/member/auth")
            .then((res) => {
                if (res.status !== 200) {
                    push("/");
                }
            })
    }, [])

    return (<>
        <div className='mx-5 my-2'>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/home" legacyBehavior passHref>
                            <NavigationMenuLink className='text-lg font-bold font-sans'>
                                GymGrid
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Gym Programme
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <div>
                        <Button variant="outline" size="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                        </Button>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    </>)
}