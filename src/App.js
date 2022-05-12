import React,{useState} from 'react';
import axios from 'axios';
function App() {
    var [userObj,setUserObj]=useState({
        fn:"f.name",
        ln:"l.name",
        mobile:"mobile",
        myfile:null
    });
    var doUpdate=(event)=>{
        var{name,value}=event.target;
        setUserObj({
            ...userObj,[name]:value,
        });
    };
    function onPicChange(event)
    {
        setUserObj({...userObj,["myfile"]:event.target.files[0]});
    }
    var [responseMsg,setResponse]=useState("*");
    async function doSave(){
        var url="http://localhost:3001/react/save?fn=" +userObj.fn+"&ln="+userObj.ln+"&mobile="+userObj.mobile;
        var response= await axios.get(url);
        alert(JSON.stringify(response.data));
        setResponse(response.data.msg)
    }
    async function doSavePost() {
         var url="http://localhost:3001/react/save-post";
         var formData=new FormData();
        for(var x in userObj)
         {
             formData.append(x,userObj[x]);
         }
       var response= await axios.post(url,formData,{headers:{'Content-Type':'multipart/form-data'}});
        alert(JSON.stringify(response.data));
        setResponse(response.data.msg);
    }
    return(
        <center>
            <form >
                <p>
                    First Name:
                    <input type="text" name="fn" value={userObj.fn} onChange={doUpdate}></input>
                    <br></br>

                </p>
                <p>
                    Last Name:
                    <input type="text" name="ln" value={userObj.ln} onChange={doUpdate}></input>
                    <br></br>
                </p>
                <p>
                    Mobile:
                    <input type="text" name="mobile" value={userObj.mobile} onChange={doUpdate}></input>
                    <br></br>
                </p>
                <p>
                    <input type="file" name="myfile" onChange={onPicChange}></input>
                </p>
                <p>
                    <input type="button" value="Save Record" onClick={doSave}></input>
                    <input type="submit" value="(Submit) Save Record"></input>
                    <input type="button" value="Save Record (POST) with file uploading" onClick={doSavePost}></input>
                </p>
                <center>
                    <p>
                        {responseMsg}
                    </p>
                </center>
            </form>
        </center>
    );
}
export default App;