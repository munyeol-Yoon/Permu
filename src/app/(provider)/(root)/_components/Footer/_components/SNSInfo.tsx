import { FACEBOOK_PATH, INSTAGRAM_PATH, WHATSAPP_PATH, YOUTUBE_PATH } from '@/constant/pathname';
import FacebookIcon from '@@/public/sns/facebook.svg';
import InstagramIcon from '@@/public/sns/instagram.svg';
import WhatsAppIcon from '@@/public/sns/whatsapp.svg';
import YouTubeIcon from '@@/public/sns/youtube.svg';
import Link from 'next/link';

const SNSInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <h3 className="text-xl font-semibold text-muted">Countact us</h3>

      <div className="grid grid-cols-2 gap-2.5 md:flex">
        <Link href={INSTAGRAM_PATH} className="hover:opacity-75 active:opacity-90">
          <InstagramIcon />
        </Link>
        <Link href={FACEBOOK_PATH} className="hover:opacity-75 active:opacity-90">
          <FacebookIcon />
        </Link>

        <Link href={YOUTUBE_PATH} className="hover:opacity-75 active:opacity-90">
          <YouTubeIcon />
        </Link>
        <Link href={WHATSAPP_PATH} className="hover:opacity-75 active:opacity-90">
          <WhatsAppIcon />
        </Link>
      </div>
    </div>
  );
};

export default SNSInfo;
