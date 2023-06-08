import { CopyBlock, dracula } from "react-code-blocks";

export const MyCb = ({ code, language, height }) => {
  return (
    <div className="myDiv">
      <CopyBlock
        text={code}
        customStyle={{
          height: `${height}vh`,
          overflow: "scroll",
        }}
        language={language}
        showLineNumbers="true"
        theme={dracula}
      />
    </div>
  );
};
