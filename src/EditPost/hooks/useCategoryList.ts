import { useState } from "react";
import getCategory from "Main/services/getCategory.service";
import { useNavigate } from "react-router-dom";

export function useCategoryList(postSeq?: string) {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState(null);

  const fetchCategoryList = async () => {
    const result = await getCategory();

    if (result.result) {
      setCategoryList(result.categoryList || []);
    } else {
      alert("카테고리를 불러오는 중 오류가 발생했습니다.");
      navigate(`/post/${postSeq}`);
    }
  };

  return { categoryList, fetchCategoryList };
}
