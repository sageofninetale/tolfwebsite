"use client";

import SplitHeading from "@/components/ui/SplitHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading">
      <div className="services-header">
        <div>
          <p className="t-label" style={{ marginBottom: "1rem" }}>What We Offer</p>
          <SplitHeading
            as="h2"
            className="t-h2"
            id="services-heading"
          >
            Our Services
          </SplitHeading>
        </div>
        <p
          className="t-body"
          style={{ maxWidth: "28rem", textAlign: "right" }}
        >
          From a single parcel to full container loads, Tolf delivers complete
          freight solutions across every mode of transport.
        </p>
      </div>

      <div className="services-grid" role="list">
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            image={service.image}
            icon={service.icon}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
