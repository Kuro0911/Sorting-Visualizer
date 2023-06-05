import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeBtnWrapper from "./HomeBtn.style";
import Link from "next/link";
export const HomeBtn = () => {
  return (
    <HomeBtnWrapper>
      <Link href="/">
        <a>
          <ArrowBackIosIcon className="icon" />
        </a>
      </Link>
    </HomeBtnWrapper>
  );
};
