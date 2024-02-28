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
        <div className='mx-5 my-2 hidden md:block'>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/home">
                            <NavigationMenuLink className='text-lg font-bold font-sans'>
                                GymGrid
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/programme">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Gym Programme
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/profile">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Profile
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    </>)
}