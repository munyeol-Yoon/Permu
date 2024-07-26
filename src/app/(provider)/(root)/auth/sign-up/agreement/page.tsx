import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

// TODO : 선택 안하면 다음 이동 막기

const AgreementPage = () => {
  return (
    <>
      <div className="flex relative p-5">
        <Link href="log-in" className="absolute">
          ⬅️
        </Link>
        <h1 className="mx-auto">회원가입</h1>
      </div>

      <Tabs defaultValue="a" className="px-12">
        <TabsList className="flex">
          <TabsTrigger value="a">약관동의</TabsTrigger>
          <TabsTrigger value="b" disabled>
            계정생성
          </TabsTrigger>
          <TabsTrigger value="c" disabled>
            가입완료
          </TabsTrigger>
        </TabsList>

        <TabsContent value="a">
          <div className="w-full">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>(필수)이용약관</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>(필수)개인정보 수집 및 이용</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>(필수)만 14세 이상입니다.</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>(선택)개인정보 처리 위탁</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>

              <label htmlFor="completeConfirm" className="flex justify-between py-5">
                모든 약관을 확인하고 전체 동의합니다.
                <input type="checkbox" id="completeConfirm" />
              </label>
            </Accordion>
          </div>
        </TabsContent>

        <div className="w-full bg-red mt-11">
          <p className="py-5 border-b">인증 수단 선택</p>
          <label htmlFor="emailConfirm" className="block py-5 ">
            <input type="checkbox" id="emailConfirm" className="mr-2.5" />
            이메일 본인 인증
          </label>
        </div>

        <div className="flex flex-col">
          <Button href="email-confirm">다음</Button>
          <Button variant="outline" href="/auth/sign-up" className=" bg-white text-black">
            이전
          </Button>
        </div>

        <TabsContent value="guest">
          <div className="px-[50px]">
            <form className="flex flex-col gap-y-4 mt-28">
              <input type="text" id="guestId" className="border p-2.5 rounded" placeholder="주문자명" />
              <input type="text" id="orderId" className="border p-2.5 rounded mb-10" placeholder="주문번호" />

              <div className="flex flex-col">
                <Button>주문내역 조회하기</Button>
                <Button variant="outline" href="/auth/sign-up" className=" bg-white text-black">
                  회원가입
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AgreementPage;
