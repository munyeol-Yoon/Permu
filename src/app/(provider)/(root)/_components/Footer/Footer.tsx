import Toggle from '@/components/Toggle';
import { Accordion } from '@/components/ui/accordion';
import FooterCallInfo from './FooterCallInfo';
import FooterSNS from './FooterSNS';

const Footer = () => {
  return (
    <Accordion type="single">
      <Toggle trigger="사업자 정보">몰라</Toggle>
      <Toggle trigger="법적고지사항">모른다</Toggle>
      <Toggle trigger="고객지원">
        <div className="grid grid-cols-[300px_1px_300px] grid-rows-[269px]">
          <FooterCallInfo />
          <div className="bg-gray-500" />
          <FooterSNS />
        </div>
      </Toggle>
    </Accordion>
  );
};

export default Footer;
