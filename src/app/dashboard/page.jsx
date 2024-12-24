'use client';

import { useEffect, useState } from 'react';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import { useSearchParams } from 'next/navigation';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashboardComp from '../components/DashboardComp';
export default function Dashboard() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}

      {tab === 'posts' && <DashPosts />}

      {tab === 'users' && <DashUsers />}
      {tab === 'dash' && <DashboardComp />}
    </div>
  );
}