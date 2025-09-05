export default function ReadmeCard({ title, children }) {
  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div>{children}</div>
    </section>
  );
}
