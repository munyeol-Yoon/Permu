'use client';
import Navbar from '@/components/Navbar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AUTH_LOG_IN_PATHNAME, AUTH_SIGN_UP_EMAIL_CONFIRM_PATHNAME, AUTH_SIGN_UP_PATHNAME } from '@/constant/pathname';
import Link from 'next/link';
import { useState } from 'react';

const AgreementPage = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState<boolean>(false);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState<boolean>(false);
  const [isOptionAccepted, setIsOptionAccepted] = useState<boolean>(false);
  const [isAllTermsAccepted, setIsAllTermsAccepted] = useState<boolean>(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(false);

  const handleAllChange = () => {
    const newValue = !isAllTermsAccepted;
    setIsAllTermsAccepted(newValue);
    setIsTermsAccepted(newValue);
    setIsPrivacyAccepted(newValue);
    setIsOptionAccepted(newValue);
    setIsAgeConfirmed(newValue);
  };

  const isAllRequiredChecked = isTermsAccepted && isPrivacyAccepted && isAgeConfirmed;

  return (
    <>
      <Navbar title="회원가입" href={AUTH_LOG_IN_PATHNAME} />
      <div className="px-[50px]">
        <Tabs defaultValue="a">
          <TabsList className="flex">
            <TabsTrigger value="a">약관동의</TabsTrigger>
            <TabsTrigger value="b" disabled>
              계정생성
            </TabsTrigger>
            <TabsTrigger value="c" disabled>
              가입완료
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>(필수)이용약관</AccordionTrigger>
            <AccordionContent>
              <p>Yes. It adheres to the WAI-ARIA design pattern.</p>
              <div className="flex justify-end items-center text-base">
                <label htmlFor="termCheck">
                  <input
                    type="checkbox"
                    id="termCheck"
                    checked={isTermsAccepted}
                    onChange={() => setIsTermsAccepted((prev) => !prev)}
                    className="mr-2"
                  />
                  동의
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>(필수)개인정보 수집 및 이용</AccordionTrigger>
            <AccordionContent>
              <p>Yes. It adheres to the WAI-ARIA design pattern.</p>
              <div className="flex justify-end items-center text-base">
                <label htmlFor="privacyCheck">
                  <input
                    type="checkbox"
                    id="privacyCheck"
                    checked={isPrivacyAccepted}
                    onChange={() => setIsPrivacyAccepted((prev) => !prev)}
                    className="mr-2"
                  />
                  동의
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>(필수)만 14세 이상입니다.</AccordionTrigger>
            <AccordionContent>
              <p>Yes. It adheres to the WAI-ARIA design pattern.</p>
              <div className="flex justify-end items-center text-base">
                <label htmlFor="ageCheck">
                  <input
                    type="checkbox"
                    id="ageCheck"
                    checked={isAgeConfirmed}
                    onChange={() => setIsAgeConfirmed((prev) => !prev)}
                    className="mr-2"
                  />
                  동의
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>(선택)개인정보 처리 위탁</AccordionTrigger>
            <AccordionContent>
              <p>Yes. It adheres to the WAI-ARIA design pattern.</p>
              <div className="flex justify-end items-center text-base">
                <label htmlFor="optionCheck">
                  <input
                    type="checkbox"
                    id="optionCheck"
                    checked={isOptionAccepted}
                    onChange={() => setIsOptionAccepted((prev) => !prev)}
                    className="mr-2"
                  />
                  동의
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>

          <label htmlFor="completeConfirm" className="flex justify-between p-5">
            모든 약관을 확인하고 전체 동의합니다.
            <input type="checkbox" id="completeConfirm" checked={isAllTermsAccepted} onChange={handleAllChange} />
          </label>
        </Accordion>

        <div className="w-full bg-red mt-11">
          <h3 className="py-5 border-b">인증 수단 선택</h3>
          <label htmlFor="emailConfirm" className="block py-5 ">
            <input
              type="checkbox"
              id="emailConfirm"
              className="mr-2.5"
              checked={isEmailConfirmed}
              onChange={() => setIsEmailConfirmed((prev) => !prev)}
            />
            이메일 본인 인증
          </label>
        </div>

        <div className="flex flex-col mt-12 px-[50px]">
          <Button
            disabled={!isAllRequiredChecked || !isEmailConfirmed}
            asChild={isAllRequiredChecked && isEmailConfirmed}
          >
            <Link href={AUTH_SIGN_UP_EMAIL_CONFIRM_PATHNAME}>다음</Link>
          </Button>
          <Button asChild variant="outline" className="bg-white text-black">
            <Link href={AUTH_SIGN_UP_PATHNAME}>이전</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AgreementPage;
