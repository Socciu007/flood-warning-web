import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import blogImg1 from "../../assets/pictures/blogs-openAI.png";
import blogImg2 from "../../assets/pictures/blogs-samsungAI.jpg";
import CommentComponent from "../../components/CommentComponent/CommentComponent";
import { initFacebookSDK } from "../../utils";

const BlogDetailsPage = () => {
  useEffect(() => {
    initFacebookSDK();
  }, []);
  const { t } = useTranslation();
  return (
    <div className="layout-blog">
      <div class="container container-blog">
        <div class="container-blog">
          <h3 class="blog-title">{t("What is Go Tech?")}</h3>
          <div class="blog-meta">
            <span>12 - 2023</span>
            <span>5 {t("minutes ago")}</span>
          </div>
        </div>
        <div class="post-image"></div>
        <div class="post-content">
          <p>
            {t(
              "Go Tech is an online system designed to support the process of buying and selling electronic devices and services over the internet. E-commerce platforms provide a platform for businesses, stores, and individuals to create and manage their online stores, often including features such as product management and online payments. , order management, and user interface."
            )}
          </p>
          <span>
            {t(
              "Easily find and empower users to run their business in Maps and Search"
            )}
          </span>
          <div class="post-image image-more"></div>
          <p>
            {t(
              "Easily find and empower users to run their business in Maps and Search suggests a focus on providing a user-friendly platform, possibly within Maps and Search functionalities, to help individuals or businesses locate information and manage their operations. This could be related to features that enhance the visibility of businesses, improve search capabilities, or empower users with tools to efficiently run their business."
            )}
          </p>
          <div class="post-tag">
            <span class="btn">{t("Tag")}:</span>
            <div class="blog-btn">
              <button class="btn">Go Tech</button>
            </div>
            <div class="blog-btn">
              <button class="btn">{t("Technology")}</button>
            </div>
          </div>
        </div>
        <CommentComponent
          dataHref={
            "https://developers.facebook.com/docs/plugins/comments#configurator"
          }
          width={1280}
        ></CommentComponent>
        <div class="post-related">
          <h3>{t("Recent posts")}</h3>
          <div class="card post-card" style={{ width: "18rem" }}>
            <img src={blogImg1} class="card-img-top" alt="blog" />
            <div class="card-body post-content">
              <span class="card-text">
                {t("OpenAI continues to be sued over AI training data")}
              </span>
              <div class="blog-meta">
                <span>01 - 2024</span>
                <span>3 {t("minutes ago")}</span>
              </div>
            </div>
          </div>
          <div class="card post-card" style={{ width: "18rem" }}>
            <img src={blogImg2} class="card-img-top" alt="blog" />
            <div class="card-body post-content">
              <span class="card-text">
                {t("Samsung reveals the power of AI in new smartphones")}
              </span>
              <div class="blog-meta">
                <span>01 - 2024</span>
                <span>7 {t("minutes ago")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
