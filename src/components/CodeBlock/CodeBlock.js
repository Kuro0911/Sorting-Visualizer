import { CopyBlock, dracula } from "react-code-blocks";

export const MyCb = ({ code, language, height }) => {
  return (
    <div
      style={{ fontFamily: "IBM Plex Mono", width: "30vw", marginRight: "2em" }}
    >
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
