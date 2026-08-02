export default function CampaignsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#0f172a]">Campaigns</h1>
      <p className="text-[13px] text-[#64748b]">Create and manage your outbound sequencing campaigns.</p>
      <div className="bg-white border border-black/[0.07] rounded-2xl p-12 text-center space-y-3 shadow-xs">
        <p className="text-[15px] font-semibold text-[#0f172a]">No campaigns yet</p>
        <p className="text-[12.5px] text-[#64748b]">Start a new chat and ask the AI to create a campaign for you.</p>
      </div>
    </div>
  );
}
