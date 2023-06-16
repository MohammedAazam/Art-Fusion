"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'

export default function DefaultSideBar() {
    const session = useSession();

  return (
    <div className='bg-white shadow-lg w-full gap-3 rounded-sm flex flex-col items-center' style={{padding:"5px",paddingTop:"24px",paddingBottom:"24px"}}>
        <Avatar className='h-20 w-20'>
            <AvatarImage src={session.data?.user?.image ?? '/production_avatar.png'}/>
            <AvatarFallback>
                <AvatarImage src='/production_avatar.png'/>
            </AvatarFallback>
        </Avatar>
        <h1>{session.data?.user?.name}</h1>
        <span className='bg-indigo-200 text-indigo-700 py-1 px-2 rounded-full text-xs'>Production House</span>
        <Link href={"/production/create-production"}><Button size={"sm"}>Create Production</Button></Link>
    </div>
  )
}
