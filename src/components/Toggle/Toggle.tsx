import { useId } from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const Toggle = ({
  trigger,
  className,
  children,
  value = true
}: {
  trigger: string;
  className?: string;
  children: React.ReactNode;
  value?: boolean;
}) => {
  const id = useId();
  return (
    <AccordionItem value={value ? id : 'same'} className={className}>
      <AccordionTrigger>{trigger}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

export default Toggle;
