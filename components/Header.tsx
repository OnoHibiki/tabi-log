export default function Header() {
    return (
        <header className="w-full boder-b border-gray-200 p-4">
            <nav className="flex items-center justify-between max-w-7xl mx-auto">
                {/* サービス名 */}
                <div className="text-2xl font-bold text-indigo-600">
                    Tabi-Log
                </div>

                {/* ログインボタン  */}
                <button className="bg-indigo-500 text-while py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-150">
                    ログイン
                </button>
            </nav>
        </header>
    )
}