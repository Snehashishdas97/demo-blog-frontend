const BLOG_DOMAIN = "http://35.226.51.207:8080/api";

export const getAllPosts = async () => {
  const response = await fetch(`${BLOG_DOMAIN}/post`);
  return response.ok ? await response.json() : [];
};

export const getPostById = async (id, token) => {
  const response = await fetch(`${BLOG_DOMAIN}/post/${id}`);
  const data =  await response.json()
  if (!response.ok) {
    throw new Error("Post with id: " + id + " not found");
  }
  return data;
};

export const submitNewPost = async (newPost, token) => {
  const response = await fetch(`${BLOG_DOMAIN}/post/1`, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};

export const updatePost = async (updatedPost, token) => {
  const response = await fetch(`${BLOG_DOMAIN}/posts`, {
    method: "PUT",
    body: JSON.stringify(updatedPost),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};

export const deletePost = async (postId, token) => {
  const response = await fetch(`${BLOG_DOMAIN}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.ok;
};

export const submitNewComment = async (postId, newComment, token) => {
  const response = await fetch(`${BLOG_DOMAIN}/comment/${postId}`, {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};

export const updateComment = async (updatedComment, token) => {
  const response = await fetch(`${BLOG_DOMAIN}/comments`, {
    method: "PUT",
    body: JSON.stringify(updatedComment),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error - ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const deleteComment = async (commentId, token) => {
  const response = await fetch(`${BLOG_DOMAIN}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error - ${response.status} ${response.statusText}`);
  }
  return response.ok;
};

export const register = async (registerRequest) => {
  const response = await fetch(`${BLOG_DOMAIN}/user`, {
    method: "POST",
    body: JSON.stringify(registerRequest),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.userName);
  }
  return data;
};

export const login = async (loginRequest) => {
  const response = await fetch(`${BLOG_DOMAIN}/authenticate`, {
    method: "POST",
    body: JSON.stringify(loginRequest),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
