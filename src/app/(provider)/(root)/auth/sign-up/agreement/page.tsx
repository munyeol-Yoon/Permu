'use client';
import Navbar from '@/components/Navbar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AUTH_SIGN_UP_EMAIL_CONFIRM_PATHNAME, AUTH_SIGN_UP_PATHNAME } from '@/constant/pathname';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    setIsAllTermsAccepted(isAllRequiredChecked && isOptionAccepted);
  }, [isAllRequiredChecked, isOptionAccepted]);

  return (
    <>
      <Navbar title="회원가입" />
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
              <p>
                제1조 (목적) 이 약관은 Permeate (이하 &quot;몰&quot;이라 합니다)이 운영하는 인터넷 쇼핑몰(이하
                &quot;몰&quot;이라 합니다)에서 제공하는 인터넷 관련 서비스(이하 &quot;서비스&quot;라 합니다)를 이용함에
                있어 몰과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                <br />
                제2조 (정의) ① &quot;몰&quot;이란 Permeate이 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등
                정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러
                사이버몰을 운영하는 사업자의 의미로도 사용합니다. ② &quot;이용자&quot;란 &quot;몰&quot;에 접속하여 이
                약관에 따라 &quot;몰&quot;이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                <br />
                제3조 (약관의 명시와 개정) ① &quot;몰&quot;은 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기
                화면에 게시합니다. ② &quot;몰&quot;은 약관의 규제에 관한 법률 등 관련법을 위배하지 않는 범위에서 이
                약관을 개정할 수 있습니다. ③ &quot;몰&quot;이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
                현행약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
              </p>
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
              <p>
                제1조 (개인정보의 수집 목적 및 항목) ① &quot;몰&quot;은 다음과 같은 목적을 위해 개인정보를 수집하고
                있습니다: 회원가입 및 관리 재화 또는 서비스 제공 고지사항 전달 및 기타 정보 전달 마케팅 및 광고 활용 ②
                수집되는 개인정보 항목은 다음과 같습니다: 이름, 생년월일, 성별, 이메일 주소, 휴대전화번호, 주소 등
                <br />
                제2조 (개인정보의 보유 및 이용기간) ① &quot;몰&quot;은 이용자의 개인정보를 수집한 날로부터 이용자가
                서비스 탈퇴 시까지 보유하며, 목적 달성 후 지체 없이 파기합니다. ② 법령에 의하여 일정 기간 보관해야 하는
                정보는 해당 법령이 정한 기간 동안 보관합니다.
              </p>
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
              <p>
                제1조 (서비스 이용의 제한) ① &quot;몰&quot;의 서비스는 만 14세 이상만 이용할 수 있습니다. ② 만 14세
                미만의 아동은 회원가입 및 서비스 이용이 제한되며, 몰은 이에 대한 책임을 지지 않습니다.
              </p>
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
              <p>
                제1조 (개인정보 처리 위탁) ① &quot;몰&quot;은 서비스 이행을 위해 필요한 경우에 한하여 이용자의
                개인정보를 외부 전문 업체에 위탁할 수 있습니다. ② 위탁 계약 시 개인정보 보호를 위해 수탁업체가
                개인정보를 안전하게 처리할 수 있도록 관리 감독하고, 관련 법령을 준수하도록 합니다.
              </p>
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
