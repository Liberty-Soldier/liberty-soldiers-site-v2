export default function CommunityPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Community</h1>
      <p className="text-white/70 mt-2">
        Discuss research, share Scripture, and connect with others pursuing truth and obedience.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 p-0 bg-white/0 overflow-hidden">
        {/* Hyvor Talk Embed — replace WEBSITE_ID below with your real Hyvor Website ID */}
        <div id="hyvor-talk-view" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var HYVOR_TALK_WEBSITE = 14332
                var s = document.createElement('script');
                s.src = 'https://talk.hyvor.com/web-api/embed.js';
                s.defer = true;
                s.async = true;
                s.setAttribute('data-website-id', HYVOR_TALK_WEBSITE);
                document.body.appendChild(s);
              })();
            `,
          }}
        />
      </div>
    </div>
  );
}
