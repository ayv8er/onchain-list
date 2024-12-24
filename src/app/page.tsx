import ClientPage from "@/components/ClientPage";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <main className="flex-grow flex flex-col">
        <ClientPage />;
      </main>
    </div>
  );
}