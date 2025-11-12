import React, { useState } from "react";

export default function Services() {
    // Service offerings data
    const services = [
        { id: 1, icon: "💻", title: "Programming", desc: "Custom software, automation and scripts" },
        { id: 2, icon: "🌐", title: "Web & App Development", desc: "Responsive websites and mobile apps" },
        { id: 3, icon: "📊", title: "Data Analysis", desc: "Data cleaning, visualization and reporting" },
        { id: 4, icon: "🤖", title: "Predictive Modeling", desc: "Machine learning models to forecast trends" },
        { id: 5, icon: "🧩", title: "Business & IT Analysis", desc: "Requirements, process improvement and system analysis" },
    ];

    const [hovered, setHovered] = useState(null);
    const palette = ["#5B8CFF", "#00C2A8", "#FFB86B", "#9F7AEA", "#FF6B8A"];

    return (
        <section className="services-container" aria-labelledby="services-heading">
            <h2 id="services-heading" className="services-heading">
                Services I Offer
            </h2>
            <div className="services-sub">
                Programming, Web & App Development, Data Analysis, Predictive Modeling, Business & IT Analysis
            </div>

            <ul className="services-list">
                {services.map((service, index) => {
                    const color = palette[index % palette.length];
                    const isHover = hovered === service.id;
                    
                    return (
                        <li
                            key={service.id}
                            className={`service-item ${isHover ? 'hovered' : ''}`}
                            style={{ borderLeftColor: `${color}${isHover ? "" : "40"}` }}
                            onMouseEnter={() => setHovered(service.id)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div className="service-title-row">
                                <div className="service-icon" style={{ background: color }} aria-hidden>
                                    {service.icon}
                                </div>
                                <div className="service-title">{service.title}</div>
                            </div>
                            <p className="service-desc">{service.desc}</p>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}