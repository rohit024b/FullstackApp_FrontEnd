import axios from "axios";
import { useEffect, useState } from "react"

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/blog`);
            if (response.status === 200) {
                setBlogs(response.data.msg);
            } else {
                setError("Failed to fetch blogs. Please try again.")
            }
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch blogs. Please try again.")
            setLoading(false);
        }
    }

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    const handleDelete = async (blogId) => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/blog/delete/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setBlogs(blogs.filter(blog => blog._id !== blogId))
        } catch (err) {
            setError("Failed to delete blog");
        }
    }

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchBlogs();
    }, []);

    return <div className="flex justify-center flex-col items-center p-4">
        <h2>Blogs Page</h2>

        {loading && <p>Loading Blogs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && <div className="w-full max-w-[800px]">
            {blogs.length > 0 && (
                blogs.map(blog => (
                    <div key={blog._id} className="border border-gray-300 p-4 mb-8 shadow-md">
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <p>Posted by: {blog.author.userName}</p>
                        <p>Published on: {formatDate(blog.createdAt)}</p>
                        {userId === blog.author._id && <button onClick={() => handleDelete(blog._id)} className="mt-2 text-red-500 hover:text-red-700">Delete</button>}
                    </div>

                ))
            )}
        </div>}
    </div>
}

export default Blogs