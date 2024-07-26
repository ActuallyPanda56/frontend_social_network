import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";

export const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`${Global.url}publication/publications`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setPosts(result.publications || []);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getPosts();
  }, []);

  return (
    <div
      className="mt-4 px-3"
      style={{
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 fs-3">Timeline</h1>
        <button className="btn btn-success">Show New</button>
      </header>

      <div
        className="d-flex overflow-auto"
        style={{
          margin: "30px 15px",
        }}
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              className="card mr-3 border border-primary"
              style={{
                display: "inline-block",
                width: "300px",
                margin: "10px",
              }}
              key={post._id}
            >
              <div className="card-header d-flex align-items-center rounded-lg">
                <img
                  className="rounded-circle mr-3"
                  src={`${Global.url}user/avatar/${post.user_id.image}`}
                  alt="User avatar"
                  width="200"
                  height="200"
                />
                <div>
                  <h5 className="mb-0 fs-4">
                    {`${post.user_id.name} ${post.user_id.last_name}`}
                  </h5>
                  <small className="text-muted fs-6">{post.user_id.nick}</small>
                </div>
              </div>
              <div className="card-body">
                <p className="card-text fs-5">{post.text}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-outline-success">Like</button>
                <button className="btn btn-outline-secondary">Comment</button>
              </div>
            </div>
          ))
        ) : (
          <p className="fs-5">No posts available</p>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-success fs-5">See More Posts</button>
      </div>
    </div>
  );
};
