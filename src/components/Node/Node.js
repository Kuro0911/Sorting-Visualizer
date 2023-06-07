import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NodeWrapper from "./Node.style";

export const Node = ({ st, ed, idx }) => {
  return (
    <div>
      <NodeWrapper st={st} ed={ed} idx={idx}>
        <div className="node"></div>
      </NodeWrapper>
    </div>
  );
};

export default Node;
