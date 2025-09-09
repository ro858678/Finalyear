'use client';

import React from 'react';
import Header from './_components/Header';
import dynamic from 'next/dynamic';

const CompanyDashboard = dynamic(
  () => import('./_components/company_dashboard'), 
  { ssr: false }
);

function DashboardPage() {
  return (
    <div className="py-6 px-4 max-w mx-auto">
      <div className="flex-1 pt-10 space-y-6">
        <Header />
        <CompanyDashboard />
      </div>
    </div>
  );
}

export default DashboardPage;
