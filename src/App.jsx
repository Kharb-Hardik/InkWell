import { useEffect } from "react";
import authservice from "./Appwrite/Auth";
import { login,logout } from "./store/AuthSlice";
import { useDispatch } from "react-redux";
function App() {
  const {loading,setloading}=useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    authservice.getcurrentuser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}));
      }
      else{
        dispatch(logout());
      }
    })
    .finally(()=>setloading(false));
  },[])
  
    return !loading ?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
    )
    :null;
}

export default App
