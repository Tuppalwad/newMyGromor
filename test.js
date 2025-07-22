const data = {
  id: 45,
  videoUrl: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/1uJ1SoHgeUU" title="Coromandel's Adhiraj Neem based product vs Others comparison video ( Kannada )" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
};

const extractVideoId = (iframeHtml) => {
  const match = iframeHtml.match(/youtube\.com\/embed\/([^"?&]*)/);
  return match ? match[1] : null;
};

const videoId = extractVideoId(data.videoUrl);
console.log(videoId); // 👉 "1uJ1SoHgeUU"
