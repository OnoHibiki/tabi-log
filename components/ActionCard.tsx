import { FC } from 'react';

interface ActionCardProps {
    isLoggedIn: boolean;
    userName?: string;
}


const ActionCard: FC<ActionCardProps> =  ({ isLoggedIn, userName }) => {
    const displayUserName = userName ?? "ゲスト";

    if (isLoggedIn) {
        
        return(
            <div className='p-8 max-w-lg mx-auto bg-green-50 rounded-xl shadow-lg space-y-4'>
                <h2 className='text-2xl font-semibold text-green-700'>
                    ようこそ、{displayUserName} さん！
                </h2>
                <p className='text-gray-600'>
                    新しい旅の記録を作成しましょう！
                </p>
                <button className='bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-150 cursor-pointer'>
                    旅の記録を開始する
                </button>
            </div>
        );
    } else {
        return(
            <div className='p-8 max-w-lg mx-auto bg-green-50 rounded-xl shadow-lg space-y-4'>

                <p className='text-gray-600 font-sans'>
                    ログインして、AIによる自動タグ付け機能を体験しませんか？
                </p>

                <div className='flex space-x-4 justify-center'>
                    <button className='bg-indigo-500 font-semibold text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-150 cursor-pointer'>
                        ログイン
                    </button>
                    <button className='border bg-red-100 text-black font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition duration-150 cursor-pointer'>
                        新規登録
                    </button>
                </div>

            </div>
        );
    };
};

export default ActionCard;