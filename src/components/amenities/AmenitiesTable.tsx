export default function AmenitiesTable() {
  return (
    <section className="section bg-paper" id="summary">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">At a glance</p>
          <h2 className="h1">Facilities comparison</h2>
          <p>What&apos;s included in every rate, and what carries a charge.</p>
        </div>
        <div className="tbl-wrap rv">
          <table className="facts">
            <thead>
              <tr>
                <th scope="col">Facility / amenity</th>
                <th scope="col">Details</th>
                <th scope="col">Included / cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>High-speed Fibre Wi-Fi</td>
                <td>Unlimited fast internet in all units</td>
                <td><span className="pill pill-free">Complimentary</span></td>
              </tr>
              <tr>
                <td>On-site vehicle parking</td>
                <td>Cars, work vans, street parking</td>
                <td><span className="pill pill-free">Complimentary</span></td>
              </tr>
              <tr>
                <td>TV &amp; entertainment</td>
                <td>Smart TV, Freeview &amp; 20 Sky Channels</td>
                <td><span className="pill pill-free">Complimentary</span></td>
              </tr>
              <tr>
                <td>Climate control</td>
                <td>In-room heat pumps / air conditioning</td>
                <td><span className="pill pill-free">Complimentary</span></td>
              </tr>
              <tr>
                <td>EV charging station</td>
                <td>Type 2 EV charging setup</td>
                <td><span className="pill pill-cost">$25 overnight</span></td>
              </tr>
              <tr>
                <td>Guest laundry</td>
                <td>Washer &amp; dryer facilities</td>
                <td><span className="pill pill-req">Available on request</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
