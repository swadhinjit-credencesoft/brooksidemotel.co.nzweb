import { AMENITIES_COMPARISON } from "@/content";

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
              {AMENITIES_COMPARISON.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.details}</td>
                  <td>
                    <span className={`pill ${item.pillType}`}>{item.cost}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

