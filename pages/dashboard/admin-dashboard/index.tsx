// pages/admin-dashboard/index.tsx
import Sidebar from '@/components/sidebar';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {

  const { data: session, status } = useSession();
  const user = session?.user;
  return (

    <div>
        <Sidebar>
             <h1>Welcome to the Dashboard {user?.name}</h1>
      </Sidebar>
    </div>
  );
};

export default DashboardPage;