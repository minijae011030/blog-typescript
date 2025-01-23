import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/component.module.css";
import whiteAccountIcon from "Utils/images/person_white.png";
import blackAccountIcon from "Utils/images/person_black.png";
import { getLuminance } from "Utils/services/getLuminance";
import { useCheckUser } from "Utils/hooks/useChcekUser";
import { useFetchUser } from "Utils/hooks/useFetchUser";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo } = useFetchUser();
  const { isValidUser, handleCheckUser } = useCheckUser();
  const [textColor, setTextColor] = useState<string>("");

  useEffect(() => {
    handleCheckUser();
    if (userInfo?.color) {
      const luminance = getLuminance(userInfo.color);
      setTextColor(luminance > 0.5 ? "black" : "white");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userInfo) return <div>Loading</div>;
  return (
    <div className={styles.header} style={{ backgroundColor: userInfo.color }}>
      <div className={styles.left_box}>
        {isValidUser && (
          <div
            style={{ borderColor: textColor }}
            onClick={() => navigate("/posting")}
          >
            <p style={{ color: textColor }}>Posting</p>{" "}
          </div>
        )}
      </div>
      <p
        style={{ color: textColor, fontFamily: "Times New Roman" }}
        onClick={() => navigate("/")}
      >
        {userInfo.title}
      </p>
      <div className={styles.right_box}>
        {isValidUser && (
          <img
            style={{ cursor: "pointer" }}
            src={textColor === "white" ? whiteAccountIcon : blackAccountIcon}
            alt="account icon"
            onClick={() => navigate("/admin")}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
