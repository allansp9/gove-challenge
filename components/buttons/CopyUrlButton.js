import useCopyToClipboard from "../../hooks/useCopyToClipboard";

const CopyUrlButton = ({ url }) => {
  const [copyUrlStatus, copyUrl] = useCopyToClipboard(url);
  let buttonText = "Copy URL to Clipboard";

  if (copyUrlStatus === "copied") {
    buttonText = "URL Copied!";
  } else if (copyUrlStatus === "failed") {
    buttonText = "Copy failed!";
  }

  return (
    <button onClick={copyUrl} className="">
      {buttonText}
    </button>
  );
};

export default CopyUrlButton;
