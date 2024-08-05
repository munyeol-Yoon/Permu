import Toggle from '@/components/Toggle';
import { Accordion } from '@/components/ui/accordion';
import CallInfo from './_components/CallInfo';
import SNSInfo from './_components/SNSInfo';

const Footer = () => {
  return (
    <>
      <Accordion type="single" collapsible>
        <Toggle trigger="사업자 정보" className="px-10 text-xl font-thin">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus nisi provident porro repellendus suscipit
          consectetur dolor itaque doloribus neque numquam, accusantium in reprehenderit modi, accusamus asperiores
          excepturi! Dolore, voluptatum saepe!
        </Toggle>
        <Toggle trigger="법적고지사항" className="px-10 text-xl font-thin">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, esse sit quidem molestias ipsam doloribus
          perspiciatis reprehenderit, consequatur repellendus incidunt distinctio, ducimus quo. Numquam commodi autem
          vitae voluptatem fugiat. Animi!
        </Toggle>
        <Toggle trigger="고객지원" className="px-10 text-xl font-thin">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, esse sit quidem molestias ipsam doloribus
          perspiciatis reprehenderit, consequatur repellendus incidunt distinctio, ducimus quo. Numquam commodi autem
          vitae voluptatem fugiat. Animi!
        </Toggle>
      </Accordion>

      <div className="grid grid-cols-[300px_1px_300px] grid-rows-[269px]">
        <CallInfo />
        <div className="bg-muted" />
        <SNSInfo />
      </div>
    </>
  );
};

export default Footer;
