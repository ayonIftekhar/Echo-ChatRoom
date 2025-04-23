import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getAllRooms, joinRoom, searchRooms } from "../../../BackendAPI/UserBackend";
import { Navbar } from "../../../components/Navbar/Navbar";

export function ListRooms(){

    const [rooms , setRooms] = useState([]);
    const [page , setPage ] = useState(0);
    const [last , setLast] = useState(false);
    const [loading , setLoading] = useState(false);
    
    const [searchType, setSearchType] = useState("name");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const loadRef = useRef(null);

    async function retrieveRooms() {
      setLoading(true);
      try {
        const response = isSearching 
          ? await searchRooms(searchType, searchQuery, page)
          : await getAllRooms(page);
        
        if (response.status === 200) {
          if (page === 0) {
            setRooms(response.data.allRooms);
          } else {
            setRooms(prev => [...prev, ...response.data.allRooms]);
          }
          setLast(response.data.last);
        }
      }catch(e){
        toast.error(e.response.data)
      }finally{
        setLoading(false);
      }
    }

    useEffect( ()=>{
        retrieveRooms();
    } ,[page, isSearching]);

    useEffect( ()=>{
      if(last || loading) return;
      const observer = new IntersectionObserver(
        (entries)=>{
          if(entries[0].isIntersecting) {
            setPage(prev=>prev+1);
          }
        }
      )

      if(loadRef.current) observer.observe(loadRef.current);
      
      return ()=>observer.disconnect();
    },[last,loading])

    const handleSearch = () => {
      if (!searchQuery.trim()) {
        if(isSearching){
          setIsSearching(false);
          setPage(0);
          setRooms([]);
          setLast(false);
        }
        return;
      }
      setIsSearching(true);
      setPage(0);
      setRooms([]);
      setLast(false);
    };

    const handleJoinRoom = async (handle) => {
      try {
        const response = await joinRoom(handle);
        if (response.status === 200) {
          toast.success("Successfully joined the room!");
        }
      } catch (e) {
        toast.error(e.response.data);
      }
    };

    return (
      <div className="flex-column">
        <div>
          <Navbar />
        </div>
        <div className="container" style={{ marginLeft: "300px" }}>
          <br />
          <h2 className="mb-4 text-primary">All Chatrooms</h2>

          {/* Search Bar */}
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="input-group">
                <select 
                  className="form-select" 
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  style={{ maxWidth: "120px" }}
                >
                  <option value="name">Name</option>
                  <option value="handle">Handle</option>
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Search by ${searchType}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ maxWidth: "300px" }}
                />
                <button 
                  className="btn btn-primary" 
                  onClick={handleSearch}
                >
                  <i className="bi bi-search"></i> Search
                </button>
              </div>
            </div>
          </div>

          <div className="flex-column">
            {/* Chatroom Cards */}
            {rooms.length === 0 ? (
              <p>No Chat Rooms Available...</p>
            ) : (
              <>
                {rooms.map((room) => (
                  <div className="col-md-8 mb-4" key={room.handle}>
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
                        <button 
                          className="btn btn-primary btn-md float-end"
                          onClick={() => handleJoinRoom(room.handle)}
                        >
                          Join Room
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Repeat this block for other rooms */}
          </div>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          {!last ? (
            <>
              <p className="text-center text-muted">
                {" "}
                🌐 Hang tight... more rooms are loading!
              </p>
              <div ref={loadRef}></div>
            </>
          ) : (
            <p className="text-center text-muted mt-3">
              🎉 That's all! You've reached the end of the chatrooms.
            </p>
          )}
          
        </div>
      </div>
    );
}