import { useState } from "react";
import { toast } from "react-toastify";
import { createRoom } from "../../../BackendAPI/UserBackend";
import { Navbar } from "../../../components/Navbar/Navbar";


export function CreateRoom(){

    const [room , setRoom] = useState({
        name : '',
        type : 'PUBLIC',
        handle : '',
        description : '',
    })

    function changeHandler(e){
        setRoom({
            ...room,[e.target.name] : e.target.value
        });
    }

    async function submitHandler(e){
        e.preventDefault();
        
        try{
            const response = await createRoom(room);
            if(response.status === 200){
                toast.success("Room Created Successfully!");
                setRoom({
                    name : '',
                    type : 'PUBLIC',
                    handle : '',
                    description : '',
                })
            }
        }catch(e){
            toast.error(e.response.data);
        }
    }

    return (
      <div className="d-flex">
        <Navbar />
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
          <h2 className="mb-4 text-primary">Create a New Chat Room</h2>
          <form
            className="p-4 border rounded bg-light"
            onSubmit={submitHandler}
          >
            {/* Room Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Room Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={room.name}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="handle" className="form-label">
                Handle Name
              </label>
              <input
                type="text"
                className="form-control"
                id="handle"
                name="handle"
                value={room.handle}
                onChange={changeHandler}
                required
              />
            </div>

            {/* Room Type */}
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Room Type
              </label>
              <select
                className="form-select"
                id="type"
                name="type"
                onChange={changeHandler}
                value={room.type}
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description (optional)
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={room.description}
                onChange={changeHandler}
              ></textarea>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-100">
              Create Room
            </button>
          </form>
        </div>
      </div>
    );

}