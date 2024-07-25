import { useId } from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const Toggle = ({
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
    <AccordionItem value={id} className={className}>
      <AccordionTrigger>{trigger}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

export default Toggle;
