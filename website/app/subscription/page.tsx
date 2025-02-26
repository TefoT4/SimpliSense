import Header from "@/app/components/header";
import SubscriptionManagement from "@/app/components/SubscriptionManagement";
import PayPalProviderWrapper from "@/app/components/PayPalProviderWrapper";

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-hidden p-6">
        <PayPalProviderWrapper>
          <SubscriptionManagement />
        </PayPalProviderWrapper>
      </div>
    </div>
  );
}
