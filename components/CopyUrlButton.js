import useCopyToClipboard from "../hooks/useCopyToClipboard";

const CopyUrlButton = ({ url }) => {
  const [copyUrlStatus, copyUrl] = useCopyToClipboard(url);
  let buttonText = "Copy to Clipboard";

  if (copyUrlStatus === "copied") {
    buttonText = "Copied!";
  } else if (copyUrlStatus === "failed") {
    buttonText = "Copy failed!";
  }

  return <button onClick={copyUrl}>{buttonText}</button>;
};

export default CopyUrlButton;
