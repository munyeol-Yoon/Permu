import { useId } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const ToggleContent = ({
  trigger,
  className,
  children
}: {
  trigger: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const id = useId();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={id} className={className}>
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ToggleContent;
