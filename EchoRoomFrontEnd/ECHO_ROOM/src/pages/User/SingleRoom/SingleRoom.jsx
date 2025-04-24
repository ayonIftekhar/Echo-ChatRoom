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
    const [message, setMessage] = useState([]);
    const [text, setText] = useState("");
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [last, setLast] = useState(false);
    const messagesContainerRef = useRef(null);
    const topRef = useRef(null);
    let cursor= null;

    const {user} = useContext(UserRoomContext);

    async function fetchRoomDetails(){
        try{
            const response = await getRoomDetails(handle);
            if(response.status === 200){
                console.log(response.data);
                setRoom(response.data);
            }
        }catch{
            toast.error("Error in getting room details");
        }
    }

    async function fetchRoomTexts(){
        setLoading(true);
        try{
          let response;
          cursor ? 
            response = await getRoomTexts(handle,page,cursor) :
            response = await getRoomTexts(handle,page);
          if(response.status === 200){
              const newMessages = response.data.messages;
              setMessage(prev => [...newMessages.reverse(), ...prev]);
              setLast(response.data.last);
              cursor = (response.data.cursor);
              //console.log(cursor);
          }
        }
        catch{
            toast.error("Error in getting room texts");
        }
        finally{
            setLoading(false);
        }
    }

    // Initial mount effect
    useEffect(() => {
        fetchRoomDetails();

        if (handle) {
            connectChatRoom(handle, (msg) => {
                setMessage((prev) => [...prev, msg]);
            });
        }
    }, []);

    useEffect(() => {
        if (last || loading) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        });

        if (topRef.current) {
            observer.observe(topRef.current);
        }

        return () => observer.disconnect();
    }, [loading, last]);

    useEffect(() => {
        fetchRoomTexts();
    }, [page]);

    const handleSendMessage = () => {
        if (!text.trim()) return;
        const name = user.name;

        sendMessage(handle, {
            sender: name,
            content: text,
            roomHandle: room?.handle,
        });

        setText("");
    }

    return (
      <div className="flex-column">
        <div>
          <Navbar />
        </div>
        <div
          className="container"
          style={{ marginLeft: "300px", maxWidth: "1000px" }}
        >
          {/* Room Header */}
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

          {/* Members List */}
          <div className="mb-4">
            <h6 className="text-muted">Members: {room?.users?.length}</h6>
          </div>

          {/* Messages Section */}
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
              {message.map((msg, index) => (
                <div key={index} className="mb-3">
                  <strong className="text-secondary">{msg.sender}:</strong>{" "}
                  {msg.content}
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="d-flex gap-2 mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="btn btn-primary px-4"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
}
