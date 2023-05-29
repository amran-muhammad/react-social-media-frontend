import { Button, Form, Input, Space } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { callApi } from "../../common/callApi";
import { useEffect, useState } from "react";
import { Card, List } from "antd";
import moment from "moment";
export function Posts() {
  let [content, setContent] = useState("");
  let [searchValue, setSearchValue] = useState("");
  let [posts, setPosts] = useState([]);
  let [user, setUser] = useState({});
  let [editIndex, setEditIndex] = useState(-1);
  let [editCommentIndex, setEditCommentIndex] = useState(-1);
  let [comment, setComment] = useState("");
  let [id, setID] = useState(0);
  const onFinish = async (values) => {
    let newPost = {
      user_id: user.id,
      content,
    };
    const res = await callApi.postApi("/posts/store", newPost);
    let newData = { ...res.post, user: { name: user.name, id: user.id } };
    setContent((content = ""));
    setPosts([newData, ...posts]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const makeLikeInPost = async (item) => {
    let like_object = { user_id: user.id, post_id: item.id };

    if (item.liked === 1) {
      like_object.unlike = 1;
    }

    await callApi.postApi("/like-in-post/store", like_object);
    setPosts((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === item.id) {
          if (item.liked === 1) {
            return {
              ...obj,
              liked: 0,
              number_of_likes: obj.number_of_likes - 1,
            };
          } else {
            return {
              ...obj,
              liked: 1,
              number_of_likes: obj.number_of_likes + 1,
            };
          }
        }
        return obj;
      });

      return newState;
    });
  };

  const deletePost = async (id) => {
    const res = await callApi.postApi("/posts/delete", { id });
    if (res.del === 1) setPosts(posts.filter((a) => a.id !== id));
  };

  const updatePost = async (id) => {
    await callApi.postApi("/posts/update", { id, content });
    setPosts((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === id) {
          return { ...obj, content };
        }
        return obj;
      });

      return newState;
    });
  };

  const getPost = async () => {
    const res = await callApi.getApi("/posts/get", {
      user_id: user.id,
      searchValue: searchValue,
    });
    setPosts((posts = res.posts));
  };

  const saveComment = async (item) => {
    const res = await callApi.postApi("/comment-in-post/store", {
      user_id: user.id,
      post_id: item.id,
      comment,
    });
    setPosts((prevState) => {
      const newState = prevState.map((obj) => {
        let newComments = [...obj.comments, { ...res.data, user }];
        if (obj.id === item.id) {
          return { ...obj, comments: newComments };
        }
        return obj;
      });

      return newState;
    });
  };

  const deleteComment = async (item, main_item) => {
    await callApi.postApi("/comment-in-post/delete", { id: item.id });
    setPosts((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === main_item.id) {
          let newComments = obj.comments.filter((a) => a.id !== item.id);
          return { ...obj, comments: newComments };
        }
        return obj;
      });

      return newState;
    });
  };

  const updateComment = async (item, main_item) => {
    await callApi.postApi("/comment-in-post/update", { id: item.id, comment });
    setPosts((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === main_item.id) {
          let newComments = obj.comments.map((a) => {
            if (a.id === item.id) {
              return { ...a, comment };
            }
            return a;
          });
          return { ...obj, comments: newComments };
        }
        return obj;
      });

      return newState;
    });
    setEditCommentIndex((editCommentIndex = -1));
  };

  useEffect(() => {
    setUser((user = JSON.parse(localStorage.getItem("user"))));
    getPost();
  }, []);
  return (
    <div>
      <div style={{ maxWidth: "300px" }}>
        <Input
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue((searchValue = e.target.value));
            getPost();
          }}
          showCount
          maxLength={100}
        />
      </div>
      <br />
      <br />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="intro"
          label="Write a post"
          rules={[{ required: true, message: "Post can not be empty!" }]}
        >
          <Input.TextArea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            showCount
            maxLength={100}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Post
          </Button>
        </Form.Item>
      </Form>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={posts}
        renderItem={(item, index) => (
          <List.Item>
            <Card title={item.user.name}>
              {item.content}
              <div>
                {editIndex === index ? (
                  <>
                    <Input.TextArea
                      value={content}
                      onChange={(e) => {
                        setContent((content = e.target.value));
                      }}
                    />
                    <Space wrap>
                      <Button
                        type="primary"
                        onClick={() => {
                          updatePost(item.id);
                          setEditIndex((editIndex = -1));
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => {
                          setEditIndex((editIndex = -1));
                        }}
                      >
                        Cancel
                      </Button>
                    </Space>
                  </>
                ) : (
                  <></>
                )}

                <p>{item.number_of_likes} People liked this post</p>
                {editIndex === -1 ? (
                  <>
                    <Space wrap>
                      {item.user.id === user.id ? (
                        <Button
                          onClick={() => {
                            setContent((content = item.content));
                            setEditIndex((editIndex = index));
                          }}
                        >
                          Edit
                        </Button>
                      ) : (
                        <></>
                      )}
                      {item.user.id === user.id ? (
                        <Button onClick={() => deletePost(item.id)}>
                          Delete
                        </Button>
                      ) : (
                        <></>
                      )}
                      <Button onClick={() => makeLikeInPost(item)}>
                        {" "}
                        {item.liked && item.liked === 1 ? (
                          "Liked"
                        ) : (
                          <>
                            <LikeOutlined />
                          </>
                        )}
                      </Button>
                    </Space>
                    <br />
                    <br />
                    <h2>Comments</h2>
                    <hr />
                    {item.comments.length > 0 ? (
                      <>
                        {item.comments.map((i, k) => (
                          <>
                            <div>
                              <h3>{i.user.name} </h3>

                              {editCommentIndex === k && id === item.id ? (
                                <>
                                  <Input.TextArea
                                    value={comment}
                                    onChange={(e) => {
                                      setComment((comment = e.target.value));
                                    }}
                                  ></Input.TextArea>
                                  <Space wrap>
                                    <Button
                                      onClick={() => {
                                        setEditCommentIndex(
                                          (editCommentIndex = -1)
                                        );
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        updateComment(i, item);
                                      }}
                                      type="primary"
                                    >
                                      Update
                                    </Button>
                                  </Space>
                                </>
                              ) : (
                                <>
                                  <p>{i.comment} </p>
                                </>
                              )}
                              <p>{moment(i.created_at).fromNow()}</p>
                              <hr />
                              <Button><LikeOutlined /></Button>
                              {i.user_id === user.id ? (
                                <>
                                  <Space wrap>
                                    <Button
                                      onClick={() => {
                                        setEditCommentIndex(
                                          (editCommentIndex = k)
                                        );
                                        setID((id = item.id));
                                        setComment((comment = i.comment));
                                      }}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        deleteComment(i, item);
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </Space>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                            <hr />
                          </>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                    <br />
                    <br />
                    <Space wrap>
                      <Input.TextArea
                        onChange={(e) => {
                          setComment((comment = e.target.value));
                        }}
                      />
                      <Button
                        type="primary"
                        onClick={() => {
                          saveComment(item);
                        }}
                      >
                        Comment
                      </Button>
                    </Space>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
