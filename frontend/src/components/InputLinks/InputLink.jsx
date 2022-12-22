import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function addLink() {}
function newLinks() {}
function handleLinkChange() {}

function InputLink({
  grouppages,
  setGrouppages,
  newGrouppage,
  setNewGrouppage,
  createGrouppage,
  createBaipost,
  baiposts,
  setBaiposts,
  file,
  setFile,
  loader,
  setLoader,
}) {
  let pid = useParams().pid;
  const addGrouppage = (event) => {
    event.preventDefault();
    setLoader(true);
    let inputgroup = newGrouppage.replaceAll("https://www.facebook.com/", "");
    let group_id = newGrouppage.replaceAll(
      "https://www.facebook.com/groups/",
      ""
    );
    let newForm = new FormData();
    newForm.append("group", inputgroup);
    newForm.append("file", file);
    newForm.append("pages", 2);
    newForm.append("comments", true);
    newForm.append("reactors", true);
    var config = {
      method: "post",
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      url: "http://103.143.143.211/crawl-group",
      // url: 'https://swapi.dev/api/people',
      data: newForm,
    };
    axios(config)
      .then(async function (response) {
        let returnBaipostArray = response.data;
        const newGPObject = {
          name: returnBaipostArray[1].with[0].name,
          group_id: group_id,
        };
        let returnedGrouppage = await createGrouppage({ pid, newGPObject });
        setGrouppages(grouppages.concat(returnedGrouppage));
        setNewGrouppage("");
        setLoader(false);
        let newBaipostArray = [...baiposts];
        returnBaipostArray.forEach(async function (baipost) {
          let linkArray = [];
          baipost.links.forEach(function (onelink) {
            linkArray.push(onelink.link);
          });
          const newBPObject = {
            post_id: baipost.post_id,
            post_url: baipost.post_url,
            user_id: baipost.user_id,
            user_url: "https://www.facebook.com/".concat(baipost.user_id),
            username: baipost.username,
            text: baipost.text,
            time: baipost.time,
            images_lowquality: [...baipost.images_lowquality],
            video: baipost.video,
            links: [...linkArray],
            likes: baipost.likes,
            comments: baipost.comments,
            shares: baipost.shares,
          };
          let gid = returnedGrouppage._id;
          let returnedBaipost = await createBaipost({ gid, newBPObject });
          newBaipostArray.push(returnedBaipost);
        });
        setBaiposts(newBaipostArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleGrouppageChange = (event) => {
    setNewGrouppage(event.target.value);
  };
  function Disabled({ children }) {
    if (loader) {
      return (
        <div style={{ opacity: 0.5, pointerEvents: "none" }} disabled>
          {children}
        </div>
      );
    }
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <>
      {console.log("baiposts is: ", baiposts)}
      <form onSubmit={addGrouppage} className="inputLink-form">
        <div className="left">
          <div className="top create-label">
            <label htmlFor="createProject">Link of Facebook group</label>
          </div>
          <div className="bottom create-submit">
            <input
              name="inputlink"
              id="inputlink"
              type="text"
              placeholder="Enter your link here"
              value={newGrouppage}
              onChange={handleGrouppageChange}
            />
            <input
              name="inputfile"
              id="inputfile"
              placeholder="Enter your links here"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
        </div>

        <div className="center">
          {/* <div className="top create-label"><label htmlFor="createProject">Scrolls</label></div> */}
        </div>

        <div className="right">
          <Disabled>
            <button type="submit" className="button">
              Crawl
            </button>
          </Disabled>
          {loader ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
}

export default InputLink;
