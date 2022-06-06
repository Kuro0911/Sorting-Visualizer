import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HomeBtnWrapper from "./HomeBtn.style";
import Link from "next/link";
export const HomeBtn = () => {
  return (
    <HomeBtnWrapper>
      <Link href="/">
        <a>
          <HomeIcon className="icon" />
        </a>
      </Link>
    </HomeBtnWrapper>
  );
};
