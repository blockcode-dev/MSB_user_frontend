"use client";

import { useState } from "react";
import ChatBox from "./ChatBox";
import styles from "./ChatWidget.module.scss";
import Image from "next/image";
import AiStory from "../../public/assets/story-ai.png";
import { RiMessage2Line } from "react-icons/ri";
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <div className={styles.chatWidget}>
      {isOpen && <ChatBox />}
      {/* <button className={styles.toggleButton} onClick={toggleChat}>
        <Image src={AiStory} width={75} height={75} className={styles.aiicon} alt="AI Story" />
      </button> */}

      {/* Story Generator Button with Inline SVG */}
      <button className={styles.storyGeneratorBtn} onClick={toggleChat}>
      <RiMessage2Line />

        <span>Generate your own story</span>
      </button>

    
    </div>
  );
}
