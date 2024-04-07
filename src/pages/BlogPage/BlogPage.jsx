import React, { useEffect } from "react";
import "./style.scss";
import searchIcon from "./../../assets/icons/icon-search.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LikeComponent from "../../components/LikeComponent/LikeComponent";
import { initFacebookSDK } from "../../utils";

const BlogPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dataBlog = [
    {
      id: 1,
      title: "What is Go Tech?",
      description:
        "Go Tech is an online system designed to support the process of buying and selling electronic devices and services over the internet. E-commerce platforms provide a platform for businesses, stores, and individuals to create and manage their online stores, often including features such as product management and online payments. , order management, and user interface.",
      image: "link",
    },
    {
      id: 2,
      title: "How does technology innovate?",
      description:
        "Innovative technology refers to innovations that have the potential to create significant change in the way that industry, business, or society operates. These are new technologies that emerge and make a big impact, often changing the way we work, live and interact with the world around us.",
      image: "link",
    },
    {
      id: 3,
      title: "What is Go Tech?",
      description:
        "Go Tech is an online system designed to support the process of buying and selling electronic devices and services over the internet. E-commerce platforms provide a platform for businesses, stores, and individuals to create and manage their online stores, often including features such as product management and online payments. , order management, and user interface.",
      image: "link",
    },
    {
      id: 4,
      title: "How does technology innovate?",
      description:
        "Innovative technology refers to innovations that have the potential to create significant change in the way that industry, business, or society operates. These are new technologies that emerge and make a big impact, often changing the way we work, live and interact with the world around us.",
      image: "link",
    },
  ];
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
  return (
    <div class="blog">
      <div class="blog-wrap container">
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
