import { FC } from 'react';

// Props（引数）はもう不要です！
const ActionCard: FC = () => {
    
    return(
        <div className='w-full p-6 max-w-2xl mx-auto bg-gradient-to-r from-indigo-50 to-green-50 rounded-xl shadow-sm border border-indigo-100 text-center '>
            <h2 className='text-2xl font-bold text-gray-800 mb-3'>
                🤖 AIと一緒に、旅を詠む。
            </h2>

            <p className='text-gray-600 font-sans leading-relaxed'>
                旅の写真をアップロードするだけで、<br />
                AIアシスタントがその瞬間の情景を読み取り、<br />
                <span className="font-bold text-indigo-600">世界に一つだけの「俳句」</span>を作成します。
            </p>
            
            <p className="mt-4 text-xs text-gray-900">
                👇 下のフォームから、今日の思い出を記録してみましょう
            </p>

        </div>
    );
};

export default ActionCard;