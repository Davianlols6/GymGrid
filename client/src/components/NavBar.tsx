"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Icons } from "@/components/icons"
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

export default function Navbar() {
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
                                Add Programme
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    </>)
}