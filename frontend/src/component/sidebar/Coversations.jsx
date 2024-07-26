/* eslint-disable no-unused-vars */
import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations.js";

const Coversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        <Conversation
          key={index}
          conversation={conversation}
          lastIndex={index === conversation.length - 1}
        />
      ))}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Coversations;
