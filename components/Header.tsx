interface HeaderProps {
    // ユーザのログイン状態(boolean)
    isLoggedIn: boolean;
    // ユーザ名（String)
    userName?: string;
}


export default function Header({ isLoggedIn, userName }: HeaderProps) {

    // ログイン状態に応じて、ボタンの中身を切り替える
    const buttonContents = isLoggedIn ? (
        //ログイン済の場合
        <p className="text-black py-2 px-4">ようこそ、{userName}さん</p>
    ):(
        //未ログインの場合
        <button className="bg-indigo-500 cursor-pointer text-white  py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-150">
            ログイン
        </button>
    )

    return (
        <header className="w-full border-b bg-stone-50 border-gray-200 p-4">
            <nav className="flex items-center justify-between max-w-7xl mx-auto">
                {/* サービス名 */}
                <div className="text-2xl font-bold text-indigo-600">
                    Tabi-Log
                </div>

                {/* ログインボタン */}
                {buttonContents}

            </nav>
        </header>
    )
}