import Layout from "@/components/Layout";
import { MessageSquare } from "lucide-react";

export default function Browse() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="min-h-96 flex flex-col items-center justify-center text-center bg-secondary rounded border border-border p-8">
          <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Browse Products</h2>
          <p className="text-muted-foreground max-w-md mb-6">
            This page will include search, filtering by category and price range, and a grid of all available products.
          </p>
          <p className="text-sm text-muted-foreground">
            Continue chatting with your assistant to build out this page with full product browsing features.
          </p>
        </div>
      </div>
    </Layout>
  );
}
