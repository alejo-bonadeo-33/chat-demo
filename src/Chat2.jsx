import React, { useRef, useState } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", content: "Hello! How can I help you today?" },
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // 1. Add User Message
    const userMsg = { type: "user", content: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    const messagesEndRef = useRef(null);

    // Clear input and disable textarea
    setInputValue("");
    setIsWaiting(true);

    // 2. Set Timeout for Bot Response
    setTimeout(() => {
      const botMsg = {
        type: "bot",
        content: userMsg.content.toLocaleLowerCase() === 'ping' ? 'Pong' : "Este mensaje es una respuesta automática y sirve unicamente como ilustración.",
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsWaiting(false); // Re-enable textarea
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const styles = {
    messageBubble: {
      padding: "8px 12px",
      borderRadius: "12px",
      fontSize: "14px",
      maxWidth: "80%",
    },

    senderUser: {
      alignSelf: "flex-end",
      backgroundColor: "#007bff",
      color: "white",
      borderBottomRightRadius: "2px",
    },

    senderBot: {
      alignSelf: "flex-start",
      backgroundColor: "#e9ecef",
      color: "#333",
      borderBottomLeftRadius: "2px",
    },
  };

  return (
    <>
      <button
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10,
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          fontWeight: "bold",
        }}
        onClick={toggleChat}
      >
        
      </button>

      <div
        style={{
          position: "absolute",
          bottom: "80px",
          right: "40px",
          width: "300px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          overflow: "hidden",
          border: "1px solid #e0e0e0",

          transition: "transform 0.3s ease, opacity 0.3s ease, visibility 0.3s",
          transform: isOpen ? "translateY(0)" : "translateY(20px)",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "10px 15px",
            borderBottom: "1px solid #ddd",
            fontWeight: "600",
            fontSize: "14px",
            color: "#333",
          }}
        >
          TUNI
        </div>

        <div
          style={{
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxHeight: "300px",
            overflowY: "scroll"
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageBubble,
                ...(msg.type === "user" ? styles.senderUser : styles.senderBot) ,
                textAlign: msg.type === "user" ? "right" : "left",
              }}
            >
              {msg.content}
            </div>
          ))}
          {isWaiting && (
            <div
              style={{
                ...styles.messageBubble,
                ...styles.senderBot,
                fontStyle: "italic",
                fontSize: "12px",
                color: "#888",
                textAlign: "left",
              }}
            >
              Bot is typing...
            </div>
          )}
        </div>

        <div
          style={{
            padding: "10px",
            borderTop: "1px solid #eee",
            backgroundColor: "#fff",
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <textarea
            style={{
              flex: 1,
              resize: "none",
              borderRadius: "4px",
              border: "1px solid #ccc",
              padding: "8px",
              fontSize: "13px",
              height: "40px",
              fontFamily: "inherit",
              outline: "none",
              backgroundColor: isWaiting ? "#f9f9f9" : "white",
              cursor: isWaiting ? "not-allowed" : "text",
              color: "#333",
            }}
            placeholder={isWaiting ? "Please wait..." : "Type a message..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isWaiting}
          />
          <button
            style={{
              padding: "0 15px",
              height: "40px",
              backgroundColor: isWaiting ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isWaiting ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "12px",
            }}
            onClick={handleSend}
            disabled={isWaiting}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
