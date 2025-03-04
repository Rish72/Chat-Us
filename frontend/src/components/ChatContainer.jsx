// import React from 'react'
import { useEffect } from "react";
import { useChatsStore } from "../store/useChatsStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

function ChatContainer() {
  const {messages, isMessageLoading, getMessages, selectedUsers} = useChatsStore();

  useEffect( () => {
    getMessages(selectedUsers._id)
  },[getMessages, selectedUsers._id])

  if(isMessageLoading){
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader/>
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
        <p>Messages</p>
      <MessageInput/>
    </div>
  )
}

export default ChatContainer