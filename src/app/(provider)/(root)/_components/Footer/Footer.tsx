import Toggle from '@/components/Toggle';
import { Accordion } from '@/components/ui/accordion';
import CallInfo from './_components/CallInfo';
import SNSInfo from './_components/SNSInfo';

const Footer = () => {
  return (
    <>
      <Accordion type="single" collapsible>
        <Toggle trigger="사업자 정보" className="px-5">
          <p>사업자등록번호: 123-45-67890</p>
          <p>대표자명: 홍길동</p>
          <p>상호명: 예시 쇼핑몰</p>
          <p>주소: 서울특별시 강남구 테헤란로 123, 4층</p>
          <p>대표 전화: 02-123-4567</p>
          <p>이메일: contact@example.com</p>
          <p>통신판매업 신고번호: 제2024-서울강남-00001호</p>
          <p>개인정보관리책임자: 김철수</p>
        </Toggle>
        <Toggle trigger="법적고지사항" className="px-5">
          <p>
            이용약관: 본 쇼핑몰의 이용약관은 고객님의 권익 보호와 원활한 서비스 이용을 위하여 마련되었습니다. 모든
            고객님은 본 쇼핑몰을 이용함에 있어 다음의 이용약관을 준수하여야 합니다.
          </p>
          <ul>
            <li>이용 목적: 본 쇼핑몰은 상품 구매와 정보 제공을 목적으로 합니다.</li>
            <li>저작권: 본 쇼핑몰의 모든 콘텐츠는 저작권법에 의해 보호됩니다.</li>
            <li>개인정보 보호: 고객님의 개인정보는 안전하게 보호되며, 무단으로 제3자에게 제공되지 않습니다.</li>
            <li>
              책임 제한: 본 쇼핑몰은 천재지변, 서버 장애 등 불가피한 상황으로 인한 서비스 중단에 대해 책임을 지지
              않습니다.
            </li>
          </ul>
          <p>
            면책사항: 본 쇼핑몰은 고객님의 편의를 위하여 다양한 정보를 제공하고 있으며, 이 정보의 정확성이나 완전성을
            보장하지 않습니다. 고객님께서는 이를 참고용으로만 활용하시기 바랍니다.
          </p>
          <p>
            분쟁 해결: 본 쇼핑몰과 관련한 모든 분쟁은 대한민국 법률에 따라 해결되며, 관할 법원은 서울중앙지방법원으로
            합니다.
          </p>
        </Toggle>
        <Toggle trigger="고객지원" className="px-5">
          <p>고객센터 운영시간: 월요일 - 금요일: 09:00 - 18:00 (점심시간: 12:00 - 13:00), 주말 및 공휴일: 휴무</p>
          <p>자주 묻는 질문(FAQ):</p>
          <ul>
            <li>
              배송 문의: 주문한 상품의 배송 상태는 어떻게 확인하나요? - 주문 내역에서 배송 상태를 확인할 수 있습니다.
            </li>
            <li>반품/교환: 상품을 반품하거나 교환하고 싶어요. - 상품 수령 후 7일 이내에 고객센터로 연락해 주세요.</li>
            <li>
              회원가입/탈퇴: 회원가입은 어떻게 하나요? 탈퇴는 어디서 하나요? - 회원가입은 상단 메뉴의 회원가입 버튼을
              클릭하여 진행할 수 있으며, 탈퇴는 마이페이지에서 신청할 수 있습니다.
            </li>
          </ul>
          <p>문의하기: 고객님의 소중한 의견을 기다리고 있습니다. 문의사항이 있으시면 아래의 방법으로 연락해 주세요.</p>
          <ul>
            <li>전화: 02-123-4567</li>
            <li>이메일: support@example.com</li>
            <li>카카오톡: 예시 쇼핑몰 (@example_shop)</li>
          </ul>
          <p>오시는 길: 서울특별시 강남구 테헤란로 123, 4층 (예시 쇼핑몰)</p>
        </Toggle>
      </Accordion>

      <div className="grid grid-cols-[1fr_1px_1fr] sm:grid-cols-[300px_1px_300px] grid-rows-[269px] gap-2">
        <CallInfo />
        <div className="bg-muted" />
        <SNSInfo />
      </div>
    </>
  );
};

export default Footer;
