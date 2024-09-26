import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold text-gray-900">
                Learn Hub
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              エンジニアのための
              <br />
              無料リソースプラットフォーム
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              About
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Learn Hubについて
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  運営会社
                </Link>
              </li> */}
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  お知らせ・リリース
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Guides
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  使い方
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="flex items-center text-base text-gray-500 hover:text-gray-900"
                >
                  法人向けメニュー
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    New
                  </span>
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Publication / Pro
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  よくある質問
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  プライバシーポリシー
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  特商法表記
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <Link href="#" className="inline-block">
            <p>© 2024 Learn Hub</p>
            {/* <Image
              src="/placeholder.svg?height=30&width=120"
              alt="classmethod"
              width={120}
              height={30}
              className="h-8 w-auto"
            /> */}
          </Link>
        </div>
      </div>
    </footer>
  );
}
