import React, { useEffect } from 'react'
import {Link, useParams} from "react-router-dom"
import axios from "axios";
function addLink(){}
function newLinks(){}
function handleLinkChange(){}

function InputLink({grouppages, setGrouppages, newGrouppage, setNewGrouppage, createGrouppage,createBaipost,baiposts,setBaiposts, file, setFile}) {
  let pid = useParams().pid;
  useEffect(() => {
    console.log("in effect: ", grouppages.length);
  },[grouppages])
  useEffect(() => {
    console.log("in effect: ", baiposts);
  },[baiposts])
  const addGrouppage = (event) => {
    event.preventDefault();
    let inputgroup = newGrouppage.replaceAll("https://www.facebook.com/","");
    let group_id = newGrouppage.replaceAll("https://www.facebook.com/groups/","");
    let newForm = new FormData();
    newForm.append('group', inputgroup);
    newForm.append('file', file);
    newForm.append('pages', 2);
    newForm.append('comments', true);
    newForm.append('reactors', true);
    var config = {
      method: 'post',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      url: 'http://103.143.143.211/crawl-group',
      // url: 'https://swapi.dev/api/people',
      data : newForm
    };
    console.log("newForm is: ", newForm);
    axios(config)
    .then(async function (response) {
      // console.log(JSON.stringify(response.data));
      console.log("response.data is: ", response.data);
      let returnBaipostArray = response.data;
      // console.log("group is: ", newGrouppage);
      // console.log("file is: ", file);
      // console.log("returnBaipostArray is: ", returnBaipostArray);
      // console.log("returnBaipostArray[0].with is: ", returnBaipostArray[0].with);
      // console.log("returnBaipostArray.with[0] is: ", returnBaipostArray[0].with[0]);
      // console.log("returnBaipostArray.with[0].name is: ", returnBaipostArray[0].with[0].name);
      const newGPObject= {
        name: returnBaipostArray[1].with[0].name,
        group_id: group_id
      }
      let returnedGrouppage = await createGrouppage({ pid, newGPObject });
      setGrouppages(grouppages.concat(returnedGrouppage));
      setNewGrouppage('');
      let newBaipostArray = [];
      returnBaipostArray.forEach(async function (baipost) {
        let linkArray = [];
        baipost.links.forEach(function (onelink) {
          linkArray.push(onelink.link);
        })
        const newBPObject = {
          post_id: baipost.post_id,
          post_url: baipost.post_url,
          user_id: baipost.user_id,
          user_url: ("https://www.facebook.com/").concat(baipost.user_id),
          username: baipost.username,
          text: baipost.text,
          time: baipost.time,
          images_lowquality: [...baipost.images_lowquality],
          video: baipost.video,
          links: [...linkArray],
          likes: baipost.likes,
          comments: baipost.comments,
          shares: baipost.shares,
        }
        let gid = returnedGrouppage._id;
        let returnedBaipost = await createBaipost({gid , newBPObject });
        newBaipostArray.push(returnedBaipost);
      });
      console.log("newBaipostArray are: ", newBaipostArray);
      console.log("baiposts at InputLink after Axios are: ", baiposts);
      // let newArray = baiposts.concat(newBaipostArray);
      newBaipostArray.push(...baiposts);
      console.log("newBaipostArray after push are: ", newBaipostArray);
      setBaiposts(newBaipostArray);
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
  }
  const handleGrouppageChange = (event) => {
    setNewGrouppage(event.target.value)
  }
  return (
    <>
      <form onSubmit={addGrouppage} className="inputLink-form">
      {console.log("baiposts at InputLink are: ", baiposts)}
      <div className="left">
        <div className="top create-label"><label htmlFor="createProject">Input Links</label></div>
        <div className="bottom create-submit">
          <input
            name="inputlink"
            id="inputlink"
            type="text"
            placeholder="Enter your links here"
            value={newGrouppage}
            onChange={handleGrouppageChange}
          />
          <input
            name="inputfile"
            id="inputfile"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0])
              }}
          />
        </div>
      </div>

      <div className="center">
      {/* <div className="top create-label"><label htmlFor="createProject">Scrolls</label></div> */}
        
      </div>

      <div className="right">
        <button type="submit" className="button">Create</button>
      </div>
    </form>
  </>
  )
}

export default InputLink