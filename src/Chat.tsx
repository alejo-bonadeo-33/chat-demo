import { useEffect, useRef, useState } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: `Hola! Soy TUNI, tu tutor inteligente. ¿Cómo puedo ayudarte hoy?`,
    },
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // 1. Add User Message
    const userMsg = { type: "user", content: inputValue };
    setMessages((prev) => [...prev, userMsg]);

    // Clear input and disable textarea
    setInputValue("");
    setIsWaiting(true);

    // 2. Set Timeout for Bot Response
    setTimeout(() => {
      const botMsg = {
        type: "bot",
        content:
          userMsg.content.toLocaleLowerCase() === "ping"
            ? "Pong"
            : "Este mensaje es una respuesta automática y sirve unicamente como ilustración.",
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsWaiting(false); // Re-enable textarea
    }, 2000);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    document.querySelectorAll("textarea").forEach((el) => {
      el.focus({ preventScroll: true });
    });
  }, [messages, isWaiting]);

  const styles = {
    messageBubble: {
      padding: "8px 12px",
      borderRadius: "12px",
      fontSize: "14px",
      maxWidth: "80%",
    },

    senderUser: {
      alignSelf: "flex-end",
      backgroundColor: "rgba(0, 123, 255, 0.8)",
      backgroundBlendMode: "luminosity",
      color: "white",
      borderBottomRightRadius: "2px",
    },

    senderBot: {
      alignSelf: "flex-start",
      backgroundColor: "rgba(236, 236, 237, 0.8)",
      backgroundBlendMode: "luminosity",
      color: "#333",
      borderBottomLeftRadius: "2px",
    },
  };

  return (
    <>
      <button
        style={{
          top: "20px",
          position: "absolute",
          right: "20px",
          zIndex: 10,
          padding: isOpen ? "10px 20px" : "10px 50px",
          backgroundColor: "rgba(236, 236, 237, 0.91)",
          // backgroundBlendMode: "luminosity",
          borderRadius: "24px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)",
          fontWeight: "bold",
          color: "#333",
          transition: "all 0.3s ease",
          border: '1px solid rgba(0, 0, 0, 0.15)',
        }}
        onClick={toggleChat}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-x-icon lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-sparkles-icon lucide-sparkles"
          >
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
            <circle cx="4" cy="20" r="2" />
          </svg>
        )}
      </button>

      <div
        style={{
          position: "absolute",
          bottom: "80px",
          right: "40px",
          width: "300px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          overflow: "hidden",
          border: "1px solid rgb(204, 204, 204)",
          transition: "transform 0.3s ease, opacity 0.3s ease, visibility 0.3s",
          transform: isOpen ? "translateY(0)" : "translateY(20px)",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          backgroundColor: "rgba(236, 236, 237, 0.91)",
          backgroundBlendMode: "luminosity",
          zIndex: 10,
        }}
      >
        <div
          style={{
            padding: "10px 15px",
            borderBottom: "1px solid rgb(204, 204, 204)",
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
            overflowY: "scroll",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageBubble,
                ...(msg.type === "user" ? styles.senderUser : styles.senderBot),
                textAlign: msg.type === "user" ? "right" : "left",
                border: msg.type === "user" ? "unset" : "1px solid #ccc"
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
              Escribiendo...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div
          style={{
            padding: "10px",
            borderTop: "1px solid #ccc",
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
              backgroundColor: "rgba(236, 236, 237, 0.8)",
              backgroundBlendMode: "luminosity",
              cursor: isWaiting ? "not-allowed" : "text",
              color: "#333",
            }}
            placeholder={
              isWaiting ? "Espera por favor..." : "Preguntale a TUNI..."
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isWaiting}
          />
          <button
            style={{
              padding: "0 15px",
              height: "40px",
              backgroundColor: isWaiting ? "#ccc" : "rgba(0, 123, 255, 0.8)",
              backgroundBlendMode: "luminosity",
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
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
