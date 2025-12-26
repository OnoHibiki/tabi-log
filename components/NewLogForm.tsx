"use client"

import { useState } from "react";

interface Props {
    onLogAdded: () => void;
}

export default function NewLogForm({ onLogAdded }: Props){
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try{
          const formData = new FormData();
          formData.append("title", title);
          formData.append("location", location);
          formData.append("notes", notes);

          if(file){
            formData.append("image", file);
          }

          const response = await fetch("http://localhost:8000/api/logs",{
            method:"POST",
            body: formData,
          });

            if(response.ok){
              // フォームをクリア
              setTitle("");
              setLocation("");
              setNotes("");
              setFile(null);
              

              const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
              if(fileInput) fileInput.value = "";
              

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
    <form onSubmit={handleSubmit} className="bg-white m-6 p-6 rounded-xl shadow-md border border-gray-200 w-full max-w-2xl">

      <div className="mb-6 border-b pb-2 border-gray-100">
        <h3 className="text-xl font-bold text-gray-800">
            AI俳句名人、準備万端...
        </h3>
        <p className="text-s text-gray-500 mt-1">
            旅の情報や、写真をアップロードすると、AIが情景を読み取って一句詠みます
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* タイトル入力 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="例: 京都府京都市"
          />
        </div>
      </div>

      {/* 写真 */}
      <div className="mb-4">
        <label className="block text-sm  text-gray-700 mb-1 font-bold">
          ~ 写真を選択 ~ <span className="text-red-500 text-xs ml-1">(AI俳句に必須)</span>
        </label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition cursor-pointer"
        />
      </div>


      {/* メモ入力 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">思い出メモ</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="楽しかったこと、美味しかったもの..."
        />
      </div>

      {/* 送信ボタン：メッセージを魅力的に */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full font-bold py-3 px-4 rounded-lg transition duration-200 flex justify-center items-center gap-2
            ${isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl"
            }`}
      >
        {isSubmitting ? (
            <>
               <span>🤖</span> AIが俳句を詠んでいます...
            </>
        ) : (
            <>
               <span>✨</span> 記録してAI俳句を作成
            </>
        )}
      </button>
    </form>
  );
}