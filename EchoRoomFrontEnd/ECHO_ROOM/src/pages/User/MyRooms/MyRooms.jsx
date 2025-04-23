import { useEffect, useRef, useState } from "react";
import { Navbar } from "../../../components/Navbar/Navbar";
import { getMyRooms } from "../../../BackendAPI/UserBackend";
import { toast } from "react-toastify";
import { UserRoomContext } from "../../../Context/RoomContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function MyRooms(){
    const { setUserRooms } = useContext(UserRoomContext);
    const [rooms, setRooms] = useState([]);
    const [last,setLast] = useState(false);
    const [page,setPage] = useState(0);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const bottom = useRef(null);

    async function retrieveRooms(){
        if (loading || last) return;
        setLoading(true);
        try{
            const response = await getMyRooms(page);
            if (response.data.allRooms && response.data.allRooms.length > 0) {
                setRooms(prev => [...prev, ...response.data.allRooms]);
                setUserRooms(prev => [...prev, ...response.data.allRooms]);
            }
            setLast(response.data.last);
        }catch{
            toast.error("Error retrieving rooms");
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        retrieveRooms();
    },[page]);

    useEffect(()=>{
        if(last || loading) return;
        const observer = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting){
                setPage(prev => prev + 1);
            }
        });

        if(bottom.current) observer.observe(bottom.current);

        return ()=>observer.disconnect();
    },[loading,last])  

    return(
      <div className="flex-column">
        <div>
          <Navbar />
        </div>
        <div className="container" style={{ marginLeft: "300px" }}>
          <br />
          <h2 className="mb-4 text-primary">My Chatrooms</h2>

          <div className="flex-column">
            {/* Chatroom Cards */}
            {rooms.length === 0 && !loading ? (
              <p>No Chat Rooms Available...</p>
            ) : (
              <>
                {rooms.map((room) => (
                  <div 
                    className="col-md-8 mb-4" 
                    key={room.handle}
                    onClick={() => navigate(`/user/chatrooms/my/${encodeURIComponent(room.handle)}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title fw-bold text-primary">
                          {room.name}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          @{room.handle}
                        </h6>
                        <p className="card-text">{room.description}</p>
                        <span className="badge bg-success">{room.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          {!last && !loading ? (
            <>
              <p className="text-center text-muted">
                {" "}
                🌐 Hang tight... more rooms are loading!
              </p>
              <div ref={bottom}></div>
            </>
          ) : loading ? (
            <p className="text-center text-muted">
              Loading...
            </p>
          ) : (
            <p className="text-center text-muted mt-3">
              🎉 That's all! You've reached the end of your chatrooms.
            </p>
          )}
        </div>
      </div>
    );
}
