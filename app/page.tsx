import Header from "./components/Header";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* ここにメインコンテンツを追加 */}
      </main>
    </div>
  );
}
