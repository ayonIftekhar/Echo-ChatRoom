import { useParams } from "react-router-dom";
import { Navbar } from "../../../components/Navbar/Navbar";
import { useState, useEffect, useRef, useContext } from "react";
import { getRoomDetails, getRoomTexts } from "../../../BackendAPI/UserBackend";
import { toast } from "react-toastify";
import { connectChatRoom, sendMessage } from "../../../ChatSocket/ChatSocket";
import { UserRoomContext } from "../../../Context/RoomContext";

export function SingleRoom() {
  const { handle } = useParams();
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);

  const messagesContainerRef = useRef(null);
  const topRef = useRef(null);
  const cursorRef = useRef(null); // ✅ persist cursor across renders

  const { user } = useContext(UserRoomContext);

  // ✅ Get room details
  async function fetchRoomDetails() {
    try {
      const response = await getRoomDetails(handle);
      if (response.status === 200) {
        setRoom(response.data);
      }
    } catch {
      toast.error("Error in getting room details");
    }
  }

  // ✅ Fetch messages for current page / cursor
  async function fetchRoomTexts() {

    setLoading(true);
    try {
      let response;
      if (cursorRef.current) {
        response = await getRoomTexts(handle, page, cursorRef.current);
      } else {
        response = await getRoomTexts(handle, page);
      }

      if (response.status === 200) {
        const newMessages = response.data.messages;
        console.log(response.data);

        if (newMessages.length === 0 || response.data.last === true) {
          setLast(true); // ✅ force end scroll
          return;
        }

        setMessages((prev) => [...newMessages.reverse(), ...prev]);
        setLast(response.data.last);
        cursorRef.current = response.data.cursor;
      }
    } catch {
      //toast.error("Error in getting room texts");
      setLast(true)
    } finally {
      setLoading(false);
    }
  }

  // ✅ Mount logic
  useEffect(() => {
    fetchRoomDetails();

    if (handle) {
      connectChatRoom(handle, (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
    }
  }, []);

  // ✅ Infinite scroll observer
  useEffect(() => {
    if (last || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    const topEl = topRef.current;
    if (topEl) observer.observe(topEl);

    return () => observer.disconnect();
  }, [loading, last]);

  // ✅ Fetch messages when page changes
  useEffect(() => {
    fetchRoomTexts();
  }, [page]);

  // ✅ Send new message
  const handleSendMessage = () => {
    if (!text.trim()) return;

    sendMessage(handle, {
      sender: user.name,
      content: text,
      roomHandle: room?.handle,
    });

    setText("");
  };

  return (
    <div className="flex-column">
      <div>
        <Navbar />
      </div>
      <div
        className="container"
        style={{ marginLeft: "300px", maxWidth: "1000px" }}
      >
        {/* Header */}
        <div className="">
          <br />
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0 text-primary fw-bold">
              {room?.name || handle}
            </h1>
            <span className="badge bg-info fs-6">Public</span>
          </div>
          <p className="text-muted mb-4">{room?.description}</p>
        </div>

        {/* Members */}
        <div className="mb-4">
          <h6 className="text-muted">Members: {room?.users?.length}</h6>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="bg-white rounded shadow-sm p-4 mb-4"
          style={{
            minHeight: "400px",
            maxHeight: "60vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div ref={topRef} className="mb-4"></div>
            {messages.map((msg, index) => (
              <div key={index} className="mb-3">
                <strong className="text-secondary">{msg.sender}:</strong>{" "}
                {msg.content}
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="d-flex gap-2 mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button className="btn btn-primary px-4" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
