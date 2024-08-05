import Link from 'next/link'

const NavCategories = () => {
  return (
    <div className="border-b">
        <ul className="flex space-x-8 p-4 justify-between">
          <li className="border-b-2 border-black">
            <Link href="#" className="text-black">
              추천
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              특가
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              전상품
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              기획전
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              이벤트
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              브랜드관
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-500">
              고객센터
            </Link>
          </li>
        </ul>
      </div>
  )
}

export default NavCategories