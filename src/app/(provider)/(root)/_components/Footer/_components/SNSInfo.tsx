import FacebookIcon from '@@/public/sns/facebook.svg';
import InstagramIcon from '@@/public/sns/instagram.svg';
import WhatsAppIcon from '@@/public/sns/whatsapp.svg';
import YouTubeIcon from '@@/public/sns/youtube.svg';
import Link from 'next/link';

const SNSInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <h3 className="text-xl font-semibold text-muted">Countact us</h3>

      <div className="flex gap-x-2.5">
        <Link href="https://www.instagram.com/permeate.store.official?igsh=MWluajBzYjYzdHVrNQ==">
          <InstagramIcon />
        </Link>
        <FacebookIcon />
        <YouTubeIcon />
        <WhatsAppIcon />
      </div>
    </div>
  );
};

export default SNSInfo;
