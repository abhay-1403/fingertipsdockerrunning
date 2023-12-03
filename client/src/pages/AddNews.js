import React, { useEffect, useState } from "react";
//Editor is the component and Editor state is one of its properties
// State is therefore represented as a single immutable EditorState object,
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Layout from '../components/Layout';
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function AddNews() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  //This helps us to get the user details from the local storage which is being stored by the landing page.(line30)
  const user=JSON.parse(localStorage.getItem('users-pro'))
  //Just got testing purpose
  useEffect(() => {
    console.log(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);
  //Used to naviagte to home
  const navigate = useNavigate();
  //sends data and adds the data to the DB
  //Here payload is the data that is being sent
  const save = async () => {
    setLoading(true)
    try {
      const payload = {
        title,
        description,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        //Taking the object user and making that in mongodb newsitem.js type = Object
        //Creating object and changing the property names
        //We do this bcoz otherwise there will be an overlapping as every document will have _id and 
        //the user object will also have _id
        postedBy: {
          userid : user._id,
          email : user.email,
        },

      };
      await axios.post("/api/newsitems/addnewsitem", payload);
      setLoading(false)
      toast('News added successfully' , 'success')
      navigate('/home');
    } catch (error) {
      console.log(error);
      toast('Something went wrong' , 'error')
      setLoading(false)
    }
  };



  return (
    <Layout>
      {loading && <Spinner />}
      <h1 className="text-2xl font-semibold mt-5 ml-5">AddNews</h1>
      <div className='px-5 pt-2'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className='border-2 h-10 w-full border-gray-300 px-5'
          placeholder='Title' />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='border-2 w-full border-gray-300 my-2 px-5'
          rows="3"
          placeholder='Description'></textarea>
      </div>
      <div className="border-2 border-gray-300 mx-5 rounded px-2">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          editorClassName='draft-editor' />
      </div>
      <div className="flex justify-end space-x-5 pr-5 mt-5">
        <button className="px-5 py-1 bg-red-700 text-sm text-white" onClick={()=>navigate('/home')}>
          BACK
        </button>
        <button
          className="px-5 py-1 bg-green-700 text-sm text-white"
          onClick={save}
        >
          SAVE
        </button>
      </div>
    </Layout>
  )
}

export default AddNews

