import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth';
import { auth, db, storage } from './config/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const blogsCollectionRef = collection(db, 'blogs')

  //All Blogs States
  const [blogs, setBlogs] = useState([])

  //New Blog States
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogDescription, setNewBlogDescription] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState(0)
  const [newBlogAward, setNewBlogAward] = useState(false)

  //Update Blog States
  const [updateBlogTitle, setUpdateBlogTitle] = useState('')

  //file upload states
  const [uploadedFile, setUploadedFile] = useState(null)

  const addBlog = async () => {
    try {
      await addDoc(blogsCollectionRef, {
        title: newBlogTitle,
        description: newBlogDescription,
        likes: newBlogLikes,
        award: newBlogAward,
        userId: auth?.currentUser?.uid
      })
      setNewBlogTitle('')
      setNewBlogDescription('')
      setNewBlogLikes(0)
      setNewBlogAward(false)
      getAllBlogs()
    } catch (error) {
      console.error(error)
    }
  }
  const getAllBlogs = async () => {
    try {
      const data = await getDocs(blogsCollectionRef)
      const filterdData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setBlogs(filterdData)
    } catch (error) {
      console.error(error)
    }
  }
  const deleteBlog = async (id) => {
    try {
      const selectedBlogDoc = doc(db, 'blogs', id)
      await deleteDoc(selectedBlogDoc)
      getAllBlogs()

    } catch (error) {
      console.error(error)
    }
  }
  const updateBlog = async (id) => {
    try {
      const selectedBlogDoc = doc(db, 'blogs', id)
      await updateDoc(selectedBlogDoc, { title: updateBlogTitle })
      setUpdateBlogTitle('')
      getAllBlogs()

    } catch (error) {
      console.error(error)
    }
  }
  const uploadFile = async () => {
    if (uploadedFile === null) return
    const fileFolderRef = ref(storage, `document-folder/${uploadedFile.name}`)
    try {
      await uploadBytes(fileFolderRef, uploadedFile)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    getAllBlogs()
  }, [])


  return (
    <div className="App">

      {/* Authentication */}
      <Auth />

      {/* Write new blog section */}
      <div>
        <h1>Write a Blog</h1>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => { setNewBlogTitle(e.target.value) }}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => { setNewBlogDescription(e.target.value) }}
        />
        <input
          type="number"
          placeholder="Likes"
          onChange={(e) => { setNewBlogLikes(e.target.value) }}
        />
        <input
          type="checkbox"
          checked={newBlogAward}
          onChange={(e) => { setNewBlogAward(e.target.checked) }}
        />
        <label>Awarded ?</label>
        <button onClick={addBlog}>Add Blog</button>

      </div>

      {/* All Blogs Section */}
      <div>
        <h1>Blogs</h1>
        <ul>
          {blogs.map(blog => (
            <div key={blog.id}>
              <h2>Title : {blog.title}</h2>
              <p>Description : {blog.description}</p>
              <p>Total : {blog.likes} likes</p>
              <p>Is Awarded : {blog.award ? 'yes' : 'no'}</p>
              {/* Update blog title section */}
              <input type="text" placeholder="Update Title"
                onChange={(e) => { setUpdateBlogTitle(e.target.value) }}
              />
              <button onClick={() => updateBlog(blog.id)}>Update Title</button>
              <br />
              <button onClick={() => deleteBlog(blog.id)}>Delete The Blog</button>
              <hr />
            </div>
          ))}
        </ul>
      </div>

      {/* Upload Document to storage */}
      <div>
        <h1>Upload Document</h1>
        <input type="file"
          onChange={(e) => { setUploadedFile(e.target.files[0]) }}
        />
        <button
          onClick={uploadFile}
        >Upload</button>
      </div>
    </div>
  );
}

export default App;
