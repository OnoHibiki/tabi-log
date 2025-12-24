"use client" ;

import { useState , useEffect } from 'react';
import Header from "@/components/Header";
import ActionCard from "@/components/ActionCard";
import NewLogForm from '@/components/NewLogForm';

// データの型
interface TravelLog {
    id: number;
    title: string;
    location: string;
    notes: string;
    image_filename?: string; 
    created_at: string;
}

export default function Home() {

    // 　仮のログインデータ
    const isUserLoggedIn = true;//trueでログイン状態、falseで未ログイン状態
    const currentUserName = "HibikiOno"

    const [logs, setLogs] = useState<TravelLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchLogs = () => {
        fetch("http://localhost:8000/api/logs")
            .then((res) => res.json())
            .then((data) => {
                setLogs(data);
            })
        .catch((error) => {
            console.error("API Error",error);
        });    
    };

    useEffect(() => {
        fetchLogs();
    },[]);

    const handleDelete = async(id: number) => {
        if(!confirm("この記録を削除してもよろしいですか？"))return;

    try {
        const response = await fetch(`http://localhost:8000/api/logs/${id}`,{
            method: "DELETE",
        });

        if (response.ok) {
            fetchLogs();
            alert("削除しました");
        } else {
            alert("削除に失敗しました");
        }
    } catch (error) {
        console.error("Delete Error:", error);
    }
};
    

    return (
        <main className="min-h-screen font-sans ">
            
            {/* ヘッダーコンポーネントを引数渡して呼び出し */}
            <Header isLoggedIn={isUserLoggedIn} userName={currentUserName} />

            {/* コンテンツ */}
            <div className="flex flex-col items-center p-1 text-center">
                <h1 className="text-4xl font-extrabold m-8 text-gray-800">
                    Tabi-Log
                </h1>

                <ActionCard isLoggedIn={isUserLoggedIn} userName={currentUserName} />

                <NewLogForm onLogAdded={fetchLogs} />

                <div className = "mt-9 w-full max-w-4xl">
                    <h2 className='text-2xl font-bold mb-6 text-gray-700 border-b pb-2'>
                        最近の記録
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-50'>
                        {logs.map((log) => (

                            <div key={log.id} className='bg-white p-6 rounded-xl shadow-sm transition border border-gray-10 relative'>

                                <button onClick={() => handleDelete(log.id)}
                                className='absolute text-xl right-3 cursor-pointer top-7'
                                title='削除'>
                                    🗑️
                                </button>
                                
                                <div className='flex justify-between items-start mb-2 pr-5'>
                                    <h3 className='text-xl font-bold text-gray-800'>
                                        {log.title}
                                    </h3>
                                    <span className='text-s text-gray-900 bg-gray-100 px-2 py-1 rounded'>
                                        {log.location}
                                    </span>
                                </div>

                                {log.image_filename && (
                                    <div className="mb-4 rounded-lg overflow-hidden">
                                        <img
                                            src={`http://localhost:8000/static/${log.image_filename}`}
                                            alt={log.title}
                                            className='w-full h-48 object-cover hover:scale-105 transition duration-300'
                                        />
                                    </div>
                                )}

                                <p className='text-left mt-3  text-sm mb-4 line-clamp-3'>
                                    {log.notes}
                                </p>

                                <div className='text-right text-xs text-gray-600'>
                                    {new Date(log.created_at).toLocaleDateString()}
                                </div>

                            </div>

                        ))}
                    </div>

                    {/* データが空の場合 */}
                    {logs.length === 0 && (
                        <p className='text-3xl text-center text-red-600 font-bold py-10'>
                            まだ記録がありません．．．
                        </p>
                    )}

                </div>

            </div>
        </main>
    )
}