import QiitaArticles from "./components/QiitaArticles";
import Header from "./components/Header";
import ZennArticles from "./components/ZennArticles";
import Resources from "./components/Resources";

export default function Page() {
  return (
    <div>
      <Header />
      <QiitaArticles />
      <ZennArticles />
      <Resources />
    </div>
  );
}
