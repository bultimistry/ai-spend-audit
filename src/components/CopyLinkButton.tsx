"use client";

type Props = {
  url: string;
};

export default function CopyLinkButton({
  url,
}: Props) {

  const copyLink = async () => {

    try {

      await navigator.clipboard.writeText(
        url
      );

      alert("Link copied!");

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <button
      onClick={copyLink}
      className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
    >
      Copy Share Link
    </button>
  );
}