"use client";
import { useState, useEffect } from "react";
import styles from "./ChatBox.module.scss";
import { IoSend } from "react-icons/io5";
import { AiFillSave } from "react-icons/ai";
import { IoIosCopy } from "react-icons/io";
import { Modal, Input, message, Skeleton } from "antd";
import {
  AipromtApi,
  SaveStoryApi,
  getLocalStorageItem,
} from "@/Constants/Api/Api";
import { useDispatch } from "react-redux";
import { fetchStoryHistory } from "@/redux/storyHistorySlice";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [saveinput, setSaveInput] = useState("");
  const [saveText, setSaveText] = useState("");
  const [saveTitle, setSaveTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const storedValue = getLocalStorageItem("UserLoginToken");
  const dispatch = useDispatch();

  useEffect(() => {
    // Set initial welcome message
    setMessages([
      {
        from: "bot",
        text: "I am your story generator, please enter story title.",
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const loadingMessage = { from: "bot", text: "", loading: true };
    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setSaveInput(input);
    setInput("");
    setLoading(true);

    try {
      const response = await AipromtApi({ input }, storedValue);
      const botText = response?.data?.data?.description || "No response received.";

      setMessages((prev) =>
        prev.map((msg, idx, arr) =>
          idx === arr.length - 1 && msg.loading
            ? { from: "bot", text: botText }
            : msg
        )
      );
    } catch (error) {
      console.error("API Error:", error);
      message.error("Failed to get response from bot.");
      setMessages((prev) =>
        prev.filter((msg) => !msg.loading)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    message.success("Message copied!");
  };

  const handleDownload = (text) => {
    setSaveText(text);
    setSaveTitle("");
    setShowModal(true);
  };

  const handleSaveStory = async () => {
    if (!saveTitle.trim()) {
      message.warning("Please enter a title");
      return;
    }

    const formData = {
      input: saveinput,
      title: saveTitle,
      description: saveText,
    };

    try {
      const response = await SaveStoryApi(formData, storedValue);
      message.success(response?.data?.message);
      dispatch(fetchStoryHistory(storedValue));
      setMessages([]);
      setShowModal(false);
    } catch (error) {
      console.error("SaveStory API Error:", error);
      message.error("Failed to save story.");
    }
  };

  return (
    <div className={styles.chatBox}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.messageWrapper} ${msg.from === "user" ? styles.user : styles.bot}`}
          >
            <div className={styles.message}>
              {/* Show copy/save icons only if bot message is not the welcome message */}
              {msg.from === "bot" && !msg.loading && msg.text !== "I am your story generator, please enter story title." && (
                <div className={styles.messageTopActions}>
                  <div className={styles.icon} onClick={() => handleCopy(msg.text)}>
                    <IoIosCopy />
                    copy
                  </div>
                  <div className={styles.icon} onClick={() => handleDownload(msg.text)}>
                    <AiFillSave />
                    save
                  </div>
                </div>
              )}

              {/* Message content */}
              {msg.loading ? (
                <Skeleton active paragraph={{ rows: 3 }} style={{ height: 100, width: 200 }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: msg.text }}></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input field */}
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Enter Story title..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>
          <IoSend color="#C8232C" />
        </button>
      </div>

      {/* Save Title Modal */}
      <Modal
        title="Save Title"
        open={showModal}
        onOk={handleSaveStory}
        onCancel={() => setShowModal(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <Input
          placeholder="Enter story title"
          value={saveTitle}
          onChange={(e) => setSaveTitle(e.target.value)}
        />
      </Modal>
    </div>
  );
}
