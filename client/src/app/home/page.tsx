'use client';

import { useState } from 'react'
import DesktopNavBar from '../../components/DesktopNavBar'
import MobileNavBar from '../../components/MobileNavBar'

export default function Home() {

  return (
    <>
      <DesktopNavBar />
      <MobileNavBar page='home' />

      <h1>Home</h1>
    </>
  );
}
