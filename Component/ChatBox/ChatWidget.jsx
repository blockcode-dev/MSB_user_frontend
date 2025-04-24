'use client';

import { useState } from 'react';
import { TbMessageChatbot } from 'react-icons/tb';
import ChatBox from './ChatBox';
import styles from './ChatWidget.module.scss';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={styles.chatWidget}>
      {isOpen && <ChatBox />}
      <button className={styles.toggleButton} onClick={toggleChat}>
        <TbMessageChatbot size={30} />
      </button>
    </div>
  );
}
