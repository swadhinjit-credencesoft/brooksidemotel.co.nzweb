import ArrowIcon from "@/components/ui/ArrowIcon";

export default function GuideIndex() {
  return (
    <div className="post-index rv">
      <article className="pi-card">
        <span className="tag">Local dining guide</span>
        <h4>Where to Eat in Rolleston: The Ultimate Local Dining &amp; Café Guide</h4>
        <p>
          Coffee, pub classics, global sit-down dining, takeaways and supermarkets —
          everything within two minutes of the front door.
        </p>
        <a className="link-brook" href="#post-dining">
          Read guide <ArrowIcon />
        </a>
      </article>
      <article className="pi-card">
        <span className="tag">Corporate travel</span>
        <h4>Why Rolleston is the Smart Base for Corporate Travellers in Canterbury</h4>
        <p>
          Motorway and airport connectivity, work-ready rooms, free parking, and after-hours
          arrival — built around a business schedule.
        </p>
        <a className="link-brook" href="#post-corporate">
          Read guide <ArrowIcon />
        </a>
      </article>
      <article className="pi-card">
        <span className="tag">Travel tips</span>
        <h4>20 Minutes from Christchurch Airport: Stress-Free Stopovers</h4>
        <p>
          Skip flight-path noise and airport parking fees. A quiet, cost-effective
          alternative twenty minutes south of the terminal.
        </p>
        <a className="link-brook" href="#post-airport">
          Read guide <ArrowIcon />
        </a>
      </article>
    </div>
  );
}
