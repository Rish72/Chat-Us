import  { useEffect } from 'react'
import { useChatsStore } from '../store/useChatsStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton';

function SideBar() {

    const {getUsers, isUserLoading, users, selectedUser, setSelectedUser} = useChatsStore();
    const onlineUsers = []

    useEffect( () => {
        getUsers();
    },[getUsers])

    if(isUserLoading) return <SidebarSkeleton />
  return (
    <div>SideBar</div>
  )
}

export default SideBar