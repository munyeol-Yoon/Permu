import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type Ttype = {
  value: string;
  label: string;
  content: React.ReactNode;
};
const Tab = ({ tabs }: { tabs: Ttype[] }) => {
  return (
    <Tabs defaultValue={tabs[0].value}>
      <TabsList className="w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Tab;
