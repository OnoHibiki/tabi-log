import Header from "@/components/Header";

export default function Home() {

    // 　仮のログインデータ（開発中）
    const isUserLoggedIn = true;//trueでログイン状態、falseで未ログイン状態
    const currentUserName = "HibikiOno"

    return (
        <main className="min-h-screen font-sans ">
            
            {/* ヘッダーコンポーネントを引数渡して呼び出し */}
            <Header isLoggedIn={isUserLoggedIn} userName={currentUserName} />

            {/* コンテンツ */}
            <div className="flex flex-col items-center p-12 text-center">
                <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
                    Tabi-Log
                </h1>

                <p className="text-2xl font-semibold text-indigo-600">
                    旅の思い出づくりのお手伝い・・・
                </p>
            </div>
        </main>
    )
}