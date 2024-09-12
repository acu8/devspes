import QiitaArticles from "./components/QiitaArticles";
import Header from "./components/Header";
import ZennArticles from "./components/ZennArticles";

export default function Page() {
  return (
    <div>
      <Header />
      <QiitaArticles />
      <ZennArticles />
    </div>
  );
}
