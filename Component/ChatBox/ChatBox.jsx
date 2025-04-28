"use client";
import { useState, useEffect } from "react";
import styles from "./ChatBox.module.scss";
import { IoSend } from "react-icons/io5";
import { AiFillSave } from "react-icons/ai";
import { IoIosCopy } from "react-icons/io";
import { Modal, Input, message, Skeleton } from "antd";
import { AipromtApi, SaveStoryApi, getLocalStorageItem } from "@/Constants/Api/Api";
import { useDispatch } from "react-redux";
import { fetchStoryHistory } from "@/redux/storyHistorySlice";

export default function ChatBox() {
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
      const response = await AipromtApi({ input }, storedToken);
      const botText = response?.data?.data?.description || "No response received.";

      setMessages((prev) =>
        prev.map((msg, idx, arr) =>
          idx === arr.length - 1 && msg.loading ? { from: "bot", text: botText } : msg
        )
      );
    } catch (error) {
      console.error("API Error:", error);
      message.error("Failed to get response from bot.");
      setMessages((prev) => prev.filter((msg) => !msg.loading));
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
      input: saveInput,
      title: saveTitle,
      description: saveText,
    };

    try {
      const response = await SaveStoryApi(formData, storedToken);
      message.success(response?.data?.message || "Story saved successfully.");

      await dispatch(fetchStoryHistory(storedToken)).unwrap();

      setMessages([
        {
          from: "bot",
          text: "I am your story generator, please enter story title.",
        },
      ]);
      setShowModal(false);
      setSaveInput("");
      setSaveText("");
      setSaveTitle("");
    } catch (error) {
      console.error("SaveStory API Error:", error);
      message.error("Failed to save story.");
    }
  };

  return (
    <div className={styles.chatBox}>
      {/* Message List */}
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.messageWrapper} ${msg.from === "user" ? styles.user : styles.bot}`}
          >
            <div className={styles.message}>
              {msg.from === "bot" && !msg.loading && msg.text !== "I am your story generator, please enter story title." && (
                <div className={styles.messageTopActions}>
                  <div className={styles.icon} onClick={() => handleCopy(msg.text)}>
                    <IoIosCopy />
                    Copy
                  </div>
                  <div className={styles.icon} onClick={() => handleDownload(msg.text)}>
                    <AiFillSave />
                    Save
                  </div>
                </div>
              )}

              {msg.loading ? (
                <Skeleton active paragraph={{ rows: 3 }} style={{ height: 100, width: 200 }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Enter Story title..."
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
