import { Button } from '@/components/ui/button';

function TempPage() {
  return (
    <div>
      <Button className="">default</Button>
      <Button className="" variant="accent">
        accent
      </Button>
      <Button className="" variant="disabled">
        disabled
      </Button>
      <Button className="" variant="outline">
        outlined
      </Button>
      <Button className="" variant="link">
        link
      </Button>
      <Button className="" variant="kakao">
        kakao
      </Button>
      <Button className="" variant="defaultline">
        defaultline
      </Button>
    </div>
  );
}

export default TempPage;
