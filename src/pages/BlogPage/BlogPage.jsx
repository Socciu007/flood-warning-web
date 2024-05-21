import React, { useEffect, useState } from "react";
import "./style.scss";
import searchIcon from "./../../assets/icons/icon-search.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LikeComponent from "../../components/LikeComponent/LikeComponent";
import { getBase64, initFacebookSDK } from "../../utils";
import * as BlogService from "../../services/BlogService";
import { Button, Col, Drawer, Form, Input, Row, Space, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as messages from "../../components/Message/Message";

const BlogPage = () => {
  const user = useSelector((state) => state?.user);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dataBlog, setDataBlog] = useState([]);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    description: "",
    image: "",
    user: user?.id,
  });

  const getAllBlogs = async () => {
    const res = await BlogService.getAllBlogs();
    if (Array.isArray(res.data)) {
      setDataBlog(res.data);
    } else {
      setDataBlog([res.data]);
    }
  };

  const mutation = useMutationHooks((data) => {
    const res = BlogService.createBlog(data);
    return res;
  });
  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      messages.success("Create blog success");
    } else if (isError) {
      messages.error("Error create blog");
    }
  }, [data, isSuccess, isError]);

  useEffect(() => {
    getAllBlogs();
  }, []);

  // const dataBlog = [
  //   {
  //     id: 1,
  //     title: "What is Go Tech?",
  //     description:
  //       "Go Tech is an online system designed to support the process of buying and selling electronic devices and services over the internet. E-commerce platforms provide a platform for businesses, stores, and individuals to create and manage their online stores, often including features such as product management and online payments. , order management, and user interface.",
  //     image: "link",
  //   },
  //   {
  //     id: 2,
  //     title: "How does technology innovate?",
  //     description:
  //       "Innovative technology refers to innovations that have the potential to create significant change in the way that industry, business, or society operates. These are new technologies that emerge and make a big impact, often changing the way we work, live and interact with the world around us.",
  //     image: "link",
  //   },
  //   {
  //     id: 3,
  //     title: "What is Go Tech?",
  //     description:
  //       "Go Tech is an online system designed to support the process of buying and selling electronic devices and services over the internet. E-commerce platforms provide a platform for businesses, stores, and individuals to create and manage their online stores, often including features such as product management and online payments. , order management, and user interface.",
  //     image: "link",
  //   },
  //   {
  //     id: 4,
  //     title: "How does technology innovate?",
  //     description:
  //       "Innovative technology refers to innovations that have the potential to create significant change in the way that industry, business, or society operates. These are new technologies that emerge and make a big impact, often changing the way we work, live and interact with the world around us.",
  //     image: "link",
  //   },
  // ];

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);
  const handleHomePage = () => {
    navigate("/");
  };

  const handleBlogDetail = (id) => {
    navigate(
      `/blog/${id
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "-")
        ?.toLowerCase()}`
    );
  };

  const handlePost = () => {
    mutation.mutateAsync(blog);
    onClose();
  };
  const handleCancel = () => {
    setBlog({
      title: "",
      content: "",
      image: "",
      user: "",
    });
    onClose();
  };

  const handleChangeContent = (e) => {
    setBlog({ ...blog, content: e.target.value });
  };

  const handleChangeTitle = (e) => {
    setBlog({ ...blog, title: e.target.value });
  };
  const handleChangeDescription = (e) => {
    setBlog({ ...blog, description: e.target.value });
  };

  const handleChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setBlog({ ...blog, image: file.preview });
  };
  return (
    <div class="blog">
      <div class="blog-wrap container">
        {user?.isAdmin && (
          <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
              {t("New blog")}
            </Button>
            <Drawer
              title={t("Create a new blog")}
              width={720}
              onClose={onClose}
              open={open}
              styles={{
                body: {
                  paddingBottom: 80,
                },
              }}
              extra={
                <Space>
                  <Button onClick={handleCancel}>{t("Cancel")}</Button>
                  <Button onClick={handlePost} type="primary">
                    {t("Post")}
                  </Button>
                </Space>
              }
            >
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="title" label={t("Title")}>
                      <Input
                        type="text"
                        onChange={handleChangeTitle}
                        value={blog?.title}
                        placeholder={t("Please enter blog title")}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="description" label={t("Description")}>
                      <Input
                        type="text"
                        onChange={handleChangeDescription}
                        value={blog?.description}
                        placeholder={t("Please enter blog description")}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="content" label={t("Content")}>
                      <Input
                        type="text"
                        onChange={handleChangeContent}
                        value={blog?.content}
                        placeholder={t("Please enter blog content")}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="image" label={t("Image")}>
                      <Upload
                        onChange={handleChangeImage}
                        maxCount={10}
                        listType="picture-card"
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>{t("Upload")}</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Drawer>
          </>
        )}
        <div class="header-wrap">
          <h3 class="title-blog">
            {t("Everything you need to know about")}{" "}
            <b
              class="title-blog"
              style={{ color: "#2A86FF", cursor: "pointer" }}
              onClick={handleHomePage}
            >
              Go Tech
            </b>
            , {t("and more")}.
          </h3>
        </div>
        <p class="sub-title">
          {t(
            "Are you someone eager to learn about technology? Go Tech is here for you."
          )}
        </p>
        <div class="search-wrap">
          <img class="icon" src={searchIcon} alt="img-search" />
          <input
            class="search-content"
            placeholder={t("What are you looking for?")}
          ></input>
        </div>
      </div>

      <div class="container-blog">
        <div class="container container-wrapper">
          {dataBlog.length > 0 &&
            dataBlog?.map((blog) => (
              <>
                <div class="blog-item">
                  <div class="blog-content">
                    <h3
                      id="goToPost"
                      class="blog-title"
                      onClick={() => handleBlogDetail(blog.title)}
                    >
                      {t(blog.title)}
                    </h3>
                    <p class="blog-detail">{t(blog.description)}</p>
                    <div class="blog-button">
                      <div class="blog-btn">
                        <button class="btn">Go Tech</button>
                      </div>
                      <div class="blog-btn">
                        <button class="btn">{t("Technology")}</button>
                      </div>
                    </div>
                    <LikeComponent
                      dataHref={"https://developers.facebook.com/docs/plugins/"}
                    ></LikeComponent>
                  </div>
                  <div class="blog-image"></div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
