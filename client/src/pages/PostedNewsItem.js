import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Spinner from "../components/Spinner";

function PostedNewsItem() {
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("users-pro"));
  const navigate = useNavigate();
  //userid jo bheja hai that is payload in axios post
  const getData = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/newsitems/getnewsitemsbyuserid", {
        userid: user._id,
      });
      setLoading(false);
      setNewsItems(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteItem = async (newsid) => {
    setLoading(true);
    try {
      await axios.post("/api/newsitems/deletenewsitem", {
        newsid,
      });
      //This is called bcoz we have to show the updated table
      getData()
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}

      {newsItems.length > 0 && (
        <div className="p-10">
          <h1 className="text-2xl text-gray-800 mb-5 font-semibold">
            My Posted Items
          </h1>
          <table className="w-full border-2 border-gray-500 p-10">
            <thead className="w-full">
              <tr className="w-full">
                <th className="border-2 border-gray-500 p-2">Id</th>
                <th className="border-2 border-gray-500 p-2">Title</th>
                <th className="border-2 border-gray-500 p-2">Posted on</th>
                <th className="border-2 border-gray-500 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.map((item) => {
                return (
                  <tr>
                    <td className="border-2 border-gray-500 p-2">{item._id}</td>
                    <td className="border-2 border-gray-500 p-2">
                      {item.title}
                    </td>
                    <td className="border-2 border-gray-500 p-2">
                      {item.createdAt.slice(0, 10)}
                    </td>
                    <td className="border-2 border-gray-500 p-2 items-center">
                      <div className="flex justify-end space-x-5 pr-5 mt-5">
                        <button className="px-5 py-1 bg-red-700 text-sm text-white" 
                        onClick={()=> deleteItem(item._id)}>
                          Delete
                        </button>
                        <button
                          className="px-5 py-1 bg-green-500 text-sm text-white"
                          onClick={() => navigate(`/edit/${item._id}`)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </Layout>
  )
}

export default PostedNewsItem