// pages/admin-dashboard/index.tsx
import Sidebar from '@/components/sidebar';
import { useUserContext } from '@/context/usercontext';
import { CircularProgress } from '@nextui-org/react';
import { SessionProvider, useSession } from 'next-auth/react';

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
