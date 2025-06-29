import React from 'react';
import { CiLink } from "react-icons/ci";
function SwitchToMobile() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'Check out this website!',
          url: window.location.href,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported on this browser');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center">

    <button
  onClick={handleShare}
  className="px-3 py-1 bg-[#e5e5e5] border-[#959595] border-[1px] rounded-full transition"
>
  <div className="flex items-center gap-1">
    Share link <CiLink size={20} />
  </div>
</button>
<h5>Hey! This site vibes better on mobile. Hit that share button and check it out on your phone!</h5>
    </div>
  );
}

export default SwitchToMobile;
