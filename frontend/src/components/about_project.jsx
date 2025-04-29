import React from "react";
import "./css/about_project.css";

export default function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h1
        style={{
          marginBottom: "2.5rem",
          color: "#f0a500",  // Warm honey color
          textAlign: "center",
          fontSize: "3.5rem"
        }}
      >
        MonitorBee
      </h1>
      <div className="about-project-content">
        <h4 style={{ fontWeight: "400", lineHeight: "1.8" }}>
          <ol>
            <li>
              This project envisions to provide an advanced, reliable, and
              easy-to-use monitoring and management system that leverages
              state-of-the-art machine learning and computer vision techniques
              to support sustainable beekeeping practices.
            </li>
            <br />
            <li>
              We aim to help in effectively identifying and tracking bees,
              monitoring beehives in real-time, detecting bee characteristics
              such as pollen packages, varroa mite infections, and even wasps,
              and ensuring the health and productivity of hives and overall
              surrounding environment
            </li>
            <br />
            <li>
              Our system utilizes a combination of hardware and software to
              deliver real-time insights and data about bee activity within a
              hive:
              <h5>
                <ul>
                  <li>Count Bees Entering or Leaving the Hive</li>
                  <li>Detect Varroa Infected Bees</li>
                  <li>Identify Bees Cooling the Hive</li>
                  <li>Detect Bees with Pollen</li>
                  <li>Detect Wasps</li>
                </ul>
              </h5>
            </li>
            <li>
              Each frame from the camera is processed to identify bees, track
              their movements, and classify their activities using a neural
              network. The results are sent to The Things Network via LoRaWAN,
              allowing for seamless data collection and monitoring.
            </li>
          </ol>
        </h4>
      </div>
    </section>
  );
}
