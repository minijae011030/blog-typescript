import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditPostPage from "EditPost/pages/EditPostPage";
import { useGetPost } from "EditPost/hooks/useGetPost";
import { useCategoryList } from "EditPost/hooks/useCategoryList";

const EditPostLandingPage: React.FC = () => {
  let { postSeq } = useParams();
  const { post, fetchPost } = useGetPost(postSeq);
  const { categoryList, fetchCategoryList } = useCategoryList();

  useEffect(() => {
    if (!post) {
      fetchPost();
      fetchCategoryList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  if (post && categoryList) {
    return <EditPostPage post={post} categoryList={categoryList} />;
  }

  return null;
};

export default EditPostLandingPage;
