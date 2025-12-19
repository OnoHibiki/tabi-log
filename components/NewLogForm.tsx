"use client"

import { useState } from "react";

interface Props {
    onLogAdded: () => void;
}


export default function NewLogForm({ onLogAdded }: Props){
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:8000/api/logs",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    location: location,
                    notes: notes,   
                }),
            });

            if(response.ok){
                setTitle("");
                setLocation("");
                setNotes("");
                onLogAdded();
            } else {
                alert("保存に失敗しました...")
            }
            
        } catch(error) {
            console.error("Error:", error);
            alert("エラーが発生しました");
        } finally {
            setIsSubmitting(false);
        }
    };

return (
    <form onSubmit={handleSubmit} className="bg-white m-6 p-6 rounded-xl shadow-md border border-gray-200  w-full max-w-2xl">
      <h3 className="text-lg font-bold text-gray-700 mb-2">🖊️ 新しい旅を記録する</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* タイトル入力 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="例: 京都旅行"
          />
        </div>

        {/* 場所入力 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">場所</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="例: 京都府京都市"
          />
        </div>
      </div>

      {/* メモ入力 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">思い出メモ</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="楽しかったこと、美味しかったもの..."
        />
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition disabled:opacity-50"
      >
        {isSubmitting ? "送信中..." : "記録を保存"}
      </button>
    </form>
  );
}
