import Login from "../../pages/LogIn/Login";


function RouteProtection({children}){

    const token = sessionStorage.getItem("jwt");

    if(token != null){
        return (
            <div>
                { children }
            </div>
        );
    }else{
        return(
            <Login></Login>
        );
    }
    
}

export default RouteProtection;