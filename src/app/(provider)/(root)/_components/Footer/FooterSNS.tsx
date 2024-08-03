import FacebookIcon from '@@/public/sns/facebook.svg';
import InstagramIcon from '@@/public/sns/instagram.svg';
import WhatsAppIcon from '@@/public/sns/whatsapp.svg';
import YouTubeIcon from '@@/public/sns/youtube.svg';

const FooterSNS = () => {
  return (
    <div className="flex-col-10 justify-center items-center">
      <h1 className="text-xl text-gray-500 font-semibold">Countact us</h1>

      <div className="flex-row-10">
        <InstagramIcon />
        <FacebookIcon />
        <YouTubeIcon />
        <WhatsAppIcon />
      </div>
    </div>
  );
};

export default FooterSNS;
