import filename from "./fileicon.png"
import {useState} from 'react'
import { FaFileWaveform } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";

function App() {

  const [ Ourfiles, setOurfiles] = useState([])

  fetch("http://localhost:3005/getfiles").then(
    function(res){
      return res.json()
    },
    function(req){
      console.log("Rejected")
    }
  ).then(
    function(res){
      setOurfiles(res)
    }
  )

    function upload(e){

      const data = {
        Name : e.target.files[0].name,
        Size : e.target.files[0].size,
      }

      fetch("http://localhost:3005/sendfiles", {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(data)
      })
    }

    const deleteall = (id)=>{
      fetch("http://localhost:3005/deleteall?id="+ id)
    }

  return (
    <div className='file'>
      <p>Upload file</p>
      <label className='box'htmlFor="upload">
      <img src={filename} alt=""/>
        <input type='file' id='upload' size={500} hidden onChange={(e)=> upload(e)}/>
        <p className="one">Drop your file or image</p>
        <p className="two">Maximum  file size 500 MP</p>
      </label>      
      <div className='output'>
        {
          Ourfiles.map(function(e){
            return(
              <div key={e._id}>
                <p className="p1"><FaFileWaveform/></p>
                <p className="p2">{e.Name}</p>
                <p className="p3">{(e.Size / 1024).toFixed(2)}KB</p>
                <p className="p4" onClick={()=> deleteall(e._id)}><HiMiniXMark/></p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
