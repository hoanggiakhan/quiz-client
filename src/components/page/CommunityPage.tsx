import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Community.css";
import { getIdUserByToken } from "../../utils/JwtService";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import { FaEllipsisV } from "react-icons/fa";

interface Post {
  id: number;
  fullName: string;
  avatarUrl?: string;
  content: string;
  imageUrl?: string;
  comments: Comment[];
  createdAt: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  fullName: string;
  avatarUrl?: string;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState<string>("");
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editedPostContent, setEditedPostContent] = useState<string>("");
  const [menuVisible, setMenuVisible] = useState<{ [key: number]: boolean }>({});
  const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});

  const userId = getIdUserByToken();
  const url = "http://localhost:8080";
  const menuRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${url}/api/posts`);
      const formattedPosts = response.data.map((post: Post) => ({
        ...post,
        createdAt: new Date(post.createdAt).toISOString(),
        comments: post.comments.map((comment: Comment) => ({
          ...comment,
          createdAt: new Date(comment.createdAt).toISOString(),
        })),
      }));
      setPosts(formattedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();

    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(menuRefs.current).forEach((key) => {
        const ref = menuRefs.current[Number(key)];
        if (ref && !ref.contains(event.target as Node)) {
          setMenuVisible((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePostSubmit = async () => {
    if (!userId) {
      toast.error("Bạn cần đăng nhập để đăng bài!");
      return;
    }

    if (!newPostContent.trim()) return;

    try {
      let imageUrl;
      if (newPostImage) {
        const formData = new FormData();
        formData.append("file", newPostImage);

        const uploadResponse = await axios.post(`${url}/api/images/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = uploadResponse.data;
      }

      const newPost = { content: newPostContent, imageUrl };
      const response = await axios.post(`${url}/api/posts/${userId}`, newPost);

      setPosts((prevPosts) => [
        { ...response.data, createdAt: new Date(response.data.createdAt).toISOString(), comments: [] },
        ...prevPosts,
      ]);

      setNewPostContent("");
      setNewPostImage(null);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleCommentSubmit = async (postId: number, commentContent: string) => {
    if (!userId) {
      toast.error("Bạn cần đăng nhập để bình luận!");
      return;
    }

    if (!commentContent.trim()) return;

    try {
      const newComment = { content: commentContent };
      const response = await axios.post(`${url}/api/posts/comment/${userId}/${postId}`, newComment);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, { ...response.data, createdAt: new Date(response.data.createdAt).toISOString() }] }
            : post
        )
      );
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleEditPost = async (postId: number) => {
    if (!editedPostContent.trim()) return;

    try {
      const updatedPost = { content: editedPostContent };
      const response = await axios.put(`${url}/api/posts/${userId}/${postId}`, updatedPost);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, content: response.data.content } : post
        )
      );

      setEditingPostId(null);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) return;

    try {
      await axios.delete(`${url}/api/posts/${userId}/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      toast.success("Bài viết đã được xóa!");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Đã xảy ra lỗi khi xóa bài viết.");
    }
  };

  return (
    <div className="community-wrapper">
      <ToastContainer />
      <div className="container mt-4">
        <h1 className="text-center mb-4">Cộng đồng</h1>

        {userId ? (
          <div className="create-post mb-4">
            <textarea
              className="form-control mb-2"
              placeholder="Chia sẻ bài viết của bạn..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            ></textarea>
            <input
              type="file"
              className="form-control mb-2"
              onChange={(e) => setNewPostImage(e.target.files ? e.target.files[0] : null)}
            />
            <button className="btn btn-primary w-100" onClick={handlePostSubmit}>
              Đăng bài
            </button>
          </div>
        ) : (
          <p className="text-danger text-center">Bạn cần đăng nhập để tạo bài viết.</p>
        )}

        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="card mb-4">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={post.avatarUrl || "./../../../public/user.jpg"}
                      alt="Avatar"
                      className="rounded-circle me-2"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    />
                    <h5 className="card-title mb-0">{post.fullName}</h5>
                  </div>

                  {editingPostId === post.id ? (
                    <div>
                      <textarea
                        className="form-control mb-2"
                        value={editedPostContent}
                        onChange={(e) => setEditedPostContent(e.target.value)}
                      ></textarea>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleEditPost(post.id)}
                      >
                        Lưu
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingPostId(null)}
                      >
                        Hủy
                      </button>
                    </div>
                  ) : (
                    <p className="card-text">{post.content}</p>
                  )}
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      className="img-fluid rounded mb-3"
                    />
                  )}
                </div>

                <div className="dropdown" ref={(el) => (menuRefs.current[post.id] = el)}>
                  <button
                    className="btn btn-link text-muted"
                    onClick={() =>
                      setMenuVisible((prev) => ({ ...prev, [post.id]: !prev[post.id] }))
                    }
                  >
                    <FaEllipsisV />
                  </button>
                  {menuVisible[post.id] && (
                    <div className="dropdown-menu show position-absolute" style={{ right: 0 }}>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setEditingPostId(post.id);
                          setEditedPostContent(post.content);
                          setMenuVisible({});
                        }}
                      >
                        Sửa bài viết
                      </button>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Xóa bài viết
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <small className="text-muted d-block">
                {format(new Date(post.createdAt), "dd/MM/yyyy HH:mm:ss")}
              </small>

              <div className="comments px-3 pb-3">
                <h6>Bình luận</h6>
                {expandedComments[post.id]
                  ? post.comments.map((comment) => (
                      <div key={comment.id} className="d-flex align-items-start mb-2">
                        <img
                          src={comment.avatarUrl || "./../../../public/user.jpg"}
                          alt="Avatar"
                          className="rounded-circle me-2"
                          style={{ width: "30px", height: "30px", objectFit: "cover" }}
                        />
                        <div>
                          <strong>{comment.fullName}:</strong> {comment.content}
                          <br />
                          <small className="text-muted">
                            {format(new Date(comment.createdAt), "dd/MM/yyyy HH:mm:ss")}
                          </small>
                        </div>
                      </div>
                    ))
                  : post.comments.slice(0, 1).map((comment) => (
                      <div key={comment.id} className="d-flex align-items-start mb-2">
                        <img
                          src={comment.avatarUrl || "./../../../public/user.jpg"}
                          alt="Avatar"
                          className="rounded-circle me-2"
                          style={{ width: "30px", height: "30px", objectFit: "cover" }}
                        />
                        <div>
                          <strong>{comment.fullName}:</strong> {comment.content}
                          <br />
                          <small className="text-muted">
                            {format(new Date(comment.createdAt), "dd/MM/yyyy HH:mm:ss")}
                          </small>
                        </div>
                      </div>
                    ))}
                {post.comments.length > 1 && (
                  <button
                    className="btn btn-link p-0"
                    onClick={() =>
                      setExpandedComments((prev) => ({
                        ...prev,
                        [post.id]: !prev[post.id],
                      }))
                    }
                  >
                    {expandedComments[post.id] ? "Ẩn bớt" : "Xem thêm"}
                  </button>
                )}
                <textarea
                  className="form-control mt-2"
                  placeholder={userId ? "Viết bình luận..." : "Bạn cần đăng nhập để bình luận"}
                  disabled={!userId}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && userId) {
                      e.preventDefault();
                      const target = e.currentTarget;
                      const commentContent = target.value;
                      handleCommentSubmit(post.id, commentContent);
                      target.value = "";
                    }
                  }}
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
