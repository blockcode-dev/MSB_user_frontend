"use client";
import { useState, useEffect } from "react";
import styles from "./ChatBox.module.scss";
import { IoSend } from "react-icons/io5";
import { AiFillSave } from "react-icons/ai";
import { IoIosCopy } from "react-icons/io";
import { Modal, Input, message, Skeleton } from "antd";
import { PiSortAscendingFill } from "react-icons/pi";
import {
  AipromtApi,
  SaveStoryApi,
  SortStoryApi,
  getLocalStorageItem,
} from "@/Constants/Api/Api";
import { useDispatch } from "react-redux";
import { fetchStoryHistory } from "@/redux/storyHistorySlice";

export default function ChatBox() {
  const [actionLoadingIndex, setActionLoadingIndex] = useState(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [saveInput, setSaveInput] = useState("");
  const [saveText, setSaveText] = useState("");
  const [saveTitle, setSaveTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const storedToken = getLocalStorageItem("UserLoginToken");
  const dispatch = useDispatch();

  useEffect(() => {
    setMessages([
      {
        from: "bot",
        text: "I am your story generator, please enter a story title.",
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const loadingMessage = { from: "bot", text: "", loading: true };
    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    const currentInput = input; // Save current input to use later
    setSaveInput(currentInput);
    setInput("");
    setLoading(true);

    try {
      const response = await AipromtApi({ input: currentInput }, storedToken);
      const botText = response?.data?.data?.description || "No response received.";

      setMessages((prev) =>
        prev.map((msg, idx, arr) =>
          idx === arr.length - 1 && msg.loading ? { from: "bot", text: botText } : msg
        )
      );
    } catch (error) {
      console.error("API Error:", error);
      message.error("Failed to get response. Please try again later.");
      setMessages((prev) => prev.filter((msg) => !msg.loading));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text, index) => {
    setActionLoadingIndex(index);
    try {
      await navigator.clipboard.writeText(text);
      message.success("Message copied!");
    } catch {
      message.error("Failed to copy.");
    } finally {
      setActionLoadingIndex(null);
    }
  };
  

  const handleDownload = (text, index) => {
    setActionLoadingIndex(index);
    setSaveText(text);
    setSaveTitle("");
    setShowModal(true);
    setTimeout(() => setActionLoadingIndex(null), 500); // short delay just for UX
  };
  

  const handleSaveStory = async () => {
    if (!saveTitle.trim()) {
      message.warning("Please enter a title.");
      return;
    }

    const formData = {
      input: saveInput,
      title: saveTitle,
      description: saveText,
    };

    try {
      const response = await SaveStoryApi(formData, storedToken);
      message.success(response?.data?.message || "Story saved successfully.");
      await dispatch(fetchStoryHistory(storedToken)).unwrap();
      resetState();
    } catch (error) {
      console.error("SaveStory API Error:", error);
      message.error("Failed to save story.");
    }
  };

  const handleSortStory = async (text, index) => {
    setActionLoadingIndex(index);
    const formData = {
      input: saveInput,
      title: saveInput,
      description: text,
    };
  
    try {
      const response = await SortStoryApi(formData, storedToken);
      const sortText = response?.data?.data?.sortContent || "No sort content.";
      const longText = response?.data?.data?.longContent || "No long content.";
  
      setMessages((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          text: sortText,
          sortContent: sortText,
          longContent: longText,
          showing: "sort",
        };
        return updated;
      });
  
      message.success("Story sorted successfully.");
      await dispatch(fetchStoryHistory(storedToken)).unwrap();
    } catch (error) {
      console.error("SortStory API Error:", error);
      message.error("Failed to sort story.");
    } finally {
      setActionLoadingIndex(null);
    }
  };
  

  const toggleStoryLength = (index) => {
    setMessages((prev) => {
      const updated = [...prev];
      const current = updated[index];
      if (!current) return prev;

      const isShort = current.showing === "sort";

      updated[index] = {
        ...current,
        text: isShort ? current.longContent : current.sortContent,
        showing: isShort ? "long" : "sort",
      };

      return updated;
    });
  };

  const resetState = () => {
    setMessages([
      {
        from: "bot",
        text: "I am your story generator, please enter a story title.",
      },
    ]);
    setShowModal(false);
    setSaveInput("");
    setSaveText("");
    setSaveTitle("");
  };

  return (
    <div className={styles.chatBox}>
      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.messageWrapper} ${msg.from === "user" ? styles.user : styles.bot
              }`}
          >
            <div className={styles.message}>
              {msg.from === "bot" &&
                !msg.loading &&
                msg.text !==
                "I am your story generator, please enter a story title." && (
                  <div className={styles.messageTopActions}>
                  {actionLoadingIndex === index ? (
                    <div className={styles.icon}>
                      <Skeleton.Input active size="small" style={{ width: 80 }} />
                    </div>
                  ) : (
                    <>
                      <div className={styles.icon} onClick={() => handleCopy(msg.text, index)}>
                        <IoIosCopy /> Copy
                      </div>
                      <div className={styles.icon} onClick={() => handleDownload(msg.text, index)}>
                        <AiFillSave /> Save
                      </div>
                      {!msg.sortContent ? (
                        <div className={styles.icon} onClick={() => handleSortStory(msg.text, index)}>
                          <PiSortAscendingFill /> Sort
                        </div>
                      ) : (
                        <div className={styles.icon} onClick={() => toggleStoryLength(index)}>
                          <PiSortAscendingFill />
                          {msg.showing === "sort" ? "Long" : "Short"}
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                )}

              {msg.loading ? (
                <Skeleton active paragraph={{ rows: 3 }} style={{ height: 100, width: 200 }} />
              ) : (
                <div
  style={{
    maxHeight: "200px",
    overflowY: "auto",
    whiteSpace: "pre-wrap",
  }}
  dangerouslySetInnerHTML={{ __html: msg.text }}
/>

              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Enter story title..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={loading}>
          <IoSend color="#C8232C" />
        </button>
      </div>

      {/* Save Modal */}
      <Modal
        title="Save Story"
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
