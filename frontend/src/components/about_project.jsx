import React from "react";
import "./css/about_project.css";

export default function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h1
        style={{
          marginBottom: "2.5rem",
          color: "white",
          textAlign: "center",
          fontSize: "3.5rem",
        }}
      >
        Monitor<span style={{
          marginBottom: "2.5rem",
          color: "#f0a500",
          textAlign: "center",
          fontSize: "3.5rem",
        }}>Bee</span>
      </h1>
      <div className="about-project-content">
        <div className="card-grid">
          <div className="info-card">
            <h3>Vision</h3>
            <p>
              This project envisions to provide an advanced, reliable, and
              easy-to-use monitoring and management system that leverages
              state-of-the-art machine learning and computer vision techniques
              to support sustainable beekeeping practices.
            </p>
          </div>

          <div className="info-card">
            <h3>Our Goal</h3>
            <p>
              We aim to help in effectively identifying and tracking bees,
              monitoring beehives in real-time, detecting bee characteristics
              such as {' '}
              <span className="feature-link">
                <a href="https://beeswiki.com/bee-pollination/">bees with pollen</a>
              </span>,{' '}
              <span className="feature-link">
                <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5076640/">varroa mite infections</a>
              </span>,{' '}
              <span className="feature-link">
                <a href="https://backyardvisitors.com/honeybee-hive-climate-control-temperature-humidity-and-more/">bee cooling the hive</a>
              </span>{' '}
              and{' '}
              <span className="feature-link">
                <a href="https://en.wikipedia.org/wiki/Wasp">wasps</a>
              </span>,
              and ensuring the health and productivity of hives and overall
              surrounding environment.
            </p>
          </div>

          <div className="info-card">
            <h3>Key Features</h3>
            <ul>
              <li>Count Bees Entering or Leaving the Hive</li>
              <li>Detect Varroa Infected Bees</li>
              <li>Identify Bees Cooling the Hive</li>
              <li>Detect Bees with Pollen</li>
              <li>Detect Wasps</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>Workflow</h3>
            <p>
              Each frame from the camera is processed to identify bees, track
              their movements, and classify their activities using a neural
              network. The results are sent to The Things Network via LoRaWAN,
              allowing for seamless data collection and monitoring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
