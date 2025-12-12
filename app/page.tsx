import Header from "@/components/Header";
import ActionCard from "@/components/ActionCard";

export default function Home() {

    // 　仮のログインデータ（開発中）
    const isUserLoggedIn = false;//trueでログイン状態、falseで未ログイン状態
    const currentUserName = "HibikiOno"

    return (
        <main className="min-h-screen font-sans ">
            
            {/* ヘッダーコンポーネントを引数渡して呼び出し */}
            <Header isLoggedIn={isUserLoggedIn} userName={currentUserName} />

            {/* コンテンツ */}
            <div className="flex flex-col items-center p-4 text-center">
                <h1 className="text-4xl font-extrabold m-8 text-gray-800">
                    Tabi-Log
                </h1>

                <ActionCard isLoggedIn={isUserLoggedIn} userName={currentUserName} />
            </div>
        </main>
    )
}