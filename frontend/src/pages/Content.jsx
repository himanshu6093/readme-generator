import { useLocation, useNavigate } from "react-router-dom";
import ReadmeCard from "../components/ReadmeCard";

export default function Content() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.data) {
    navigate("/", { replace: true });
    return null;
  }

  const { data, repoUrl } = state;
  const repoName = data.name ?? repoUrl.split("/").pop();

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      <header>
        <h2 className="text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-500 to-white drop-shadow-lg">{repoName}</h2>
        <p className="text-gray-600 mt-2">{data.about}</p>
      </header>

      {data.features?.length > 0 && (
        <ReadmeCard title="Features">
          <ul className="list-disc pl-6">
            {data.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </ReadmeCard>
      )}

      {data.usage && (
        <ReadmeCard title="Usage">
          <div className="bg-gray-900 text-green-200 p-4 rounded">
            <pre className="whitespace-pre-wrap">{data.usage}</pre>
          </div>
        </ReadmeCard>
      )}

      {data.structure?.length > 0 && (
        <ReadmeCard title="Project Structure">
          <ul className="list-disc pl-6">
            {data.structure.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </ReadmeCard>
      )}

      {data.contributing?.length > 0 && (
        <ReadmeCard title="Contributing">
          <ul className="list-disc pl-6">
            {data.contributing.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </ReadmeCard>
      )}
    </main>
  );
}
