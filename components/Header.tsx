// components/Header.tsx

export default function Header() {
    // Props（引数）も、ログイン判定のロジックも全部不要です！
    // いきなり return してOKです。

    return (
        <header className="w-full border-b bg-stone-50 border-gray-200 p-4">
            <nav className="flex items-center justify-between max-w-7xl mx-auto">
                {/* 左側：サービス名 */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl">✈️</span>
                    <div className="text-2xl font-bold text-indigo-600">
                        Tabi-Log
                    </div>
                </div>

                {/* 右側：ログインボタンの代わりにサブタイトルを表示 */}
                <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    AI Travel Diary
                </div>

            </nav>
        </header>
    )
}