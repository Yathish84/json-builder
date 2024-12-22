import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HowItWorks } from "@/components/HowItWorks";
import { Introduction } from "@/components/Introduction";
import SchemaBuilder from "@/components/SchemaBuilder";
import { Wand2 } from "lucide-react";


export default function Home() {
  return (
    // <div className="min-h-screen bg-gray-50">
    //   <header className="bg-white shadow-sm">
    //     <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
    //       <div className="flex items-center gap-2">
    //         <Wand2 className="h-8 w-8 text-blue-500" />
    //         <h1 className="text-2xl font-bold text-gray-900">
    //           JSON Struct
    //         </h1>
    //       </div>
    //     </div>
    //   </header>

    //   <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    //     <div className="bg-white shadow rounded-lg">
    //       <div className="px-4 py-5 sm:p-6">
    //         <SchemaBuilder />
    //       </div>
    //     </div>
    //   </main>
    // </div>
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Introduction />
          <HowItWorks />
          <div>
            <SchemaBuilder />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
