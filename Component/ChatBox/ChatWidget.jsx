"use client";

import { useState } from "react";
import ChatBox from "./ChatBox";
import styles from "./ChatWidget.module.scss";
import Image from "next/image";
import AiStory from "../../public/assets/story-ai.png";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.chatWidget}>
      {isOpen && <ChatBox />}
      <button className={styles.toggleButton} onClick={toggleChat}>
        <Image src={AiStory} width={75} height={75} className={styles.aiicon} alt="AI Story" />
      </button>
    </div>
  );
}
