"use client";

export default function IntroText() {
  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="text-4xl">🚀</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">Как данные путешествуют по интернету?</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            Представь, что ты хочешь отправить большое письмо другу в другой город. 
            Ты не можешь отправить его целиком — оно слишком большое. Что ты сделаешь?
          </p>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            <span className="text-[#FF6A1A] font-bold">Ты разорвёшь письмо на маленькие кусочки, каждый положишь в отдельный конверт, напишешь на нём адрес и отправишь!</span>
          </p>
          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="bg-black/40 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">📦</div>
              <div className="text-[10px] text-slate-400">Пакет</div>
              <div className="text-[9px] text-slate-500">маленький кусочек данных</div>
            </div>
            <div className="bg-black/40 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">📍</div>
              <div className="text-[10px] text-slate-400">Адрес</div>
              <div className="text-[9px] text-slate-500">откуда и куда</div>
            </div>
            <div className="bg-black/40 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">🔢</div>
              <div className="text-[10px] text-slate-400">Номер</div>
              <div className="text-[9px] text-slate-500">чтобы собрать по порядку</div>
            </div>
          </div>
          <div className="bg-[#FF6A1A]/10 border border-[#FF6A1A]/30 rounded-xl p-3 mt-3">
            <p className="text-sm text-white">
              🎯 <span className="font-bold text-[#FF6A1A]">Твоя задача:</span> провести спутник с пакетом по правильному маршруту.
            </p>
            <p className="text-xs text-slate-300 mt-1">
              Правильный порядок: <span className="text-[#FF6A1A] font-bold">КОМПЬЮТЕР → РОУТЕР → ПРОВАЙДЕР → ДАТА-ЦЕНТР → СЕРВЕР</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}