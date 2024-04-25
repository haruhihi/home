import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        录入页: <a href="/main/upload">/main/upload</a>
      </div>
      <div>
        检索页: <a href="/main/search">/main/search</a>
      </div>
      <div>
        详情页: <a href="/main/plan/1">/main/plan/1</a>
      </div>
      <div>
        编辑页: <a href="/main/plan/edit/1">/main/plan/edit/1</a>
      </div>
    </main>
  );
}
