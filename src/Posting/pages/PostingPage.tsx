import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "../styles/posting.module.css";
import Title from "Posting/components/Title";
import Contents from "Posting/components/Contents";
import Catetory from "Posting/components/Category";
import Tag from "Posting/components/Tag";
import CategoryList from "Posting/components/CategoryList";
import Header from "Utils/components/Header";
import BackButton from "Utils/components/BackButton";
import Loading from "Utils/components/Loading";
import Button from "Utils/components/Button";
import posting from "Posting/services/posting.service";
import { useCategoryList } from "Utils/hooks/useCategoryList";

const PostingPage: React.FC = () => {
  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState<string>("");
  const [postContents, setPostContents] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");

  const { categoryList } = useCategoryList();

  const handlePosting = async () => {
    if (postTitle === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    if (postContents === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    if (category === "") {
      alert("카테고리를 선택해주세요.");
      return;
    }

    const result = await posting({
      postTitle: postTitle,
      postContents: postContents,
      imageSeqs: [],
      tags: tags,
      category: category,
      isPinned: "0",
    });

    if (result.result) {
      alert("포스팅 성공");
      navigate(`/post/${result.postSeq}`);
      return;
    }

    alert("포스팅 실패");
    return;
  };

  if (categoryList) {
    return (
      <>
        <Helmet title="Posting" />
        <Header />
        <div className={styles.outer_post_box}>
          <div className={styles.post_box}>
            <div style={{ marginLeft: "30px" }}>
              <BackButton />
            </div>
            <Title value={postTitle} onChange={setPostTitle} />
            <Catetory value={category} onChange={setCategory} />
            <div className={styles.categorylist}>
              <CategoryList
                categoryList={categoryList}
                setCategory={setCategory}
              />
            </div>
            <Tag tagList={tags} setTagList={setTags} />
            <Contents value={postContents} onChange={setPostContents} />
            <div className={styles.button}>
              <Button onClick={handlePosting} text="글 작성하기" />
            </div>
          </div>
        </div>
      </>
    );
  }
  return <Loading />;
};

export default PostingPage;
